/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FilePickerService } from './file-picker.service';
import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { getFileType } from './file-upload.utils';
import { FileValidationTypes } from './validation-error.model';
import { FilePickerAdapter } from './file-picker.adapter';
import { combineLatest, of, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { DefaultCaptions } from './default-captions';
export class FilePickerComponent {
    /**
     * @param {?} fileService
     * @param {?} elementRef
     */
    constructor(fileService, elementRef) {
        this.fileService = fileService;
        this.elementRef = elementRef;
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
            .pipe(takeUntil(this._onDestroy$))
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
            // console.log(nextFile)
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
        if (!this.cropperOptions) {
            this.setDefaultCropperOptions();
        }
    }
    /**
     * Sets manual cropper options if no custom options are avaiable
     * @return {?}
     */
    setDefaultCropperOptions() {
        this.cropperOptions = {
            dragMode: 'crop',
            aspectRatio: 1,
            autoCrop: true,
            movable: true,
            zoomable: true,
            scalable: true,
            autoCropArea: 0.8
        };
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
        /** @type {?} */
        const files = event.files;
        /** @type {?} */
        const filesForUpload = [];
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
                    filesForUpload.push(file);
                }));
            }
            else {
                // It was a directory (empty directories are added, otherwise only files)
                /** @type {?} */
                const fileEntry = (/** @type {?} */ (droppedFile.fileEntry));
                // console.log(droppedFile.relativePath, fileEntry);
            }
        }
        setTimeout((/**
         * @return {?}
         */
        () => this.handleFiles(filesForUpload).subscribe()));
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
        if (((/** @type {?} */ (window))).UPLOADER_TEST_MODE || typeof Cropper !== 'undefined') {
            this.safeCropImgUrl = this.fileService.createSafeUrl(file);
            this.currentCropperFile = file;
        }
        else {
            console.warn("please import cropperjs script and styles to use cropper feature or disable it by setting [enableCropper]='false'");
            return;
        }
    }
    /**
     * @param {?} file
     * @return {?}
     */
    getSafeUrl(file) {
        return this.fileService.createSafeUrl(file);
    }
    /**
     * On img load event
     * @param {?} e
     * @return {?}
     */
    cropperImgLoaded(e) {
        /** @type {?} */
        const image = document.getElementById('cropper-img');
        this.cropper = new Cropper(image, this.cropperOptions);
    }
    /**
     * Close or cancel cropper
     * @param {?} filePreview
     * @return {?}
     */
    closeCropper(filePreview) {
        this.currentCropperFile = undefined;
        this.cropper = undefined;
        setTimeout((/**
         * @return {?}
         */
        () => this.cropClosed$.next(filePreview)), 200);
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
     * Emits event when file upload api returns success
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
        /** @type {?} */
        const canvas = this.cropper.getCroppedCanvas();
        if (canvas != null) {
            this.cropper.getCroppedCanvas().toBlob(this.blobFallBack.bind(this), 'image/jpeg');
        }
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
}
FilePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-file-picker',
                template: "<div\n(click)=\"fileInput.click()\"\nclass=\"file-drop-wrapper\"\n*ngIf=\"showeDragDropZone\"\n>\n<file-drop\n  (onFileDrop)=\"dropped($event)\"\n  [customstyle]=\"'custom-drag'\"\n  [captions]=\"_captions\"\n>\n  <ng-content select=\".dropzoneTemplate\"> </ng-content>\n</file-drop>\n</div>\n\n<input\ntype=\"file\"\nname=\"file[]\"\nid=\"fileInput\"\n#fileInput\n[multiple]=\"uploadType === 'multi' ? 'multiple' : ''\"\n(click)=\"fileInput.value = null\"\n(change)=\"onChange(fileInput)\"\n[accept]=\"accept\"\nclass=\"file-input\"\n/>\n\n<div class=\"cropperJsOverlay\" *ngIf=\"currentCropperFile\">\n<div class=\"cropperJsBox\">\n  <img\n    [src]=\"safeCropImgUrl\"\n    id=\"cropper-img\"\n    (load)=\"cropperImgLoaded($event)\"\n  />\n  <div class=\"cropper-actions\">\n    <button class=\"cropSubmit\" (click)=\"onCropSubmit()\">\n      {{ _captions?.cropper?.crop }}\n    </button>\n    <button\n      class=\"cropCancel\"\n      (click)=\"\n        closeCropper({\n          file: currentCropperFile,\n          fileName: currentCropperFile.name\n        })\n      \"\n    >\n      {{ _captions?.cropper?.cancel }}\n    </button>\n  </div>\n</div>\n</div>\n<div\nclass=\"files-preview-wrapper\"\n[ngClass]=\"{ 'visually-hidden': !showPreviewContainer }\"\n>\n<file-preview-container\n  *ngIf=\"files\"\n  [previewFiles]=\"files\"\n  (removeFile)=\"removeFile($event)\"\n  (uploadSuccess)=\"onUploadSuccess($event)\"\n  [adapter]=\"adapter\"\n  [itemTemplate]=\"itemTemplate\"\n  [captions]=\"_captions\"\n>\n</file-preview-container>\n</div>\n",
                styles: ["*{box-sizing:border-box}:host{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:center;align-items:center;width:100%;height:100%;overflow:auto;max-width:440px;border-radius:6px}.files-preview-wrapper{width:100%}#cropper-img{max-width:60vw}#cropper-img img{width:100%;height:100%}.file-drop-wrapper{width:100%;background:#fafbfd;padding-top:20px}.preview-container{display:-webkit-box;display:flex}.cropperJsOverlay{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;position:fixed;z-index:999;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,.32)}.cropperJsBox{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;max-height:calc(100vh - 38px - 50px);max-width:90vw}.cropperJsBox .cropper-actions{display:-webkit-box;display:flex}.cropperJsBox .cropper-actions button{margin:5px;padding:12px 25px;border-radius:6px;border:0;cursor:pointer}.cropperJsBox .cropper-actions .cropSubmit{color:#fff;background:#16a085}::ng-deep.cropper img{max-height:300px!important}#images{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;width:500px;overflow-x:auto}#images .image{-webkit-box-flex:0;flex:0 0 100px;margin:0 2px;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:end;align-items:flex-end}#fileInput{display:none}.uploader-submit-btn{background:#ffd740;color:rgba(0,0,0,.87);border:0;padding:0 16px;line-height:36px;font-size:15px;margin-top:12px;border-radius:4px;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);cursor:pointer}button:disabled{color:rgba(0,0,0,.26);background:#dcdcdc}.visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}"]
            }] }
];
/** @nocollapse */
FilePickerComponent.ctorParameters = () => [
    { type: FilePickerService },
    { type: ElementRef }
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
    FilePickerComponent.prototype.safeCropImgUrl;
    /**
     * @type {?}
     * @private
     */
    FilePickerComponent.prototype.fileService;
    /**
     * @type {?}
     * @private
     */
    FilePickerComponent.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF3ZXNvbWUtdXBsb2FkZXIvIiwic291cmNlcyI6WyJsaWIvZmlsZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxtQkFBbUIsRUFBbUIsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQU0xRCxPQUFPLEVBQUUsYUFBYSxFQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBVXJELE1BQU0sT0FBTyxtQkFBbUI7Ozs7O0lBMkQ5QixZQUNVLFdBQThCLEVBQzlCLFVBQXNCO1FBRHRCLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUM5QixlQUFVLEdBQVYsVUFBVSxDQUFZOzs7O1FBM0R0QixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFvQixDQUFDOzs7O1FBRXJELGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQzs7OztRQUVuRCxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFvQixDQUFDOzs7O1FBRXJELG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7Ozs7UUFFdEQsY0FBUyxHQUFHLElBQUksWUFBWSxF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RTlCLDBDQUFzQzs7Ozs7SUFDdEMseUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmlsZVBpY2tlclNlcnZpY2UgfSBmcm9tICcuL2ZpbGUtcGlja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNhZmVSZXNvdXJjZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgRmlsZVByZXZpZXdNb2RlbCB9IGZyb20gJy4vZmlsZS1wcmV2aWV3Lm1vZGVsJztcbmltcG9ydCB7IGdldEZpbGVUeXBlIH0gZnJvbSAnLi9maWxlLXVwbG9hZC51dGlscyc7XG5pbXBvcnQgeyBGaWxlVmFsaWRhdGlvblR5cGVzLCBWYWxpZGF0aW9uRXJyb3IgfSBmcm9tICcuL3ZhbGlkYXRpb24tZXJyb3IubW9kZWwnO1xuaW1wb3J0IHsgRmlsZVBpY2tlckFkYXB0ZXIgfSBmcm9tICcuL2ZpbGUtcGlja2VyLmFkYXB0ZXInO1xuaW1wb3J0IHtcbiAgRmlsZVN5c3RlbURpcmVjdG9yeUVudHJ5LFxuICBGaWxlU3lzdGVtRmlsZUVudHJ5LFxuICBVcGxvYWRFdmVudFxufSBmcm9tICcuL2ZpbGUtZHJvcCc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB0YWtlVW50aWwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERlZmF1bHRDYXB0aW9ucyB9IGZyb20gJy4vZGVmYXVsdC1jYXB0aW9ucyc7XG5pbXBvcnQgeyBVcGxvYWRlckNhcHRpb25zIH0gZnJvbSAnLi91cGxvYWRlci1jYXB0aW9ucyc7XG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuZGVjbGFyZSB2YXIgQ3JvcHBlcjtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1maWxlLXBpY2tlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWxlLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZpbGUtcGlja2VyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRmlsZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqIEVtaXR0ZWQgd2hlbiBmaWxlIHVwbG9hZCB2aWEgYXBpIHN1Y2Nlc3NmdWxseS4gRW1pdHRlZCBmb3IgZXZlcnkgZmlsZSAqL1xuICBAT3V0cHV0KCkgdXBsb2FkU3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVByZXZpZXdNb2RlbD4oKTtcbiAgLyoqIEVtaXR0ZWQgd2hlbiBmaWxlIHVwbG9hZCB2aWEgYXBpIGZhaWxlZC4gRW1pdHRlZCBmb3IgZXZlcnkgZmlsZSAqL1xuICBAT3V0cHV0KCkgdXBsb2FkRmFpbCA9IG5ldyBFdmVudEVtaXR0ZXI8SHR0cEVycm9yUmVzcG9uc2U+KCk7XG4gIC8qKiBFbWl0dGVkIHdoZW4gZmlsZSBpcyByZW1vdmVkIHZpYSBhcGkgc3VjY2Vzc2Z1bGx5LiBFbWl0dGVkIGZvciBldmVyeSBmaWxlICovXG4gIEBPdXRwdXQoKSByZW1vdmVTdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlUHJldmlld01vZGVsPigpO1xuICAvKiogRW1pdHRlZCBvbiBmaWxlIHZhbGlkYXRpb24gZmFpbCAqL1xuICBAT3V0cHV0KCkgdmFsaWRhdGlvbkVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxWYWxpZGF0aW9uRXJyb3I+KCk7XG4gIC8qKiBFbWl0dGVkIHdoZW4gZmlsZSBpcyBhZGRlZCBhbmQgcGFzc2VkIHZhbGlkYXRpb25zLiBOb3QgdXBsb2FkZWQgeWV0ICovXG4gIEBPdXRwdXQoKSBmaWxlQWRkZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVQcmV2aWV3TW9kZWw+KCk7XG4gIC8qKiBDdXN0b20gdmFsaWRhdG9yIGZ1bmN0aW9uICovXG4gIEBJbnB1dCgpIGN1c3RvbVZhbGlkYXRvcjogKGZpbGU6IEZpbGUpID0+IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIC8qKiBXaGV0aGVyIHRvIGVuYWJsZSBjcm9wcGVyLiBEZWZhdWx0OiBkaXNhYmxlZCAqL1xuICBASW5wdXQoKVxuICBlbmFibGVDcm9wcGVyID0gZmFsc2U7XG4gIC8qKiBXaGV0aGVyIHRvIHNob3cgZGVmYXVsdCBkcmFnIGFuZCBkcm9wIHpvbmUuIERlZmF1bHQ6dHJ1ZSAqL1xuICBASW5wdXQoKSBzaG93ZURyYWdEcm9wWm9uZSA9IHRydWU7XG4gIC8qKiBXaGV0aGVyIHRvIHNob3cgZGVmYXVsdCBmaWxlcyBwcmV2aWV3IGNvbnRhaW5lci4gRGVmYXVsdDogdHJ1ZSAqL1xuICBASW5wdXQoKSBzaG93UHJldmlld0NvbnRhaW5lciA9IHRydWU7XG4gIC8qKiBQcmV2aWV3IEl0ZW0gdGVtcGxhdGUgKi9cbiAgQElucHV0KCkgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAvKiogU2luZ2xlIG9yIG11bHRpcGxlLiBEZWZhdWx0OiBtdWx0aSAqL1xuICBASW5wdXQoKVxuICB1cGxvYWRUeXBlID0gJ211bHRpJztcbiAgLyoqIE1heCBzaXplIG9mIHNlbGVjdGVkIGZpbGUgaW4gTUIuIERlZmF1bHQ6IG5vIGxpbWl0ICovXG4gIEBJbnB1dCgpXG4gIGZpbGVNYXhTaXplOiBudW1iZXI7XG4gIC8qKiBNYXggY291bnQgb2YgZmlsZSBpbiBtdWx0aS11cGxvYWQuIERlZmF1bHQ6IG5vIGxpbWl0ICovXG4gIEBJbnB1dCgpXG4gIGZpbGVNYXhDb3VudDogbnVtYmVyO1xuICAvKiogVG90YWwgTWF4IHNpemUgbGltaXQgb2YgYWxsIGZpbGVzIGluIE1CLiBEZWZhdWx0OiBubyBsaW1pdCAqL1xuICBASW5wdXQoKVxuICB0b3RhbE1heFNpemU6IG51bWJlcjtcbiAgLyoqIFdoaWNoIGZpbGUgdHlwZXMgdG8gc2hvdyBvbiBjaG9vc2UgZmlsZSBkaWFsb2cuIERlZmF1bHQ6IHNob3cgYWxsICovXG4gIEBJbnB1dCgpXG4gIGFjY2VwdDogc3RyaW5nO1xuICBmaWxlczogRmlsZVByZXZpZXdNb2RlbFtdID0gW107XG4gIC8qKiBGaWxlIGV4dGVuc2lvbnMgZmlsdGVyICovXG4gIEBJbnB1dCgpIGZpbGVFeHRlbnNpb25zOiBTdHJpbmdbXTtcbiAgY3JvcHBlcjogYW55O1xuICAvKiogQ3JvcHBlciBvcHRpb25zLiAqL1xuICBASW5wdXQoKSBjcm9wcGVyT3B0aW9uczogT2JqZWN0O1xuICAvKiogRmlsZXMgYXJyYXkgZm9yIGNyb3BwZXIuIFdpbGwgYmUgc2hvd24gZXF1ZW50aWFsbHkgaWYgY3JvcCBlbmFibGVkICovXG4gIGZpbGVzRm9yQ3JvcHBlcjogRmlsZVtdID0gW107XG4gIC8qKiBDdXJyZW50IGZpbGUgdG8gYmUgc2hvd24gaW4gY3JvcHBlciovXG4gIGN1cnJlbnRDcm9wcGVyRmlsZTogRmlsZTtcbiAgLyoqIEN1c3RvbSBhcGkgQWRhcHRlciBmb3IgdXBsb2FkaW5nL3JlbW92aW5nIGZpbGVzICovXG4gIEBJbnB1dCgpXG4gIGFkYXB0ZXI6IEZpbGVQaWNrZXJBZGFwdGVyO1xuICAvKiogIEN1c3RvbWUgdGVtcGxhdGUgZm9yIGRyb3B6b25lICovXG4gIEBJbnB1dCgpIGRyb3B6b25lVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIC8qKiBDdXN0b20gY2FwdGlvbnMgaW5wdXQuIFVzZWQgZm9yIG11bHRpIGxhbmd1YWdlIHN1cHBvcnQgKi9cbiAgQElucHV0KCkgY2FwdGlvbnM6IFVwbG9hZGVyQ2FwdGlvbnM7XG4gIC8qKiBjYXB0aW9ucyBvYmplY3QqL1xuICBfY2FwdGlvbnM6IFVwbG9hZGVyQ2FwdGlvbnM7XG4gIGNyb3BDbG9zZWQkID0gbmV3IFN1YmplY3Q8RmlsZVByZXZpZXdNb2RlbD4oKTtcbiAgX29uRGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBzYWZlQ3JvcEltZ1VybDogU2FmZVJlc291cmNlVXJsO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZpbGVTZXJ2aWNlOiBGaWxlUGlja2VyU2VydmljZSxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWZcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2V0Q3JvcHBlck9wdGlvbnMoKTtcbiAgICB0aGlzLmxpc3RlblRvQ3JvcENsb3NlKCk7XG4gICAgdGhpcy5zZXRDYXB0aW9ucygpO1xuICB9XG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX29uRGVzdHJveSQubmV4dCgpO1xuICB9XG4gIHNldENhcHRpb25zKCkge1xuICAgIHRoaXMuX2NhcHRpb25zID0gdGhpcy5jYXB0aW9ucyB8fCBEZWZhdWx0Q2FwdGlvbnM7XG4gIH1cbiAgLyoqIExpc3RlbiB3aGVuIENyb3BwZXIgaXMgY2xvc2VkIGFuZCBvcGVuIG5ldyBjcm9wcGVyIGlmIG5leHQgaW1hZ2UgZXhpc3RzICovXG4gIGxpc3RlblRvQ3JvcENsb3NlKCkge1xuICAgIHRoaXMuY3JvcENsb3NlZCRcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKHJlczogRmlsZVByZXZpZXdNb2RlbCkgPT4ge1xuICAgICAgICBjb25zdCBjcm9wcGVkSW5kZXggPSB0aGlzLmZpbGVzRm9yQ3JvcHBlci5maW5kSW5kZXgoXG4gICAgICAgICAgaXRlbSA9PiBpdGVtLm5hbWUgPT09IHJlcy5maWxlTmFtZVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBuZXh0RmlsZSA9XG4gICAgICAgICAgY3JvcHBlZEluZGV4ICE9PSAtMVxuICAgICAgICAgICAgPyB0aGlzLmZpbGVzRm9yQ3JvcHBlcltjcm9wcGVkSW5kZXggKyAxXVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG5leHRGaWxlKVxuICAgICAgICAvLyAgY29uc29sZS5sb2coJ2Nyb3BwZWQnLCByZXMpO1xuICAgICAgICB0aGlzLmZpbGVzRm9yQ3JvcHBlciA9IFsuLi50aGlzLmZpbGVzRm9yQ3JvcHBlcl0uZmlsdGVyKFxuICAgICAgICAgIGl0ZW0gPT4gaXRlbS5uYW1lICE9PSByZXMuZmlsZU5hbWVcbiAgICAgICAgKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5maWxlc0ZvckNyb3BwZXIpO1xuICAgICAgICBpZiAobmV4dEZpbGUpIHtcbiAgICAgICAgICB0aGlzLm9wZW5Dcm9wcGVyKG5leHRGaWxlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cbiAgLyoqIFNldHMgY3VzdG9tIGNyb3BwZXIgb3B0aW9ucyBpZiBhdmFpYWJsZSAqL1xuICBzZXRDcm9wcGVyT3B0aW9ucygpIHtcbiAgICBpZiAoIXRoaXMuY3JvcHBlck9wdGlvbnMpIHtcbiAgICAgIHRoaXMuc2V0RGVmYXVsdENyb3BwZXJPcHRpb25zKCk7XG4gICAgfVxuICB9XG4gIC8qKiBTZXRzIG1hbnVhbCBjcm9wcGVyIG9wdGlvbnMgaWYgbm8gY3VzdG9tIG9wdGlvbnMgYXJlIGF2YWlhYmxlICovXG4gIHNldERlZmF1bHRDcm9wcGVyT3B0aW9ucygpIHtcbiAgICB0aGlzLmNyb3BwZXJPcHRpb25zID0ge1xuICAgICAgZHJhZ01vZGU6ICdjcm9wJyxcbiAgICAgIGFzcGVjdFJhdGlvOiAxLFxuICAgICAgYXV0b0Nyb3A6IHRydWUsXG4gICAgICBtb3ZhYmxlOiB0cnVlLFxuICAgICAgem9vbWFibGU6IHRydWUsXG4gICAgICBzY2FsYWJsZTogdHJ1ZSxcbiAgICAgIGF1dG9Dcm9wQXJlYTogMC44XG4gICAgfTtcbiAgfVxuICAvKiogT24gaW5wdXQgZmlsZSBzZWxlY3RlZCAqL1xuICBvbkNoYW5nZShmaWxlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICBjb25zdCBmaWxlczogRmlsZVtdID0gQXJyYXkuZnJvbShmaWxlSW5wdXQuZmlsZXMpO1xuICAgIHRoaXMuaGFuZGxlRmlsZXMoZmlsZXMpLnN1YnNjcmliZSgpO1xuICB9XG4gIC8qKiBIYW5kbGVzIGlucHV0IGFuZCBkcmFnL2Ryb3AgZmlsZXMgKi9cbiAgaGFuZGxlRmlsZXMoZmlsZXM6IEZpbGVbXSk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkTWF4RmlsZUNvdW50KGZpbGVzKSkge1xuICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgIH1cbiAgICBjb25zdCBpc1ZhbGlkVXBsb2FkU3luYyA9IGZpbGVzLmV2ZXJ5KGl0ZW0gPT4gdGhpcy52YWxpZGF0ZUZpbGVTeW5jKGl0ZW0pKTtcbiAgICBjb25zdCBhc3luY0Z1bmN0aW9ucyA9IGZpbGVzLm1hcChpdGVtID0+IHRoaXMudmFsaWRhdGVGaWxlQXN5bmMoaXRlbSkpO1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KC4uLmFzeW5jRnVuY3Rpb25zKS5waXBlKFxuICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgIGNvbnN0IGlzVmFsaWRVcGxvYWRBc3luYyA9IHJlcy5ldmVyeShyZXN1bHQgPT4gcmVzdWx0ID09PSB0cnVlKTtcbiAgICAgICAgaWYgKCFpc1ZhbGlkVXBsb2FkU3luYyB8fCAhaXNWYWxpZFVwbG9hZEFzeW5jKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZpbGVzLmZvckVhY2goKGZpbGU6IEZpbGUsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZUlucHV0RmlsZShmaWxlLCBpbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG4gIC8qKiBWYWxpZGF0ZXMgc3luY2hyb25vdXMgdmFsaWRhdGlvbnMgKi9cbiAgdmFsaWRhdGVGaWxlU3luYyhmaWxlOiBGaWxlKTogYm9vbGVhbiB7XG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGhpcy5pc1ZhbGlkVXBsb2FkVHlwZShmaWxlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNWYWxpZEV4dGVuc2lvbihmaWxlLCBmaWxlLm5hbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIC8qKiBWYWxpZGF0ZXMgYXN5bmNocm9ub3VzIHZhbGlkYXRpb25zICovXG4gIHZhbGlkYXRlRmlsZUFzeW5jKGZpbGU6IEZpbGUpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBpZiAoIXRoaXMuY3VzdG9tVmFsaWRhdG9yKSB7XG4gICAgICByZXR1cm4gb2YodHJ1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmN1c3RvbVZhbGlkYXRvcihmaWxlKS5waXBlKFxuICAgICAgdGFwKHJlcyA9PiB7XG4gICAgICAgIGlmICghcmVzKSB7XG4gICAgICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3IubmV4dCh7XG4gICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgZXJyb3I6IEZpbGVWYWxpZGF0aW9uVHlwZXMuY3VzdG9tVmFsaWRhdG9yXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICAvKiogSGFuZGxlcyBpbnB1dCBhbmQgZHJhZyZkcm9wIGZpbGVzICovXG4gIGhhbmRsZUlucHV0RmlsZShmaWxlOiBGaWxlLCBpbmRleCk6IHZvaWQge1xuICAgIGNvbnN0IHR5cGUgPSBnZXRGaWxlVHlwZShmaWxlLnR5cGUpO1xuICAgIGlmICh0eXBlID09PSAnaW1hZ2UnICYmIHRoaXMuZW5hYmxlQ3JvcHBlcikge1xuICAgICAgdGhpcy5maWxlc0ZvckNyb3BwZXIucHVzaChmaWxlKTtcbiAgICAgIGlmICghdGhpcy5jdXJyZW50Q3JvcHBlckZpbGUpIHtcbiAgICAgICAgdGhpcy5vcGVuQ3JvcHBlcihmaWxlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLyoqIFNpemUgaXMgbm90IGluaXRpYWxseSBjaGVja2VkIG9uIGhhbmRsZUlucHV0RmlsZXMgYmVjYXVzZSBvZiBjcm9wcGVyIHNpemUgY2hhbmdlICovXG4gICAgICBpZiAodGhpcy5pc1ZhbGlkU2l6ZShmaWxlLCBmaWxlLnNpemUpKSB7XG4gICAgICAgIHRoaXMucHVzaEZpbGUoZmlsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKiBWYWxpZGF0ZXMgaWYgdXBsb2FkIHR5cGUgaXMgc2luZ2xlIHNvIGFub3RoZXIgZmlsZSBjYW5ub3QgYmUgYWRkZWQgKi9cbiAgaXNWYWxpZFVwbG9hZFR5cGUoZmlsZSk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnVwbG9hZFR5cGUgPT09ICdzaW5nbGUnICYmIHRoaXMuZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3IubmV4dCh7XG4gICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgIGVycm9yOiBGaWxlVmFsaWRhdGlvblR5cGVzLnVwbG9hZFR5cGVcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgLyoqIFZhbGlkYXRlcyBtYXggZmlsZSBjb3VudCAqL1xuICBpc1ZhbGlkTWF4RmlsZUNvdW50KGZpbGVzOiBGaWxlW10pOiBib29sZWFuIHtcbiAgICBpZiAoXG4gICAgICAhdGhpcy5maWxlTWF4Q291bnQgfHxcbiAgICAgIHRoaXMuZmlsZU1heENvdW50ID49IHRoaXMuZmlsZXMubGVuZ3RoICsgZmlsZXMubGVuZ3RoXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3IubmV4dCh7XG4gICAgICAgIGZpbGU6IG51bGwsXG4gICAgICAgIGVycm9yOiBGaWxlVmFsaWRhdGlvblR5cGVzLmZpbGVNYXhDb3VudFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8qKiBPbiBmaWxlIGRyb3BwZWQgKi9cbiAgZHJvcHBlZChldmVudDogVXBsb2FkRXZlbnQpIHtcbiAgICBjb25zdCBmaWxlcyA9IGV2ZW50LmZpbGVzO1xuICAgIGNvbnN0IGZpbGVzRm9yVXBsb2FkOiBGaWxlW10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGRyb3BwZWRGaWxlIG9mIGV2ZW50LmZpbGVzKSB7XG4gICAgICAvLyBJcyBpdCBhIGZpbGU/XG4gICAgICBpZiAoZHJvcHBlZEZpbGUuZmlsZUVudHJ5LmlzRmlsZSkge1xuICAgICAgICBjb25zdCBmaWxlRW50cnkgPSBkcm9wcGVkRmlsZS5maWxlRW50cnkgYXMgRmlsZVN5c3RlbUZpbGVFbnRyeTtcbiAgICAgICAgZmlsZUVudHJ5LmZpbGUoKGZpbGU6IEZpbGUpID0+IHtcbiAgICAgICAgICBmaWxlc0ZvclVwbG9hZC5wdXNoKGZpbGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEl0IHdhcyBhIGRpcmVjdG9yeSAoZW1wdHkgZGlyZWN0b3JpZXMgYXJlIGFkZGVkLCBvdGhlcndpc2Ugb25seSBmaWxlcylcbiAgICAgICAgY29uc3QgZmlsZUVudHJ5ID0gZHJvcHBlZEZpbGUuZmlsZUVudHJ5IGFzIEZpbGVTeXN0ZW1EaXJlY3RvcnlFbnRyeTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZHJvcHBlZEZpbGUucmVsYXRpdmVQYXRoLCBmaWxlRW50cnkpO1xuICAgICAgfVxuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGFuZGxlRmlsZXMoZmlsZXNGb3JVcGxvYWQpLnN1YnNjcmliZSgpKTtcbiAgfVxuICAvKiogQWRkIGZpbGUgdG8gZmlsZSBsaXN0IGFmdGVyIHN1Y2Nlc2Z1bGwgdmFsaWRhdGlvbiAqL1xuICBwdXNoRmlsZShmaWxlOiBGaWxlLCBmaWxlTmFtZSA9IGZpbGUubmFtZSk6IHZvaWQge1xuICAgIHRoaXMuZmlsZXMucHVzaCh7IGZpbGU6IGZpbGUsIGZpbGVOYW1lOiBmaWxlTmFtZSB9KTtcbiAgICB0aGlzLmZpbGVBZGRlZC5uZXh0KHsgZmlsZTogZmlsZSwgZmlsZU5hbWU6IGZpbGVOYW1lIH0pO1xuICB9XG4gIC8qKiBPcGVucyBjcm9wcGVyIGZvciBpbWFnZSBjcm9wICovXG4gIG9wZW5Dcm9wcGVyKGZpbGU6IEZpbGUpOiB2b2lkIHtcbiAgICBpZiAoKDxhbnk+d2luZG93KS5VUExPQURFUl9URVNUX01PREUgfHwgdHlwZW9mIENyb3BwZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLnNhZmVDcm9wSW1nVXJsID0gdGhpcy5maWxlU2VydmljZS5jcmVhdGVTYWZlVXJsKGZpbGUpO1xuICAgICAgdGhpcy5jdXJyZW50Q3JvcHBlckZpbGUgPSBmaWxlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIFwicGxlYXNlIGltcG9ydCBjcm9wcGVyanMgc2NyaXB0IGFuZCBzdHlsZXMgdG8gdXNlIGNyb3BwZXIgZmVhdHVyZSBvciBkaXNhYmxlIGl0IGJ5IHNldHRpbmcgW2VuYWJsZUNyb3BwZXJdPSdmYWxzZSdcIlxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgZ2V0U2FmZVVybChmaWxlOiBGaWxlKTogU2FmZVJlc291cmNlVXJsIHtcbiAgICByZXR1cm4gdGhpcy5maWxlU2VydmljZS5jcmVhdGVTYWZlVXJsKGZpbGUpO1xuICB9XG4gIC8qKiBPbiBpbWcgbG9hZCBldmVudCAqL1xuICBjcm9wcGVySW1nTG9hZGVkKGUpOiB2b2lkIHtcbiAgICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcm9wcGVyLWltZycpO1xuICAgIHRoaXMuY3JvcHBlciA9IG5ldyBDcm9wcGVyKGltYWdlLCB0aGlzLmNyb3BwZXJPcHRpb25zKTtcbiAgfVxuICAvKiogQ2xvc2Ugb3IgY2FuY2VsIGNyb3BwZXIgKi9cbiAgY2xvc2VDcm9wcGVyKGZpbGVQcmV2aWV3OiBGaWxlUHJldmlld01vZGVsKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50Q3JvcHBlckZpbGUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5jcm9wcGVyID0gdW5kZWZpbmVkO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jcm9wQ2xvc2VkJC5uZXh0KGZpbGVQcmV2aWV3KSwgMjAwKTtcbiAgfVxuICAvKiogUmVtb3ZlcyBmaWxlcyBmcm9tIGZpbGVzIGxpc3QgKi9cbiAgcmVtb3ZlRmlsZUZyb21MaXN0KGZpbGU6IEZpbGVQcmV2aWV3TW9kZWwpOiB2b2lkIHtcbiAgICB0aGlzLmZpbGVzID0gdGhpcy5maWxlcy5maWx0ZXIoZiA9PiBmICE9PSBmaWxlKTtcbiAgfVxuXG4gIC8qKiBFbWl0cyBldmVudCB3aGVuIGZpbGUgdXBsb2FkIGFwaSByZXR1cm5zIHN1Y2Nlc3MgICovXG4gIG9uVXBsb2FkU3VjY2VzcyhmaWxlSXRlbTogRmlsZVByZXZpZXdNb2RlbCk6IHZvaWQge1xuICAgIHRoaXMudXBsb2FkU3VjY2Vzcy5uZXh0KGZpbGVJdGVtKTtcbiAgfVxuXG4gIC8qKiBFbWl0cyBldmVudCB3aGVuIGZpbGUgdXBsb2FkIGFwaSByZXR1cm5zIHN1Y2Nlc3MgICovXG4gIG9uVXBsb2FkRmFpbChlcjogSHR0cEVycm9yUmVzcG9uc2UpOiB2b2lkIHtcbiAgICB0aGlzLnVwbG9hZEZhaWwubmV4dChlcik7XG4gIH1cblxuICAvKiogVmFsaWRhdGVzIGZpbGUgZXh0ZW5zaW9uICovXG4gIGlzVmFsaWRFeHRlbnNpb24oZmlsZTogRmlsZSwgZmlsZU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgaWYgKCF0aGlzLmZpbGVFeHRlbnNpb25zKSB7cmV0dXJuIHRydWU7IH1cbiAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IGZpbGVOYW1lLnNwbGl0KCcuJykucG9wKCk7XG4gICAgICBjb25zdCBmaWxlRXh0ZW5zaW9ucyA9IHRoaXMuZmlsZUV4dGVuc2lvbnMubWFwKGV4dCA9PiBleHQudG9Mb3dlckNhc2UoKSk7XG4gICAgICBpZiAoZmlsZUV4dGVuc2lvbnMuaW5kZXhPZihleHRlbnNpb24udG9Mb3dlckNhc2UoKSkgPT09IC0xKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yLm5leHQoe2ZpbGU6IGZpbGUsIGVycm9yOiBGaWxlVmFsaWRhdGlvblR5cGVzLmV4dGVuc2lvbnN9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICB9XG4gIC8qKiBWYWxpZGF0ZXMgc2VsZWN0ZWQgZmlsZSBzaXplIGFuZCB0b3RhbCBmaWxlIHNpemUgKi9cbiAgaXNWYWxpZFNpemUoZmlsZTogRmlsZSwgc2l6ZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgLyoqIFZhbGlkYXRpbmcgc2VsZWN0ZWQgZmlsZSBzaXplICovXG4gICAgY29uc3QgcmVzOiBudW1iZXIgPSB0aGlzLmJpdHNUb01iKHNpemUudG9TdHJpbmcoKSk7XG4gICAgbGV0IGlzVmFsaWRGaWxlU2l6ZTogYm9vbGVhbjtcbiAgICBsZXQgaXNWYWxpZFRvdGFsRmlsZVNpemU6IGJvb2xlYW47XG4gICAgaWYgKCF0aGlzLmZpbGVNYXhTaXplIHx8ICh0aGlzLmZpbGVNYXhTaXplICYmIHJlcyA8IHRoaXMuZmlsZU1heFNpemUpKSB7XG4gICAgICBpc1ZhbGlkRmlsZVNpemUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbGlkYXRpb25FcnJvci5uZXh0KHtcbiAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgZXJyb3I6IEZpbGVWYWxpZGF0aW9uVHlwZXMuZmlsZU1heFNpemVcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKiogVmFsaWRhdGluZyBUb3RhbCBGaWxlcyBTaXplICovXG4gICAgY29uc3QgdG90YWxCaXRzID0gdGhpcy5maWxlc1xuICAgICAgLm1hcChmID0+IGYuZmlsZS5zaXplKVxuICAgICAgLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiBhY2MgKyBjdXJyLCAwKTtcbiAgICBpZiAoXG4gICAgICAhdGhpcy50b3RhbE1heFNpemUgfHxcbiAgICAgICh0aGlzLnRvdGFsTWF4U2l6ZSAmJlxuICAgICAgICB0aGlzLmJpdHNUb01iKHRvdGFsQml0cyArIGZpbGUuc2l6ZSkgPCB0aGlzLnRvdGFsTWF4U2l6ZSlcbiAgICApIHtcbiAgICAgIGlzVmFsaWRUb3RhbEZpbGVTaXplID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3IubmV4dCh7XG4gICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgIGVycm9yOiBGaWxlVmFsaWRhdGlvblR5cGVzLnRvdGFsTWF4U2l6ZVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiAhIWlzVmFsaWRGaWxlU2l6ZSAmJiBpc1ZhbGlkVG90YWxGaWxlU2l6ZTtcbiAgfVxuICBiaXRzVG9NYihzaXplKTogbnVtYmVyIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChzaXplKSAvIDEwNDg1NzY7XG4gIH1cbiAgLyoqIHdoZW4gY3JvcCBidXR0b24gc3VibWl0dGVkICovXG4gIG9uQ3JvcFN1Ym1pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLmNyb3BwZXIuZ2V0Q3JvcHBlZENhbnZhcygpO1xuICAgIGlmIChjYW52YXMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5jcm9wcGVyLmdldENyb3BwZWRDYW52YXMoKS50b0Jsb2IodGhpcy5ibG9iRmFsbEJhY2suYmluZCh0aGlzKSwgJ2ltYWdlL2pwZWcnKTtcbiAgICB9XG4gIH1cbiAgLyoqIEFmdGVyIGNyb3Agc3VibWl0ICovXG4gIGJsb2JGYWxsQmFjayhibG9iOiBCbG9iKTogdm9pZCB7XG4gICAgaWYgKCFibG9iKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmlzVmFsaWRTaXplKDxGaWxlPmJsb2IsIGJsb2Iuc2l6ZSkpIHtcbiAgICAgIHRoaXMucHVzaEZpbGUoPEZpbGU+YmxvYiwgdGhpcy5jdXJyZW50Q3JvcHBlckZpbGUubmFtZSk7XG4gICAgfVxuICAgIHRoaXMuY2xvc2VDcm9wcGVyKHtcbiAgICAgIGZpbGU6IGJsb2IgYXMgRmlsZSxcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmN1cnJlbnRDcm9wcGVyRmlsZS5uYW1lXG4gICAgfSk7XG4gIH1cbiAgcmVtb3ZlRmlsZShmaWxlSXRlbTogRmlsZVByZXZpZXdNb2RlbCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFkYXB0ZXIpIHtcbiAgICAgIHRoaXMuYWRhcHRlci5yZW1vdmVGaWxlKGZpbGVJdGVtKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgdGhpcy5vblJlbW92ZVN1Y2Nlc3MoZmlsZUl0ZW0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2Fybignbm8gYWRhcHRlciB3YXMgcHJvdmlkZWQnKTtcbiAgICB9XG4gIH1cbiAgLyoqIEVtaXRzIGV2ZW50IHdoZW4gZmlsZSByZW1vdmUgYXBpIHJldHVybnMgc3VjY2VzcyAgKi9cbiAgb25SZW1vdmVTdWNjZXNzKGZpbGVJdGVtOiBGaWxlUHJldmlld01vZGVsKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmVTdWNjZXNzLm5leHQoZmlsZUl0ZW0pO1xuICAgIHRoaXMucmVtb3ZlRmlsZUZyb21MaXN0KGZpbGVJdGVtKTtcbiAgfVxufVxuIl19