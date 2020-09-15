import { FilePickerService } from './file-picker.service';
import { ElementRef, EventEmitter, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { FilePreviewModel } from './file-preview.model';
import { ValidationError } from './validation-error.model';
import { FilePickerAdapter } from './file-picker.adapter';
import { UploadEvent } from './file-drop';
import { Observable, Subject } from 'rxjs';
import { UploaderCaptions } from './uploader-captions';
import { HttpErrorResponse } from '@angular/common/http';
export declare class FilePickerComponent implements OnInit, OnDestroy {
    private fileService;
    private elementRef;
    /** Emitted when file upload via api successfully. Emitted for every file */
    uploadSuccess: EventEmitter<FilePreviewModel>;
    /** Emitted when file upload via api failed. Emitted for every file */
    uploadFail: EventEmitter<HttpErrorResponse>;
    /** Emitted when file is removed via api successfully. Emitted for every file */
    removeSuccess: EventEmitter<FilePreviewModel>;
    /** Emitted on file validation fail */
    validationError: EventEmitter<ValidationError>;
    /** Emitted when file is added and passed validations. Not uploaded yet */
    fileAdded: EventEmitter<FilePreviewModel>;
    /** Custom validator function */
    customValidator: (file: File) => Observable<boolean>;
    /** Whether to enable cropper. Default: disabled */
    enableCropper: boolean;
    /** Whether to show default drag and drop zone. Default:true */
    showeDragDropZone: boolean;
    /** Whether to show default files preview container. Default: true */
    showPreviewContainer: boolean;
    /** Preview Item template */
    itemTemplate: TemplateRef<any>;
    /** Single or multiple. Default: multi */
    uploadType: string;
    /** Max size of selected file in MB. Default: no limit */
    fileMaxSize: number;
    /** Max count of file in multi-upload. Default: no limit */
    fileMaxCount: number;
    /** Total Max size limit of all files in MB. Default: no limit */
    totalMaxSize: number;
    /** Which file types to show on choose file dialog. Default: show all */
    accept: string;
    files: FilePreviewModel[];
    /** File extensions filter */
    fileExtensions: String[];
    cropper: any;
    /** Cropper options. */
    cropperOptions: Object;
    /** Files array for cropper. Will be shown equentially if crop enabled */
    filesForCropper: File[];
    /** Current file to be shown in cropper*/
    currentCropperFile: File;
    /** Custom api Adapter for uploading/removing files */
    adapter: FilePickerAdapter;
    /**  Custome template for dropzone */
    dropzoneTemplate: TemplateRef<any>;
    /** Custom captions input. Used for multi language support */
    captions: UploaderCaptions;
    /** captions object*/
    _captions: UploaderCaptions;
    cropClosed$: Subject<FilePreviewModel>;
    _onDestroy$: Subject<void>;
    safeCropImgUrl: SafeResourceUrl;
    constructor(fileService: FilePickerService, elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    setCaptions(): void;
    /** Listen when Cropper is closed and open new cropper if next image exists */
    listenToCropClose(): void;
    /** Sets custom cropper options if avaiable */
    setCropperOptions(): void;
    /** Sets manual cropper options if no custom options are avaiable */
    setDefaultCropperOptions(): void;
    /** On input file selected */
    onChange(fileInput: HTMLInputElement): void;
    /** Handles input and drag/drop files */
    handleFiles(files: File[]): Observable<void>;
    /** Validates synchronous validations */
    validateFileSync(file: File): boolean;
    /** Validates asynchronous validations */
    validateFileAsync(file: File): Observable<boolean>;
    /** Handles input and drag&drop files */
    handleInputFile(file: File, index: any): void;
    /** Validates if upload type is single so another file cannot be added */
    isValidUploadType(file: any): boolean;
    /** Validates max file count */
    isValidMaxFileCount(files: File[]): boolean;
    /** On file dropped */
    dropped(event: UploadEvent): void;
    /** Add file to file list after succesfull validation */
    pushFile(file: File, fileName?: string): void;
    /** Opens cropper for image crop */
    openCropper(file: File): void;
    getSafeUrl(file: File): SafeResourceUrl;
    /** On img load event */
    cropperImgLoaded(e: any): void;
    /** Close or cancel cropper */
    closeCropper(filePreview: FilePreviewModel): void;
    /** Removes files from files list */
    removeFileFromList(file: FilePreviewModel): void;
    /** Emits event when file upload api returns success  */
    onUploadSuccess(fileItem: FilePreviewModel): void;
    /** Emits event when file upload api returns success  */
    onUploadFail(er: HttpErrorResponse): void;
    /** Validates file extension */
    isValidExtension(file: File, fileName: string): boolean;
    /** Validates selected file size and total file size */
    isValidSize(file: File, size: number): boolean;
    bitsToMb(size: any): number;
    /** when crop button submitted */
    onCropSubmit(): void;
    /** After crop submit */
    blobFallBack(blob: Blob): void;
    removeFile(fileItem: FilePreviewModel): void;
    /** Emits event when file remove api returns success  */
    onRemoveSuccess(fileItem: FilePreviewModel): void;
}
