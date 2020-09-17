/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FilePickerService } from './file-picker.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { getFileType } from './file-upload.utils';
import { FileValidationTypes } from './validation-error.model';
import { FilePickerAdapter } from './file-picker.adapter';
import { combineLatest, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DefaultCaptions } from './default-captions';
import { base64ToFile } from 'ngx-image-cropper';
import { FileDroppingProcessModel } from './file-dropping-process.model';
import { CropperOptionsModel } from './cropper-options.model';
// declare var Cropper;
export class FilePickerComponent {
    /**
     * @param {?} fileService
     * @param {?} ref
     */
    constructor(fileService, ref) {
        this.fileService = fileService;
        this.ref = ref;
        /**
         * Emitted when file upload via api successfully. Emitted for every file
         */
        this.uploadSuccess = new EventEmitter();
        /**
         * Emitted when file upload via api failed. Emitted for every file
         */
        this.uploadFail = new EventEmitter();
        /**
         * Emitted when file is removed via api successfully. Emitted for every file
         */
        this.removeSuccess = new EventEmitter();
        /**
         * Emitted on file validation fail
         */
        this.validationError = new EventEmitter();
        /**
         * Emitted when file is added and passed validations. Not uploaded yet
         */
        this.fileAdded = new EventEmitter();
        /**
         * Whether to enable cropper. Default: disabled
         */
        this.enableCropper = false;
        /**
         * Whether to show default drag and drop zone. Default:true
         */
        this.showeDragDropZone = true;
        /**
         * Whether to show default files preview container. Default: true
         */
        this.showPreviewContainer = true;
        /**
         * Single or multiple. Default: multi
         */
        this.uploadType = 'multi';
        this.files = [];
        /**
         * Files array for cropper. Will be shown equentially if crop enabled
         */
        this.filesForCropper = [];
        this.cropClosed$ = new Subject();
        this._onDestroy$ = new Subject();
        this.cropperIsReady = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setCropperOptions();
        this.listenToCropClose();
        this.setCaptions();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy$.next();
    }
    /**
     * @return {?}
     */
    setCaptions() {
        this._captions = this.captions || DefaultCaptions;
    }
    /**
     * Listen when Cropper is closed and open new cropper if next image exists
     * @return {?}
     */
    listenToCropClose() {
        this.cropClosed$
            // .pipe(takeUntil(this._onDestroy$))
            .subscribe((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            /** @type {?} */
            const croppedIndex = this.filesForCropper.findIndex((/**
             * @param {?} item
             * @return {?}
             */
            item => item.name === res.fileName));
            /** @type {?} */
            const nextFile = croppedIndex !== -1
                ? this.filesForCropper[croppedIndex + 1]
                : undefined;
            //  console.log('cropped', res);
            this.filesForCropper = [...this.filesForCropper].filter((/**
             * @param {?} item
             * @return {?}
             */
            item => item.name !== res.fileName));
            // console.log(this.filesForCropper);
            if (nextFile) {
                this.openCropper(nextFile);
            }
        }));
    }
    /**
     * Sets custom cropper options if avaiable
     * @return {?}
     */
    setCropperOptions() {
        this.cropperOptions = this.cropperOptions === undefined ? new CropperOptionsModel({}) : new CropperOptionsModel(this.cropperOptions);
    }
    /**
     * On input file selected
     * @param {?} fileInput
     * @return {?}
     */
    onChange(fileInput) {
        /** @type {?} */
        const files = Array.from(fileInput.files);
        this.handleFiles(files).subscribe();
    }
    /**
     * Handles input and drag/drop files
     * @param {?} files
     * @return {?}
     */
    handleFiles(files) {
        if (!this.isValidMaxFileCount(files)) {
            return of(null);
        }
        /** @type {?} */
        const isValidUploadSync = files.every((/**
         * @param {?} item
         * @return {?}
         */
        item => this.validateFileSync(item)));
        /** @type {?} */
        const asyncFunctions = files.map((/**
         * @param {?} item
         * @return {?}
         */
        item => this.validateFileAsync(item)));
        return combineLatest(...asyncFunctions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            /** @type {?} */
            const isValidUploadAsync = res.every((/**
             * @param {?} result
             * @return {?}
             */
            result => result === true));
            if (!isValidUploadSync || !isValidUploadAsync) {
                return;
            }
            files.forEach((/**
             * @param {?} file
             * @param {?} index
             * @return {?}
             */
            (file, index) => {
                this.handleInputFile(file, index);
            }));
        })));
    }
    /**
     * Validates synchronous validations
     * @param {?} file
     * @return {?}
     */
    validateFileSync(file) {
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
    /**
     * Validates asynchronous validations
     * @param {?} file
     * @return {?}
     */
    validateFileAsync(file) {
        if (!this.customValidator) {
            return of(true);
        }
        return this.customValidator(file).pipe(tap((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (!res) {
                this.validationError.next({
                    file: file,
                    error: FileValidationTypes.customValidator
                });
            }
        })));
    }
    /**
     * Handles input and drag&drop files
     * @param {?} file
     * @param {?} index
     * @return {?}
     */
    handleInputFile(file, index) {
        /** @type {?} */
        const type = getFileType(file.type);
        if (type === 'image' && this.enableCropper) {
            this.filesForCropper.push(file);
            if (!this.currentCropperFile) {
                this.openCropper(file);
                this.ref.detectChanges();
            }
        }
        else {
            /** Size is not initially checked on handleInputFiles because of cropper size change */
            if (this.isValidSize(file, file.size)) {
                this.pushFile(file);
            }
        }
    }
    /**
     * Validates if upload type is single so another file cannot be added
     * @param {?} file
     * @return {?}
     */
    isValidUploadType(file) {
        if (this.uploadType === 'single' && this.files.length > 0) {
            this.validationError.next({
                file: file,
                error: FileValidationTypes.uploadType
            });
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * Validates max file count
     * @param {?} files
     * @return {?}
     */
    isValidMaxFileCount(files) {
        if (!this.fileMaxCount ||
            this.fileMaxCount >= this.files.length + files.length) {
            return true;
        }
        else {
            this.validationError.next({
                file: null,
                error: FileValidationTypes.fileMaxCount
            });
            return false;
        }
    }
    /**
     * On file dropped
     * @param {?} event
     * @return {?}
     */
    dropped(event) {
        this.droppingProcess = new FileDroppingProcessModel(event.files.length);
        for (const droppedFile of event.files) {
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                /** @type {?} */
                const fileEntry = (/** @type {?} */ (droppedFile.fileEntry));
                fileEntry.file((/**
                 * @param {?} file
                 * @return {?}
                 */
                (file) => {
                    this.droppingProcess.addFileForUpload(file);
                }));
            }
            else {
                // It was a directory (empty directories are added, otherwise only files)
                /** @type {?} */
                const fileEntry = (/** @type {?} */ (droppedFile.fileEntry));
                // console.log(droppedFile.relativePath, fileEntry);
            }
        }
        this.handleFilesIfDroppingProcessIsFinished();
    }
    /**
     * Add file to file list after succesfull validation
     * @param {?} file
     * @param {?=} fileName
     * @return {?}
     */
    pushFile(file, fileName = file.name) {
        this.files.push({ file: file, fileName: fileName });
        this.fileAdded.next({ file: file, fileName: fileName });
    }
    /**
     * Opens cropper for image crop
     * @param {?} file
     * @return {?}
     */
    openCropper(file) {
        this.currentCropperFile = file;
    }
    /**
     * @param {?} file
     * @return {?}
     */
    getSafeUrl(file) {
        return this.fileService.createSafeUrl(file);
    }
    /**
     * Close or cancel cropper
     * @param {?} filePreview
     * @return {?}
     */
    closeCropper(filePreview) {
        this.currentCropperFile = undefined;
        this.cropperIsReady = false;
        this.cropClosed$.next(filePreview);
    }
    /**
     * Removes files from files list
     * @param {?} file
     * @return {?}
     */
    removeFileFromList(file) {
        this.files = this.files.filter((/**
         * @param {?} f
         * @return {?}
         */
        f => f !== file));
    }
    /**
     * Emits event when file upload api returns success
     * @param {?} fileItem
     * @return {?}
     */
    onUploadSuccess(fileItem) {
        this.uploadSuccess.next(fileItem);
    }
    /**
     * Emits event when file upload api returns failure
     * @param {?} er
     * @return {?}
     */
    onUploadFail(er) {
        this.uploadFail.next(er);
    }
    /**
     * Validates file extension
     * @param {?} file
     * @param {?} fileName
     * @return {?}
     */
    isValidExtension(file, fileName) {
        if (!this.fileExtensions) {
            return true;
        }
        /** @type {?} */
        const extension = fileName.split('.').pop();
        /** @type {?} */
        const fileExtensions = this.fileExtensions.map((/**
         * @param {?} ext
         * @return {?}
         */
        ext => ext.toLowerCase()));
        if (fileExtensions.indexOf(extension.toLowerCase()) === -1) {
            this.validationError.next({ file: file, error: FileValidationTypes.extensions });
            return false;
        }
        return true;
    }
    /**
     * Validates selected file size and total file size
     * @param {?} file
     * @param {?} size
     * @return {?}
     */
    isValidSize(file, size) {
        /**
         * Validating selected file size
         * @type {?}
         */
        const res = this.bitsToMb(size.toString());
        /** @type {?} */
        let isValidFileSize;
        /** @type {?} */
        let isValidTotalFileSize;
        if (!this.fileMaxSize || (this.fileMaxSize && res < this.fileMaxSize)) {
            isValidFileSize = true;
        }
        else {
            this.validationError.next({
                file: file,
                error: FileValidationTypes.fileMaxSize
            });
        }
        /**
         * Validating Total Files Size
         * @type {?}
         */
        const totalBits = this.files
            .map((/**
         * @param {?} f
         * @return {?}
         */
        f => f.file.size))
            .reduce((/**
         * @param {?} acc
         * @param {?} curr
         * @return {?}
         */
        (acc, curr) => acc + curr), 0);
        if (!this.totalMaxSize ||
            (this.totalMaxSize &&
                this.bitsToMb(totalBits + file.size) < this.totalMaxSize)) {
            isValidTotalFileSize = true;
        }
        else {
            this.validationError.next({
                file: file,
                error: FileValidationTypes.totalMaxSize
            });
        }
        return !!isValidFileSize && isValidTotalFileSize;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    bitsToMb(size) {
        return parseFloat(size) / 1048576;
    }
    /**
     * when crop button submitted
     * @return {?}
     */
    onCropSubmit() {
        this.blobFallBack(this.croppedImage);
    }
    /**
     * After crop submit
     * @param {?} blob
     * @return {?}
     */
    blobFallBack(blob) {
        if (!blob) {
            return;
        }
        if (this.isValidSize((/** @type {?} */ (blob)), blob.size)) {
            this.pushFile((/** @type {?} */ (blob)), this.currentCropperFile.name);
        }
        this.closeCropper({
            file: (/** @type {?} */ (blob)),
            fileName: this.currentCropperFile.name
        });
    }
    /**
     * @param {?} fileItem
     * @return {?}
     */
    removeFile(fileItem) {
        if (this.adapter) {
            this.adapter.removeFile(fileItem).subscribe((/**
             * @param {?} res
             * @return {?}
             */
            res => {
                this.onRemoveSuccess(fileItem);
            }));
        }
        else {
            console.warn('no adapter was provided');
        }
    }
    /**
     * Emits event when file remove api returns success
     * @param {?} fileItem
     * @return {?}
     */
    onRemoveSuccess(fileItem) {
        this.removeSuccess.next(fileItem);
        this.removeFileFromList(fileItem);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    imageCropped(event) {
        this.croppedImage = base64ToFile(event.base64);
    }
    /**
     * @return {?}
     */
    imageLoaded() {
        this.cropperIsReady = true;
    }
    /**
     * @return {?}
     */
    loadImageFailed() {
        console.log('Load Image Failed');
        this.closeCropper({
            file: this.currentCropperFile,
            fileName: this.currentCropperFile.name
        });
        if (this.cropperOptions.loadImageFailed instanceof Function) {
            this.cropperOptions.loadImageFailed();
        }
    }
    /**
     * @private
     * @return {?}
     */
    handleFilesIfDroppingProcessIsFinished() {
        this.droppingProcess.diminishCounter();
        if (this.droppingProcess.isProcessingFinished()) {
            this.handleFiles(this.droppingProcess.getFiles()).subscribe();
        }
        else {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.handleFilesIfDroppingProcessIsFinished();
            }), this.droppingProcess.checkTimeIntervalMS);
        }
    }
}
FilePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-file-picker',
                template: "<div\n(click)=\"fileInput.click()\"\nclass=\"file-drop-wrapper\"\n*ngIf=\"showeDragDropZone\"\n>\n<file-drop\n  (onFileDrop)=\"dropped($event)\"\n  [customstyle]=\"'custom-drag'\"\n  [captions]=\"_captions\"\n>\n  <ng-content select=\".dropzoneTemplate\"> </ng-content>\n</file-drop>\n</div>\n\n<input\ntype=\"file\"\nname=\"file[]\"\nid=\"fileInput\"\n#fileInput\n[multiple]=\"uploadType === 'multi' ? 'multiple' : ''\"\n(click)=\"fileInput.value = null\"\n(change)=\"onChange(fileInput)\"\n[accept]=\"accept\"\nclass=\"file-input\"\n/>\n\n<div class=\"cropperJsOverlay\" *ngIf=\"currentCropperFile\">\n  <div class=\"cropperJsBox\" [ngClass]=\"cropperIsReady? '' : 'visually-hidden'\">\n    <image-cropper\n      [imageFile]=\"currentCropperFile\"\n      [aspectRatio]=\"cropperOptions.aspectRatio\"\n      [autoCrop]=\"true\"\n      [maintainAspectRatio]=\"cropperOptions.maintainAspectRatio\"\n      format=\"png\"\n      [resizeToWidth]=\"cropperOptions.resizeToWidth\"\n      [resizeToHeight]=\"cropperOptions.resizeToHeight\"\n      [cropperStaticWidth]=\"cropperOptions.cropperStaticWidth\"\n      [cropperStaticHeight]=\"cropperOptions.cropperStaticHeight\"\n      [cropperMinWidth]=\"cropperOptions.cropperMinWidth\"\n      [cropperMinHeight]=\"cropperOptions.cropperMinHeight\"\n      [initialStepSize]=\"cropperOptions.initialStepSize\"\n      [onlyScaleDown]=\"cropperOptions.onlyScaleDown\"\n      [roundCropper]=\"cropperOptions.roundCropper\"\n      [imageQuality]=\"cropperOptions.imageQuality\"\n      [alignImage]=\"cropperOptions.alignImage\"\n      [backgroundColor]=\"cropperOptions.backgroundColor\"\n      [hideResizeSquares]=\"cropperOptions.hideResizeSquares\"\n      [disabled]=\"cropperOptions.disabled\"\n      [canvasRotation]=\"cropperOptions.canvasRotation\"\n      [transform]=\"cropperOptions.transform\"\n      (imageCropped)=\"imageCropped($event)\"\n      (imageLoaded)=\"imageLoaded()\"\n      (loadImageFailed)=\"loadImageFailed()\"\n    ></image-cropper>\n\n    <div class=\"cropper-actions\">\n      <button class=\"cropSubmit\" (click)=\"onCropSubmit()\">\n        {{ _captions?.cropper?.crop }}\n      </button>\n      <button\n        class=\"cropCancel\"\n        (click)=\"\n          closeCropper({\n            file: currentCropperFile,\n            fileName: currentCropperFile.name\n          })\n        \"\n      >\n        {{ _captions?.cropper?.cancel }}\n      </button>\n    </div>\n  </div>\n  <div class=\"cropperJsBox loader_holder\" *ngIf=\"!cropperIsReady\">\n    <div class=\"loader\"></div>\n  </div>\n</div>\n\n<div\nclass=\"files-preview-wrapper\"\n[ngClass]=\"{ 'visually-hidden': !showPreviewContainer }\"\n>\n<file-preview-container\n  *ngIf=\"files\"\n  [previewFiles]=\"files\"\n  (removeFile)=\"removeFile($event)\"\n  (uploadSuccess)=\"onUploadSuccess($event)\"\n  (uploadFail)=\"onUploadFail($event)\"\n  [adapter]=\"adapter\"\n  [itemTemplate]=\"itemTemplate\"\n  [captions]=\"_captions\"\n>\n</file-preview-container>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["*{box-sizing:border-box}:host{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:center;align-items:center;width:100%;height:100%;overflow:auto;max-width:440px;border-radius:6px}.files-preview-wrapper{width:100%}.file-drop-wrapper{width:100%;background:#fafbfd;padding-top:20px}.preview-container{display:-webkit-box;display:flex}.cropperJsOverlay{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;position:fixed;z-index:999;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,.32)}.cropperJsBox{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;max-height:calc(100vh - 38px - 50px);max-width:90vw;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)}.cropperJsBox .cropper-actions{display:-webkit-box;display:flex}.cropperJsBox .cropper-actions button{margin:5px;padding:12px 25px;border-radius:6px;border:0;cursor:pointer}.cropperJsBox .cropper-actions .cropSubmit{color:#fff;background:#16a085}::ng-deep.cropper img{max-height:300px!important}#images{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;width:500px;overflow-x:auto}#images .image{-webkit-box-flex:0;flex:0 0 100px;margin:0 2px;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:end;align-items:flex-end}#fileInput{display:none}.uploader-submit-btn{background:#ffd740;color:rgba(0,0,0,.87);border:0;padding:0 16px;line-height:36px;font-size:15px;margin-top:12px;border-radius:4px;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);cursor:pointer}button:disabled{color:rgba(0,0,0,.26);background:#dcdcdc}.visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}.loader{border:8px solid #f3f3f3;border-radius:50%;border-top:8px solid #000;width:120px;height:120px;-webkit-animation:2s linear infinite spin;animation:2s linear infinite spin;display:inline-block}.loader_holder{padding:120px;display:block;float:right;background-color:#fff}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0)}100%{-webkit-transform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}"]
            }] }
];
/** @nocollapse */
FilePickerComponent.ctorParameters = () => [
    { type: FilePickerService },
    { type: ChangeDetectorRef }
];
FilePickerComponent.propDecorators = {
    uploadSuccess: [{ type: Output }],
    uploadFail: [{ type: Output }],
    removeSuccess: [{ type: Output }],
    validationError: [{ type: Output }],
    fileAdded: [{ type: Output }],
    customValidator: [{ type: Input }],
    enableCropper: [{ type: Input }],
    showeDragDropZone: [{ type: Input }],
    showPreviewContainer: [{ type: Input }],
    itemTemplate: [{ type: Input }],
    uploadType: [{ type: Input }],
    fileMaxSize: [{ type: Input }],
    fileMaxCount: [{ type: Input }],
    totalMaxSize: [{ type: Input }],
    accept: [{ type: Input }],
    fileExtensions: [{ type: Input }],
    cropperOptions: [{ type: Input }],
    adapter: [{ type: Input }],
    dropzoneTemplate: [{ type: Input }],
    captions: [{ type: Input }]
};
if (false) {
    /**
     * Emitted when file upload via api successfully. Emitted for every file
     * @type {?}
     */
    FilePickerComponent.prototype.uploadSuccess;
    /**
     * Emitted when file upload via api failed. Emitted for every file
     * @type {?}
     */
    FilePickerComponent.prototype.uploadFail;
    /**
     * Emitted when file is removed via api successfully. Emitted for every file
     * @type {?}
     */
    FilePickerComponent.prototype.removeSuccess;
    /**
     * Emitted on file validation fail
     * @type {?}
     */
    FilePickerComponent.prototype.validationError;
    /**
     * Emitted when file is added and passed validations. Not uploaded yet
     * @type {?}
     */
    FilePickerComponent.prototype.fileAdded;
    /**
     * Custom validator function
     * @type {?}
     */
    FilePickerComponent.prototype.customValidator;
    /**
     * Whether to enable cropper. Default: disabled
     * @type {?}
     */
    FilePickerComponent.prototype.enableCropper;
    /**
     * Whether to show default drag and drop zone. Default:true
     * @type {?}
     */
    FilePickerComponent.prototype.showeDragDropZone;
    /**
     * Whether to show default files preview container. Default: true
     * @type {?}
     */
    FilePickerComponent.prototype.showPreviewContainer;
    /**
     * Preview Item template
     * @type {?}
     */
    FilePickerComponent.prototype.itemTemplate;
    /**
     * Single or multiple. Default: multi
     * @type {?}
     */
    FilePickerComponent.prototype.uploadType;
    /**
     * Max size of selected file in MB. Default: no limit
     * @type {?}
     */
    FilePickerComponent.prototype.fileMaxSize;
    /**
     * Max count of file in multi-upload. Default: no limit
     * @type {?}
     */
    FilePickerComponent.prototype.fileMaxCount;
    /**
     * Total Max size limit of all files in MB. Default: no limit
     * @type {?}
     */
    FilePickerComponent.prototype.totalMaxSize;
    /**
     * Which file types to show on choose file dialog. Default: show all
     * @type {?}
     */
    FilePickerComponent.prototype.accept;
    /** @type {?} */
    FilePickerComponent.prototype.files;
    /**
     * File extensions filter
     * @type {?}
     */
    FilePickerComponent.prototype.fileExtensions;
    /** @type {?} */
    FilePickerComponent.prototype.cropper;
    /**
     * Cropper options.
     * @type {?}
     */
    FilePickerComponent.prototype.cropperOptions;
    /**
     * Files array for cropper. Will be shown equentially if crop enabled
     * @type {?}
     */
    FilePickerComponent.prototype.filesForCropper;
    /**
     * Current file to be shown in cropper
     * @type {?}
     */
    FilePickerComponent.prototype.currentCropperFile;
    /**
     * Custom api Adapter for uploading/removing files
     * @type {?}
     */
    FilePickerComponent.prototype.adapter;
    /**
     * Custome template for dropzone
     * @type {?}
     */
    FilePickerComponent.prototype.dropzoneTemplate;
    /**
     * Custom captions input. Used for multi language support
     * @type {?}
     */
    FilePickerComponent.prototype.captions;
    /**
     * captions object
     * @type {?}
     */
    FilePickerComponent.prototype._captions;
    /** @type {?} */
    FilePickerComponent.prototype.cropClosed$;
    /** @type {?} */
    FilePickerComponent.prototype._onDestroy$;
    /** @type {?} */
    FilePickerComponent.prototype.croppedImage;
    /** @type {?} */
    FilePickerComponent.prototype.cropperIsReady;
    /**
     * @type {?}
     * @private
     */
    FilePickerComponent.prototype.droppingProcess;
    /**
     * @type {?}
     * @private
     */
    FilePickerComponent.prototype.fileService;
    /**
     * @type {?}
     * @private
     */
    FilePickerComponent.prototype.ref;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF3ZXNvbWUtdXBsb2FkZXIvIiwic291cmNlcyI6WyJsaWIvZmlsZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQ0wsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQzFDLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxtQkFBbUIsRUFBbUIsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQU0xRCxPQUFPLEVBQUUsYUFBYSxFQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUQsT0FBTyxFQUFFLEdBQUcsRUFBYSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHckQsT0FBTyxFQUFDLFlBQVksRUFBb0IsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUN2RSxPQUFPLEVBQWlCLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7O0FBUzVFLE1BQU0sT0FBTyxtQkFBbUI7Ozs7O0lBZ0U5QixZQUNVLFdBQThCLEVBQzlCLEdBQXNCO1FBRHRCLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUM5QixRQUFHLEdBQUgsR0FBRyxDQUFtQjs7OztRQWhFdEIsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQzs7OztRQUVyRCxl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QUNvQjs7Ozs7SUFFcEIsMkNBQ3FCOzs7OztJQUVyQiwyQ0FDcUI7Ozs7O0lBRXJCLHFDQUNlOztJQUNmLG9DQUErQjs7Ozs7SUFFL0IsNkNBQWtDOztJQUNsQyxzQ0FBYTs7Ozs7SUFFYiw2Q0FBd0M7Ozs7O0lBRXhDLDhDQUE2Qjs7Ozs7SUFFN0IsaURBQXlCOzs7OztJQUV6QixzQ0FDMkI7Ozs7O0lBRTNCLCtDQUE0Qzs7Ozs7SUFFNUMsdUNBQW9DOzs7OztJQUVwQyx3Q0FBNEI7O0lBQzVCLDBDQUE4Qzs7SUFDOUMsMENBQWtDOztJQUVsQywyQ0FBbUI7O0lBQ25CLDZDQUF1Qjs7Ozs7SUFFdkIsOENBQWtEOzs7OztJQUdoRCwwQ0FBc0M7Ozs7O0lBQ3RDLGtDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZpbGVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi9maWxlLXBpY2tlci5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNhZmVSZXNvdXJjZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgRmlsZVByZXZpZXdNb2RlbCB9IGZyb20gJy4vZmlsZS1wcmV2aWV3Lm1vZGVsJztcbmltcG9ydCB7IGdldEZpbGVUeXBlIH0gZnJvbSAnLi9maWxlLXVwbG9hZC51dGlscyc7XG5pbXBvcnQgeyBGaWxlVmFsaWRhdGlvblR5cGVzLCBWYWxpZGF0aW9uRXJyb3IgfSBmcm9tICcuL3ZhbGlkYXRpb24tZXJyb3IubW9kZWwnO1xuaW1wb3J0IHsgRmlsZVBpY2tlckFkYXB0ZXIgfSBmcm9tICcuL2ZpbGUtcGlja2VyLmFkYXB0ZXInO1xuaW1wb3J0IHtcbiAgRmlsZVN5c3RlbURpcmVjdG9yeUVudHJ5LFxuICBGaWxlU3lzdGVtRmlsZUVudHJ5LFxuICBVcGxvYWRFdmVudFxufSBmcm9tICcuL2ZpbGUtZHJvcCc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB0YWtlVW50aWwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERlZmF1bHRDYXB0aW9ucyB9IGZyb20gJy4vZGVmYXVsdC1jYXB0aW9ucyc7XG5pbXBvcnQgeyBVcGxvYWRlckNhcHRpb25zIH0gZnJvbSAnLi91cGxvYWRlci1jYXB0aW9ucyc7XG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7YmFzZTY0VG9GaWxlLCBJbWFnZUNyb3BwZWRFdmVudH0gZnJvbSAnbmd4LWltYWdlLWNyb3BwZXInO1xuaW1wb3J0IHtGaWxlRHJvcHBpbmdQcm9jZXNzTW9kZWx9IGZyb20gJy4vZmlsZS1kcm9wcGluZy1wcm9jZXNzLm1vZGVsJztcbmltcG9ydCB7Q3JvcHBlck9wdGlvbnMsIENyb3BwZXJPcHRpb25zTW9kZWx9IGZyb20gJy4vY3JvcHBlci1vcHRpb25zLm1vZGVsJztcblxuLy8gZGVjbGFyZSB2YXIgQ3JvcHBlcjtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1maWxlLXBpY2tlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWxlLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZpbGUtcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEZpbGVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKiBFbWl0dGVkIHdoZW4gZmlsZSB1cGxvYWQgdmlhIGFwaSBzdWNjZXNzZnVsbHkuIEVtaXR0ZWQgZm9yIGV2ZXJ5IGZpbGUgKi9cbiAgQE91dHB1dCgpIHVwbG9hZFN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVQcmV2aWV3TW9kZWw+KCk7XG4gIC8qKiBFbWl0dGVkIHdoZW4gZmlsZSB1cGxvYWQgdmlhIGFwaSBmYWlsZWQuIEVtaXR0ZWQgZm9yIGV2ZXJ5IGZpbGUgKi9cbiAgQE91dHB1dCgpIHVwbG9hZEZhaWwgPSBuZXcgRXZlbnRFbWl0dGVyPEh0dHBFcnJvclJlc3BvbnNlPigpO1xuICAvKiogRW1pdHRlZCB3aGVuIGZpbGUgaXMgcmVtb3ZlZCB2aWEgYXBpIHN1Y2Nlc3NmdWxseS4gRW1pdHRlZCBmb3IgZXZlcnkgZmlsZSAqL1xuICBAT3V0cHV0KCkgcmVtb3ZlU3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVByZXZpZXdNb2RlbD4oKTtcbiAgLyoqIEVtaXR0ZWQgb24gZmlsZSB2YWxpZGF0aW9uIGZhaWwgKi9cbiAgQE91dHB1dCgpIHZhbGlkYXRpb25FcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8VmFsaWRhdGlvbkVycm9yPigpO1xuICAvKiogRW1pdHRlZCB3aGVuIGZpbGUgaXMgYWRkZWQgYW5kIHBhc3NlZCB2YWxpZGF0aW9ucy4gTm90IHVwbG9hZGVkIHlldCAqL1xuICBAT3V0cHV0KCkgZmlsZUFkZGVkID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlUHJldmlld01vZGVsPigpO1xuICAvKiogQ3VzdG9tIHZhbGlkYXRvciBmdW5jdGlvbiAqL1xuICBASW5wdXQoKSBjdXN0b21WYWxpZGF0b3I6IChmaWxlOiBGaWxlKSA9PiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICAvKiogV2hldGhlciB0byBlbmFibGUgY3JvcHBlci4gRGVmYXVsdDogZGlzYWJsZWQgKi9cbiAgQElucHV0KClcbiAgZW5hYmxlQ3JvcHBlciA9IGZhbHNlO1xuICAvKiogV2hldGhlciB0byBzaG93IGRlZmF1bHQgZHJhZyBhbmQgZHJvcCB6b25lLiBEZWZhdWx0OnRydWUgKi9cbiAgQElucHV0KCkgc2hvd2VEcmFnRHJvcFpvbmUgPSB0cnVlO1xuICAvKiogV2hldGhlciB0byBzaG93IGRlZmF1bHQgZmlsZXMgcHJldmlldyBjb250YWluZXIuIERlZmF1bHQ6IHRydWUgKi9cbiAgQElucHV0KCkgc2hvd1ByZXZpZXdDb250YWluZXIgPSB0cnVlO1xuICAvKiogUHJldmlldyBJdGVtIHRlbXBsYXRlICovXG4gIEBJbnB1dCgpIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgLyoqIFNpbmdsZSBvciBtdWx0aXBsZS4gRGVmYXVsdDogbXVsdGkgKi9cbiAgQElucHV0KClcbiAgdXBsb2FkVHlwZSA9ICdtdWx0aSc7XG4gIC8qKiBNYXggc2l6ZSBvZiBzZWxlY3RlZCBmaWxlIGluIE1CLiBEZWZhdWx0OiBubyBsaW1pdCAqL1xuICBASW5wdXQoKVxuICBmaWxlTWF4U2l6ZTogbnVtYmVyO1xuICAvKiogTWF4IGNvdW50IG9mIGZpbGUgaW4gbXVsdGktdXBsb2FkLiBEZWZhdWx0OiBubyBsaW1pdCAqL1xuICBASW5wdXQoKVxuICBmaWxlTWF4Q291bnQ6IG51bWJlcjtcbiAgLyoqIFRvdGFsIE1heCBzaXplIGxpbWl0IG9mIGFsbCBmaWxlcyBpbiBNQi4gRGVmYXVsdDogbm8gbGltaXQgKi9cbiAgQElucHV0KClcbiAgdG90YWxNYXhTaXplOiBudW1iZXI7XG4gIC8qKiBXaGljaCBmaWxlIHR5cGVzIHRvIHNob3cgb24gY2hvb3NlIGZpbGUgZGlhbG9nLiBEZWZhdWx0OiBzaG93IGFsbCAqL1xuICBASW5wdXQoKVxuICBhY2NlcHQ6IHN0cmluZztcbiAgZmlsZXM6IEZpbGVQcmV2aWV3TW9kZWxbXSA9IFtdO1xuICAvKiogRmlsZSBleHRlbnNpb25zIGZpbHRlciAqL1xuICBASW5wdXQoKSBmaWxlRXh0ZW5zaW9uczogU3RyaW5nW107XG4gIGNyb3BwZXI6IGFueTtcbiAgLyoqIENyb3BwZXIgb3B0aW9ucy4gKi9cbiAgQElucHV0KCkgY3JvcHBlck9wdGlvbnM6IENyb3BwZXJPcHRpb25zO1xuICAvKiogRmlsZXMgYXJyYXkgZm9yIGNyb3BwZXIuIFdpbGwgYmUgc2hvd24gZXF1ZW50aWFsbHkgaWYgY3JvcCBlbmFibGVkICovXG4gIGZpbGVzRm9yQ3JvcHBlcjogRmlsZVtdID0gW107XG4gIC8qKiBDdXJyZW50IGZpbGUgdG8gYmUgc2hvd24gaW4gY3JvcHBlciovXG4gIGN1cnJlbnRDcm9wcGVyRmlsZTogRmlsZTtcbiAgLyoqIEN1c3RvbSBhcGkgQWRhcHRlciBmb3IgdXBsb2FkaW5nL3JlbW92aW5nIGZpbGVzICovXG4gIEBJbnB1dCgpXG4gIGFkYXB0ZXI6IEZpbGVQaWNrZXJBZGFwdGVyO1xuICAvKiogIEN1c3RvbWUgdGVtcGxhdGUgZm9yIGRyb3B6b25lICovXG4gIEBJbnB1dCgpIGRyb3B6b25lVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIC8qKiBDdXN0b20gY2FwdGlvbnMgaW5wdXQuIFVzZWQgZm9yIG11bHRpIGxhbmd1YWdlIHN1cHBvcnQgKi9cbiAgQElucHV0KCkgY2FwdGlvbnM6IFVwbG9hZGVyQ2FwdGlvbnM7XG4gIC8qKiBjYXB0aW9ucyBvYmplY3QqL1xuICBfY2FwdGlvbnM6IFVwbG9hZGVyQ2FwdGlvbnM7XG4gIGNyb3BDbG9zZWQkID0gbmV3IFN1YmplY3Q8RmlsZVByZXZpZXdNb2RlbD4oKTtcbiAgX29uRGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNyb3BwZWRJbWFnZTogQmxvYjtcbiAgY3JvcHBlcklzUmVhZHkgPSBmYWxzZTtcblxuICBwcml2YXRlIGRyb3BwaW5nUHJvY2VzczogRmlsZURyb3BwaW5nUHJvY2Vzc01vZGVsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVQaWNrZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZXRDcm9wcGVyT3B0aW9ucygpO1xuICAgIHRoaXMubGlzdGVuVG9Dcm9wQ2xvc2UoKTtcbiAgICB0aGlzLnNldENhcHRpb25zKCk7XG4gIH1cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fb25EZXN0cm95JC5uZXh0KCk7XG4gIH1cbiAgc2V0Q2FwdGlvbnMoKSB7XG4gICAgdGhpcy5fY2FwdGlvbnMgPSB0aGlzLmNhcHRpb25zIHx8IERlZmF1bHRDYXB0aW9ucztcbiAgfVxuICAvKiogTGlzdGVuIHdoZW4gQ3JvcHBlciBpcyBjbG9zZWQgYW5kIG9wZW4gbmV3IGNyb3BwZXIgaWYgbmV4dCBpbWFnZSBleGlzdHMgKi9cbiAgbGlzdGVuVG9Dcm9wQ2xvc2UoKSB7XG4gICAgdGhpcy5jcm9wQ2xvc2VkJFxuICAgICAgLy8gLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgocmVzOiBGaWxlUHJldmlld01vZGVsKSA9PiB7XG4gICAgICAgIGNvbnN0IGNyb3BwZWRJbmRleCA9IHRoaXMuZmlsZXNGb3JDcm9wcGVyLmZpbmRJbmRleChcbiAgICAgICAgICBpdGVtID0+IGl0ZW0ubmFtZSA9PT0gcmVzLmZpbGVOYW1lXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG5leHRGaWxlID1cbiAgICAgICAgICBjcm9wcGVkSW5kZXggIT09IC0xXG4gICAgICAgICAgICA/IHRoaXMuZmlsZXNGb3JDcm9wcGVyW2Nyb3BwZWRJbmRleCArIDFdXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgLy8gIGNvbnNvbGUubG9nKCdjcm9wcGVkJywgcmVzKTtcbiAgICAgICAgdGhpcy5maWxlc0ZvckNyb3BwZXIgPSBbLi4udGhpcy5maWxlc0ZvckNyb3BwZXJdLmZpbHRlcihcbiAgICAgICAgICBpdGVtID0+IGl0ZW0ubmFtZSAhPT0gcmVzLmZpbGVOYW1lXG4gICAgICAgICk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZmlsZXNGb3JDcm9wcGVyKTtcbiAgICAgICAgaWYgKG5leHRGaWxlKSB7XG4gICAgICAgICAgdGhpcy5vcGVuQ3JvcHBlcihuZXh0RmlsZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqIFNldHMgY3VzdG9tIGNyb3BwZXIgb3B0aW9ucyBpZiBhdmFpYWJsZSAqL1xuICBzZXRDcm9wcGVyT3B0aW9ucygpIHtcbiAgICB0aGlzLmNyb3BwZXJPcHRpb25zID0gdGhpcy5jcm9wcGVyT3B0aW9ucyA9PT0gdW5kZWZpbmVkID8gbmV3IENyb3BwZXJPcHRpb25zTW9kZWwoe30pIDogbmV3IENyb3BwZXJPcHRpb25zTW9kZWwodGhpcy5jcm9wcGVyT3B0aW9ucyk7XG4gIH1cblxuICAvKiogT24gaW5wdXQgZmlsZSBzZWxlY3RlZCAqL1xuICBvbkNoYW5nZShmaWxlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICBjb25zdCBmaWxlczogRmlsZVtdID0gQXJyYXkuZnJvbShmaWxlSW5wdXQuZmlsZXMpO1xuICAgIHRoaXMuaGFuZGxlRmlsZXMoZmlsZXMpLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgaW5wdXQgYW5kIGRyYWcvZHJvcCBmaWxlcyAqL1xuICBoYW5kbGVGaWxlcyhmaWxlczogRmlsZVtdKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWRNYXhGaWxlQ291bnQoZmlsZXMpKSB7XG4gICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgfVxuICAgIGNvbnN0IGlzVmFsaWRVcGxvYWRTeW5jID0gZmlsZXMuZXZlcnkoaXRlbSA9PiB0aGlzLnZhbGlkYXRlRmlsZVN5bmMoaXRlbSkpO1xuICAgIGNvbnN0IGFzeW5jRnVuY3Rpb25zID0gZmlsZXMubWFwKGl0ZW0gPT4gdGhpcy52YWxpZGF0ZUZpbGVBc3luYyhpdGVtKSk7XG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdCguLi5hc3luY0Z1bmN0aW9ucykucGlwZShcbiAgICAgIG1hcChyZXMgPT4ge1xuICAgICAgICBjb25zdCBpc1ZhbGlkVXBsb2FkQXN5bmMgPSByZXMuZXZlcnkocmVzdWx0ID0+IHJlc3VsdCA9PT0gdHJ1ZSk7XG4gICAgICAgIGlmICghaXNWYWxpZFVwbG9hZFN5bmMgfHwgIWlzVmFsaWRVcGxvYWRBc3luYykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmaWxlcy5mb3JFYWNoKChmaWxlOiBGaWxlLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVJbnB1dEZpbGUoZmlsZSwgaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICAvKiogVmFsaWRhdGVzIHN5bmNocm9ub3VzIHZhbGlkYXRpb25zICovXG4gIHZhbGlkYXRlRmlsZVN5bmMoZmlsZTogRmlsZSk6IGJvb2xlYW4ge1xuICAgIGlmICghZmlsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNWYWxpZFVwbG9hZFR5cGUoZmlsZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzVmFsaWRFeHRlbnNpb24oZmlsZSwgZmlsZS5uYW1lKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICAvKiogVmFsaWRhdGVzIGFzeW5jaHJvbm91cyB2YWxpZGF0aW9ucyAqL1xuICB2YWxpZGF0ZUZpbGVBc3luYyhmaWxlOiBGaWxlKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgaWYgKCF0aGlzLmN1c3RvbVZhbGlkYXRvcikge1xuICAgICAgcmV0dXJuIG9mKHRydWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jdXN0b21WYWxpZGF0b3IoZmlsZSkucGlwZShcbiAgICAgIHRhcChyZXMgPT4ge1xuICAgICAgICBpZiAoIXJlcykge1xuICAgICAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yLm5leHQoe1xuICAgICAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgICAgIGVycm9yOiBGaWxlVmFsaWRhdGlvblR5cGVzLmN1c3RvbVZhbGlkYXRvclxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgLyoqIEhhbmRsZXMgaW5wdXQgYW5kIGRyYWcmZHJvcCBmaWxlcyAqL1xuICBoYW5kbGVJbnB1dEZpbGUoZmlsZTogRmlsZSwgaW5kZXgpOiB2b2lkIHtcbiAgICBjb25zdCB0eXBlID0gZ2V0RmlsZVR5cGUoZmlsZS50eXBlKTtcbiAgICBpZiAodHlwZSA9PT0gJ2ltYWdlJyAmJiB0aGlzLmVuYWJsZUNyb3BwZXIpIHtcbiAgICAgIHRoaXMuZmlsZXNGb3JDcm9wcGVyLnB1c2goZmlsZSk7XG4gICAgICBpZiAoIXRoaXMuY3VycmVudENyb3BwZXJGaWxlKSB7XG4gICAgICAgIHRoaXMub3BlbkNyb3BwZXIoZmlsZSk7XG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLyoqIFNpemUgaXMgbm90IGluaXRpYWxseSBjaGVja2VkIG9uIGhhbmRsZUlucHV0RmlsZXMgYmVjYXVzZSBvZiBjcm9wcGVyIHNpemUgY2hhbmdlICovXG4gICAgICBpZiAodGhpcy5pc1ZhbGlkU2l6ZShmaWxlLCBmaWxlLnNpemUpKSB7XG4gICAgICAgIHRoaXMucHVzaEZpbGUoZmlsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKiBWYWxpZGF0ZXMgaWYgdXBsb2FkIHR5cGUgaXMgc2luZ2xlIHNvIGFub3RoZXIgZmlsZSBjYW5ub3QgYmUgYWRkZWQgKi9cbiAgaXNWYWxpZFVwbG9hZFR5cGUoZmlsZSk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnVwbG9hZFR5cGUgPT09ICdzaW5nbGUnICYmIHRoaXMuZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3IubmV4dCh7XG4gICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgIGVycm9yOiBGaWxlVmFsaWRhdGlvblR5cGVzLnVwbG9hZFR5cGVcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgLyoqIFZhbGlkYXRlcyBtYXggZmlsZSBjb3VudCAqL1xuICBpc1ZhbGlkTWF4RmlsZUNvdW50KGZpbGVzOiBGaWxlW10pOiBib29sZWFuIHtcbiAgICBpZiAoXG4gICAgICAhdGhpcy5maWxlTWF4Q291bnQgfHxcbiAgICAgIHRoaXMuZmlsZU1heENvdW50ID49IHRoaXMuZmlsZXMubGVuZ3RoICsgZmlsZXMubGVuZ3RoXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3IubmV4dCh7XG4gICAgICAgIGZpbGU6IG51bGwsXG4gICAgICAgIGVycm9yOiBGaWxlVmFsaWRhdGlvblR5cGVzLmZpbGVNYXhDb3VudFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8qKiBPbiBmaWxlIGRyb3BwZWQgKi9cbiAgZHJvcHBlZChldmVudDogVXBsb2FkRXZlbnQpIHtcbiAgICB0aGlzLmRyb3BwaW5nUHJvY2VzcyA9IG5ldyBGaWxlRHJvcHBpbmdQcm9jZXNzTW9kZWwoZXZlbnQuZmlsZXMubGVuZ3RoKTtcblxuICAgIGZvciAoY29uc3QgZHJvcHBlZEZpbGUgb2YgZXZlbnQuZmlsZXMpIHtcbiAgICAgIC8vIElzIGl0IGEgZmlsZT9cbiAgICAgIGlmIChkcm9wcGVkRmlsZS5maWxlRW50cnkuaXNGaWxlKSB7XG4gICAgICAgIGNvbnN0IGZpbGVFbnRyeSA9IGRyb3BwZWRGaWxlLmZpbGVFbnRyeSBhcyBGaWxlU3lzdGVtRmlsZUVudHJ5O1xuICAgICAgICBmaWxlRW50cnkuZmlsZSgoZmlsZTogRmlsZSkgPT4ge1xuICAgICAgICAgIHRoaXMuZHJvcHBpbmdQcm9jZXNzLmFkZEZpbGVGb3JVcGxvYWQoZmlsZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSXQgd2FzIGEgZGlyZWN0b3J5IChlbXB0eSBkaXJlY3RvcmllcyBhcmUgYWRkZWQsIG90aGVyd2lzZSBvbmx5IGZpbGVzKVxuICAgICAgICBjb25zdCBmaWxlRW50cnkgPSBkcm9wcGVkRmlsZS5maWxlRW50cnkgYXMgRmlsZVN5c3RlbURpcmVjdG9yeUVudHJ5O1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkcm9wcGVkRmlsZS5yZWxhdGl2ZVBhdGgsIGZpbGVFbnRyeSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaGFuZGxlRmlsZXNJZkRyb3BwaW5nUHJvY2Vzc0lzRmluaXNoZWQoKTtcbiAgfVxuXG4gIC8qKiBBZGQgZmlsZSB0byBmaWxlIGxpc3QgYWZ0ZXIgc3VjY2VzZnVsbCB2YWxpZGF0aW9uICovXG4gIHB1c2hGaWxlKGZpbGU6IEZpbGUsIGZpbGVOYW1lID0gZmlsZS5uYW1lKTogdm9pZCB7XG4gICAgdGhpcy5maWxlcy5wdXNoKHsgZmlsZTogZmlsZSwgZmlsZU5hbWU6IGZpbGVOYW1lIH0pO1xuICAgIHRoaXMuZmlsZUFkZGVkLm5leHQoeyBmaWxlOiBmaWxlLCBmaWxlTmFtZTogZmlsZU5hbWUgfSk7XG4gIH1cblxuICAvKiogT3BlbnMgY3JvcHBlciBmb3IgaW1hZ2UgY3JvcCAqL1xuICBvcGVuQ3JvcHBlcihmaWxlOiBGaWxlKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50Q3JvcHBlckZpbGUgPSBmaWxlO1xuICB9XG5cbiAgZ2V0U2FmZVVybChmaWxlOiBGaWxlKTogU2FmZVJlc291cmNlVXJsIHtcbiAgICByZXR1cm4gdGhpcy5maWxlU2VydmljZS5jcmVhdGVTYWZlVXJsKGZpbGUpO1xuICB9XG5cbiAgLyoqIENsb3NlIG9yIGNhbmNlbCBjcm9wcGVyICovXG4gIGNsb3NlQ3JvcHBlcihmaWxlUHJldmlldzogRmlsZVByZXZpZXdNb2RlbCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudENyb3BwZXJGaWxlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuY3JvcHBlcklzUmVhZHkgPSBmYWxzZTtcbiAgICB0aGlzLmNyb3BDbG9zZWQkLm5leHQoZmlsZVByZXZpZXcpO1xuICB9XG4gIC8qKiBSZW1vdmVzIGZpbGVzIGZyb20gZmlsZXMgbGlzdCAqL1xuICByZW1vdmVGaWxlRnJvbUxpc3QoZmlsZTogRmlsZVByZXZpZXdNb2RlbCk6IHZvaWQge1xuICAgIHRoaXMuZmlsZXMgPSB0aGlzLmZpbGVzLmZpbHRlcihmID0+IGYgIT09IGZpbGUpO1xuICB9XG5cbiAgLyoqIEVtaXRzIGV2ZW50IHdoZW4gZmlsZSB1cGxvYWQgYXBpIHJldHVybnMgc3VjY2VzcyAgKi9cbiAgb25VcGxvYWRTdWNjZXNzKGZpbGVJdGVtOiBGaWxlUHJldmlld01vZGVsKTogdm9pZCB7XG4gICAgdGhpcy51cGxvYWRTdWNjZXNzLm5leHQoZmlsZUl0ZW0pO1xuICB9XG5cbiAgLyoqIEVtaXRzIGV2ZW50IHdoZW4gZmlsZSB1cGxvYWQgYXBpIHJldHVybnMgZmFpbHVyZSAgKi9cbiAgb25VcGxvYWRGYWlsKGVyOiBIdHRwRXJyb3JSZXNwb25zZSk6IHZvaWQge1xuICAgIHRoaXMudXBsb2FkRmFpbC5uZXh0KGVyKTtcbiAgfVxuXG4gIC8qKiBWYWxpZGF0ZXMgZmlsZSBleHRlbnNpb24gKi9cbiAgaXNWYWxpZEV4dGVuc2lvbihmaWxlOiBGaWxlLCBmaWxlTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICBpZiAoIXRoaXMuZmlsZUV4dGVuc2lvbnMpIHtyZXR1cm4gdHJ1ZTsgfVxuICAgICAgY29uc3QgZXh0ZW5zaW9uID0gZmlsZU5hbWUuc3BsaXQoJy4nKS5wb3AoKTtcbiAgICAgIGNvbnN0IGZpbGVFeHRlbnNpb25zID0gdGhpcy5maWxlRXh0ZW5zaW9ucy5tYXAoZXh0ID0+IGV4dC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIGlmIChmaWxlRXh0ZW5zaW9ucy5pbmRleE9mKGV4dGVuc2lvbi50b0xvd2VyQ2FzZSgpKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3IubmV4dCh7ZmlsZTogZmlsZSwgZXJyb3I6IEZpbGVWYWxpZGF0aW9uVHlwZXMuZXh0ZW5zaW9uc30pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG4gIC8qKiBWYWxpZGF0ZXMgc2VsZWN0ZWQgZmlsZSBzaXplIGFuZCB0b3RhbCBmaWxlIHNpemUgKi9cbiAgaXNWYWxpZFNpemUoZmlsZTogRmlsZSwgc2l6ZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgLyoqIFZhbGlkYXRpbmcgc2VsZWN0ZWQgZmlsZSBzaXplICovXG4gICAgY29uc3QgcmVzOiBudW1iZXIgPSB0aGlzLmJpdHNUb01iKHNpemUudG9TdHJpbmcoKSk7XG4gICAgbGV0IGlzVmFsaWRGaWxlU2l6ZTogYm9vbGVhbjtcbiAgICBsZXQgaXNWYWxpZFRvdGFsRmlsZVNpemU6IGJvb2xlYW47XG4gICAgaWYgKCF0aGlzLmZpbGVNYXhTaXplIHx8ICh0aGlzLmZpbGVNYXhTaXplICYmIHJlcyA8IHRoaXMuZmlsZU1heFNpemUpKSB7XG4gICAgICBpc1ZhbGlkRmlsZVNpemUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbGlkYXRpb25FcnJvci5uZXh0KHtcbiAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgZXJyb3I6IEZpbGVWYWxpZGF0aW9uVHlwZXMuZmlsZU1heFNpemVcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKiogVmFsaWRhdGluZyBUb3RhbCBGaWxlcyBTaXplICovXG4gICAgY29uc3QgdG90YWxCaXRzID0gdGhpcy5maWxlc1xuICAgICAgLm1hcChmID0+IGYuZmlsZS5zaXplKVxuICAgICAgLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiBhY2MgKyBjdXJyLCAwKTtcbiAgICBpZiAoXG4gICAgICAhdGhpcy50b3RhbE1heFNpemUgfHxcbiAgICAgICh0aGlzLnRvdGFsTWF4U2l6ZSAmJlxuICAgICAgICB0aGlzLmJpdHNUb01iKHRvdGFsQml0cyArIGZpbGUuc2l6ZSkgPCB0aGlzLnRvdGFsTWF4U2l6ZSlcbiAgICApIHtcbiAgICAgIGlzVmFsaWRUb3RhbEZpbGVTaXplID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3IubmV4dCh7XG4gICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgIGVycm9yOiBGaWxlVmFsaWRhdGlvblR5cGVzLnRvdGFsTWF4U2l6ZVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiAhIWlzVmFsaWRGaWxlU2l6ZSAmJiBpc1ZhbGlkVG90YWxGaWxlU2l6ZTtcbiAgfVxuICBiaXRzVG9NYihzaXplKTogbnVtYmVyIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChzaXplKSAvIDEwNDg1NzY7XG4gIH1cbiAgLyoqIHdoZW4gY3JvcCBidXR0b24gc3VibWl0dGVkICovXG4gIG9uQ3JvcFN1Ym1pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmJsb2JGYWxsQmFjayh0aGlzLmNyb3BwZWRJbWFnZSk7XG4gIH1cbiAgLyoqIEFmdGVyIGNyb3Agc3VibWl0ICovXG4gIGJsb2JGYWxsQmFjayhibG9iOiBCbG9iKTogdm9pZCB7XG4gICAgaWYgKCFibG9iKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmlzVmFsaWRTaXplKDxGaWxlPmJsb2IsIGJsb2Iuc2l6ZSkpIHtcbiAgICAgIHRoaXMucHVzaEZpbGUoPEZpbGU+YmxvYiwgdGhpcy5jdXJyZW50Q3JvcHBlckZpbGUubmFtZSk7XG4gICAgfVxuICAgIHRoaXMuY2xvc2VDcm9wcGVyKHtcbiAgICAgIGZpbGU6IGJsb2IgYXMgRmlsZSxcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmN1cnJlbnRDcm9wcGVyRmlsZS5uYW1lXG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGVJdGVtOiBGaWxlUHJldmlld01vZGVsKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcikge1xuICAgICAgdGhpcy5hZGFwdGVyLnJlbW92ZUZpbGUoZmlsZUl0ZW0pLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICB0aGlzLm9uUmVtb3ZlU3VjY2VzcyhmaWxlSXRlbSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKCdubyBhZGFwdGVyIHdhcyBwcm92aWRlZCcpO1xuICAgIH1cbiAgfVxuICAvKiogRW1pdHMgZXZlbnQgd2hlbiBmaWxlIHJlbW92ZSBhcGkgcmV0dXJucyBzdWNjZXNzICAqL1xuICBvblJlbW92ZVN1Y2Nlc3MoZmlsZUl0ZW06IEZpbGVQcmV2aWV3TW9kZWwpOiB2b2lkIHtcbiAgICB0aGlzLnJlbW92ZVN1Y2Nlc3MubmV4dChmaWxlSXRlbSk7XG4gICAgdGhpcy5yZW1vdmVGaWxlRnJvbUxpc3QoZmlsZUl0ZW0pO1xuICB9XG5cbiAgaW1hZ2VDcm9wcGVkKGV2ZW50OiBJbWFnZUNyb3BwZWRFdmVudCkge1xuICAgIHRoaXMuY3JvcHBlZEltYWdlID0gYmFzZTY0VG9GaWxlKGV2ZW50LmJhc2U2NCk7XG4gIH1cblxuICBpbWFnZUxvYWRlZCgpIHtcbiAgICB0aGlzLmNyb3BwZXJJc1JlYWR5ID0gdHJ1ZTtcbiAgfVxuXG4gIGxvYWRJbWFnZUZhaWxlZCgpIHtcbiAgICBjb25zb2xlLmxvZygnTG9hZCBJbWFnZSBGYWlsZWQnKTtcbiAgICB0aGlzLmNsb3NlQ3JvcHBlcih7XG4gICAgICBmaWxlOiB0aGlzLmN1cnJlbnRDcm9wcGVyRmlsZSxcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmN1cnJlbnRDcm9wcGVyRmlsZS5uYW1lXG4gICAgfSk7XG4gICAgaWYgKHRoaXMuY3JvcHBlck9wdGlvbnMubG9hZEltYWdlRmFpbGVkIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHRoaXMuY3JvcHBlck9wdGlvbnMubG9hZEltYWdlRmFpbGVkKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVGaWxlc0lmRHJvcHBpbmdQcm9jZXNzSXNGaW5pc2hlZCgpIHtcbiAgICB0aGlzLmRyb3BwaW5nUHJvY2Vzcy5kaW1pbmlzaENvdW50ZXIoKTtcbiAgICBpZiAodGhpcy5kcm9wcGluZ1Byb2Nlc3MuaXNQcm9jZXNzaW5nRmluaXNoZWQoKSkge1xuICAgICAgdGhpcy5oYW5kbGVGaWxlcyh0aGlzLmRyb3BwaW5nUHJvY2Vzcy5nZXRGaWxlcygpKS5zdWJzY3JpYmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuaGFuZGxlRmlsZXNJZkRyb3BwaW5nUHJvY2Vzc0lzRmluaXNoZWQoKTtcbiAgICAgIH0sIHRoaXMuZHJvcHBpbmdQcm9jZXNzLmNoZWNrVGltZUludGVydmFsTVMpO1xuICAgIH1cbiAgfVxufVxuIl19