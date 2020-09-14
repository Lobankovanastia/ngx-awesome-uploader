import { FilePickerService } from './file-picker.service';
import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { FilePreviewModel } from './file-preview.model';
import { getFileType } from './file-upload.utils';
import { FileValidationTypes, ValidationError } from './validation-error.model';
import { FilePickerAdapter } from './file-picker.adapter';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  UploadEvent
} from './file-drop';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { DefaultCaptions } from './default-captions';
import { UploaderCaptions } from './uploader-captions';
import { HttpErrorResponse } from '@angular/common/http';
import {base64ToFile, ImageCroppedEvent} from 'ngx-image-cropper';
import {FileDroppingProcessModel} from './file-dropping-process.model';
import {CropperOptions, CropperOptionsModel} from './cropper-options.model';

// declare var Cropper;
@Component({
  selector: 'ngx-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilePickerComponent implements OnInit, OnDestroy {
  /** Emitted when file upload via api successfully. Emitted for every file */
  @Output() uploadSuccess = new EventEmitter<FilePreviewModel>();
  /** Emitted when file upload via api failed. Emitted for every file */
  @Output() uploadFail = new EventEmitter<HttpErrorResponse>();
  /** Emitted when file is removed via api successfully. Emitted for every file */
  @Output() removeSuccess = new EventEmitter<FilePreviewModel>();
  /** Emitted on file validation fail */
  @Output() validationError = new EventEmitter<ValidationError>();
  /** Emitted when file is added and passed validations. Not uploaded yet */
  @Output() fileAdded = new EventEmitter<FilePreviewModel>();
  /** Custom validator function */
  @Input() customValidator: (file: File) => Observable<boolean>;
  /** Whether to enable cropper. Default: disabled */
  @Input()
  enableCropper = false;
  /** Whether to show default drag and drop zone. Default:true */
  @Input() showeDragDropZone = true;
  /** Whether to show default files preview container. Default: true */
  @Input() showPreviewContainer = true;
  /** Preview Item template */
  @Input() itemTemplate: TemplateRef<any>;
  /** Single or multiple. Default: multi */
  @Input()
  uploadType = 'multi';
  /** Max size of selected file in MB. Default: no limit */
  @Input()
  fileMaxSize: number;
  /** Max count of file in multi-upload. Default: no limit */
  @Input()
  fileMaxCount: number;
  /** Total Max size limit of all files in MB. Default: no limit */
  @Input()
  totalMaxSize: number;
  /** Which file types to show on choose file dialog. Default: show all */
  @Input()
  accept: string;
  files: FilePreviewModel[] = [];
  /** File extensions filter */
  @Input() fileExtensions: String[];
  cropper: any;
  /** Cropper options. */
  @Input() cropperOptions: CropperOptions;
  /** Files array for cropper. Will be shown equentially if crop enabled */
  filesForCropper: File[] = [];
  /** Current file to be shown in cropper*/
  currentCropperFile: File;
  /** Custom api Adapter for uploading/removing files */
  @Input()
  adapter: FilePickerAdapter;
  /**  Custome template for dropzone */
  @Input() dropzoneTemplate: TemplateRef<any>;
  /** Custom captions input. Used for multi language support */
  @Input() captions: UploaderCaptions;
  /** captions object*/
  _captions: UploaderCaptions;
  cropClosed$ = new Subject<FilePreviewModel>();
  _onDestroy$ = new Subject<void>();

  croppedImage: Blob;
  cropperIsReady = false;

  private droppingProcess: FileDroppingProcessModel;

  constructor(
    private fileService: FilePickerService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.setCropperOptions();
    this.listenToCropClose();
    this.setCaptions();
  }
  ngOnDestroy() {
    this._onDestroy$.next();
  }
  setCaptions() {
    this._captions = this.captions || DefaultCaptions;
  }
  /** Listen when Cropper is closed and open new cropper if next image exists */
  listenToCropClose() {
    this.cropClosed$
      // .pipe(takeUntil(this._onDestroy$))
      .subscribe((res: FilePreviewModel) => {
        const croppedIndex = this.filesForCropper.findIndex(
          item => item.name === res.fileName
        );
        const nextFile =
          croppedIndex !== -1
            ? this.filesForCropper[croppedIndex + 1]
            : undefined;
        //  console.log('cropped', res);
        this.filesForCropper = [...this.filesForCropper].filter(
          item => item.name !== res.fileName
        );
        // console.log(this.filesForCropper);
        if (nextFile) {
          this.openCropper(nextFile);
        }
      });
  }

  /** Sets custom cropper options if avaiable */
  setCropperOptions() {
    this.cropperOptions = this.cropperOptions === undefined ? new CropperOptionsModel({}) : new CropperOptionsModel(this.cropperOptions);
  }

  /** On input file selected */
  onChange(fileInput: HTMLInputElement) {
    const files: File[] = Array.from(fileInput.files);
    this.handleFiles(files).subscribe();
  }

  /** Handles input and drag/drop files */
  handleFiles(files: File[]): Observable<void> {
    if (!this.isValidMaxFileCount(files)) {
      return of(null);
    }
    const isValidUploadSync = files.every(item => this.validateFileSync(item));
    const asyncFunctions = files.map(item => this.validateFileAsync(item));

    return combineLatest(...asyncFunctions).pipe(
      map(res => {
        const isValidUploadAsync = res.every(result => result === true);
        if (!isValidUploadSync || !isValidUploadAsync) {
          return;
        }
        files.forEach((file: File, index: number) => {
          this.handleInputFile(file, index);
        });
      })
    );
  }
  /** Validates synchronous validations */
  validateFileSync(file: File): boolean {
    if (!file) {
      return;
    }
    if (!this.isValidUploadType(file)) {
      return;
    }
    if (!this.isValidExtension(file, file.name)) {
      return;
    }
    return true;
  }
  /** Validates asynchronous validations */
  validateFileAsync(file: File): Observable<boolean> {
    if (!this.customValidator) {
      return of(true);
    }
    return this.customValidator(file).pipe(
      tap(res => {
        if (!res) {
          this.validationError.next({
            file: file,
            error: FileValidationTypes.customValidator
          });
        }
      })
    );
  }
  /** Handles input and drag&drop files */
  handleInputFile(file: File, index): void {
    const type = getFileType(file.type);
    if (type === 'image' && this.enableCropper) {
      this.filesForCropper.push(file);
      if (!this.currentCropperFile) {
        this.openCropper(file);
        this.ref.detectChanges();
      }
    } else {
      /** Size is not initially checked on handleInputFiles because of cropper size change */
      if (this.isValidSize(file, file.size)) {
        this.pushFile(file);
      }
    }
  }
  /** Validates if upload type is single so another file cannot be added */
  isValidUploadType(file): boolean {
    if (this.uploadType === 'single' && this.files.length > 0) {
      this.validationError.next({
        file: file,
        error: FileValidationTypes.uploadType
      });
      return false;
    } else {
      return true;
    }
  }
  /** Validates max file count */
  isValidMaxFileCount(files: File[]): boolean {
    if (
      !this.fileMaxCount ||
      this.fileMaxCount >= this.files.length + files.length
    ) {
      return true;
    } else {
      this.validationError.next({
        file: null,
        error: FileValidationTypes.fileMaxCount
      });
      return false;
    }
  }
  /** On file dropped */
  dropped(event: UploadEvent) {
    this.droppingProcess = new FileDroppingProcessModel(event.files.length);

    for (const droppedFile of event.files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.droppingProcess.addFileForUpload(file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        // console.log(droppedFile.relativePath, fileEntry);
      }
    }
    this.handleFilesIfDroppingProcessIsFinished();
  }

  /** Add file to file list after succesfull validation */
  pushFile(file: File, fileName = file.name): void {
    this.files.push({ file: file, fileName: fileName });
    this.fileAdded.next({ file: file, fileName: fileName });
  }

  /** Opens cropper for image crop */
  openCropper(file: File): void {
    this.currentCropperFile = file;
  }

  getSafeUrl(file: File): SafeResourceUrl {
    return this.fileService.createSafeUrl(file);
  }

  /** Close or cancel cropper */
  closeCropper(filePreview: FilePreviewModel): void {
    this.currentCropperFile = undefined;
    this.cropperIsReady = false;
    this.cropClosed$.next(filePreview);
  }
  /** Removes files from files list */
  removeFileFromList(file: FilePreviewModel): void {
    this.files = this.files.filter(f => f !== file);
  }

  /** Emits event when file upload api returns success  */
  onUploadSuccess(fileItem: FilePreviewModel): void {
    this.uploadSuccess.next(fileItem);
  }

  /** Emits event when file upload api returns failure  */
  onUploadFail(er: HttpErrorResponse): void {
    this.uploadFail.next(er);
  }

  /** Validates file extension */
  isValidExtension(file: File, fileName: string): boolean {
      if (!this.fileExtensions) {return true; }
      const extension = fileName.split('.').pop();
      const fileExtensions = this.fileExtensions.map(ext => ext.toLowerCase());
      if (fileExtensions.indexOf(extension.toLowerCase()) === -1) {
        this.validationError.next({file: file, error: FileValidationTypes.extensions});
        return false;
      }

      return true;
  }
  /** Validates selected file size and total file size */
  isValidSize(file: File, size: number): boolean {
    /** Validating selected file size */
    const res: number = this.bitsToMb(size.toString());
    let isValidFileSize: boolean;
    let isValidTotalFileSize: boolean;
    if (!this.fileMaxSize || (this.fileMaxSize && res < this.fileMaxSize)) {
      isValidFileSize = true;
    } else {
      this.validationError.next({
        file: file,
        error: FileValidationTypes.fileMaxSize
      });
    }
    /** Validating Total Files Size */
    const totalBits = this.files
      .map(f => f.file.size)
      .reduce((acc, curr) => acc + curr, 0);
    if (
      !this.totalMaxSize ||
      (this.totalMaxSize &&
        this.bitsToMb(totalBits + file.size) < this.totalMaxSize)
    ) {
      isValidTotalFileSize = true;
    } else {
      this.validationError.next({
        file: file,
        error: FileValidationTypes.totalMaxSize
      });
    }
    return !!isValidFileSize && isValidTotalFileSize;
  }
  bitsToMb(size): number {
    return parseFloat(size) / 1048576;
  }
  /** when crop button submitted */
  onCropSubmit(): void {
    this.blobFallBack(this.croppedImage);
  }
  /** After crop submit */
  blobFallBack(blob: Blob): void {
    if (!blob) {
      return;
    }
    if (this.isValidSize(<File>blob, blob.size)) {
      this.pushFile(<File>blob, this.currentCropperFile.name);
    }
    this.closeCropper({
      file: blob as File,
      fileName: this.currentCropperFile.name
    });
  }

  removeFile(fileItem: FilePreviewModel): void {
    if (this.adapter) {
      this.adapter.removeFile(fileItem).subscribe(res => {
        this.onRemoveSuccess(fileItem);
      });
    } else {
      console.warn('no adapter was provided');
    }
  }
  /** Emits event when file remove api returns success  */
  onRemoveSuccess(fileItem: FilePreviewModel): void {
    this.removeSuccess.next(fileItem);
    this.removeFileFromList(fileItem);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = base64ToFile(event.base64);
  }

  imageLoaded() {
    this.cropperIsReady = true;
  }

  loadImageFailed() {
    console.log('Load Image Failed');
    this.closeCropper({
      file: this.currentCropperFile,
      fileName: this.currentCropperFile.name
    });
  }

  private handleFilesIfDroppingProcessIsFinished() {
    this.droppingProcess.diminishCounter();
    if (this.droppingProcess.isProcessingFinished()) {
      this.handleFiles(this.droppingProcess.getFiles()).subscribe();
    } else {
      setTimeout(() => {
        this.handleFilesIfDroppingProcessIsFinished();
      }, this.droppingProcess.checkTimeIntervalMS);
    }
  }
}
