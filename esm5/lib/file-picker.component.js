/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FilePickerService } from './file-picker.service';
import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { getFileType } from './file-upload.utils';
import { FileValidationTypes } from './validation-error.model';
import { FilePickerAdapter } from './file-picker.adapter';
import { combineLatest, of, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { DefaultCaptions } from './default-captions';
var FilePickerComponent = /** @class */ (function () {
    function FilePickerComponent(fileService, elementRef) {
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
    FilePickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.setCropperOptions();
        this.listenToCropClose();
        this.setCaptions();
    };
    /**
     * @return {?}
     */
    FilePickerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy$.next();
    };
    /**
     * @return {?}
     */
    FilePickerComponent.prototype.setCaptions = /**
     * @return {?}
     */
    function () {
        this._captions = this.captions || DefaultCaptions;
    };
    /** Listen when Cropper is closed and open new cropper if next image exists */
    /**
     * Listen when Cropper is closed and open new cropper if next image exists
     * @return {?}
     */
    FilePickerComponent.prototype.listenToCropClose = /**
     * Listen when Cropper is closed and open new cropper if next image exists
     * @return {?}
     */
    function () {
        var _this = this;
        this.cropClosed$
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            /** @type {?} */
            var croppedIndex = _this.filesForCropper.findIndex((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.name === res.fileName; }));
            /** @type {?} */
            var nextFile = croppedIndex !== -1
                ? _this.filesForCropper[croppedIndex + 1]
                : undefined;
            // console.log(nextFile)
            //  console.log('cropped', res);
            _this.filesForCropper = tslib_1.__spread(_this.filesForCropper).filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.name !== res.fileName; }));
            // console.log(this.filesForCropper);
            if (nextFile) {
                _this.openCropper(nextFile);
            }
        }));
    };
    /** Sets custom cropper options if avaiable */
    /**
     * Sets custom cropper options if avaiable
     * @return {?}
     */
    FilePickerComponent.prototype.setCropperOptions = /**
     * Sets custom cropper options if avaiable
     * @return {?}
     */
    function () {
        if (!this.cropperOptions) {
            this.setDefaultCropperOptions();
        }
    };
    /** Sets manual cropper options if no custom options are avaiable */
    /**
     * Sets manual cropper options if no custom options are avaiable
     * @return {?}
     */
    FilePickerComponent.prototype.setDefaultCropperOptions = /**
     * Sets manual cropper options if no custom options are avaiable
     * @return {?}
     */
    function () {
        this.cropperOptions = {
            dragMode: 'crop',
            aspectRatio: 1,
            autoCrop: true,
            movable: true,
            zoomable: true,
            scalable: true,
            autoCropArea: 0.8
        };
    };
    /** On input file selected */
    /**
     * On input file selected
     * @param {?} fileInput
     * @return {?}
     */
    FilePickerComponent.prototype.onChange = /**
     * On input file selected
     * @param {?} fileInput
     * @return {?}
     */
    function (fileInput) {
        /** @type {?} */
        var files = Array.from(fileInput.files);
        this.handleFiles(files).subscribe();
    };
    /** Handles input and drag/drop files */
    /**
     * Handles input and drag/drop files
     * @param {?} files
     * @return {?}
     */
    FilePickerComponent.prototype.handleFiles = /**
     * Handles input and drag/drop files
     * @param {?} files
     * @return {?}
     */
    function (files) {
        var _this = this;
        if (!this.isValidMaxFileCount(files)) {
            return of(null);
        }
        /** @type {?} */
        var isValidUploadSync = files.every((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this.validateFileSync(item); }));
        /** @type {?} */
        var asyncFunctions = files.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this.validateFileAsync(item); }));
        return combineLatest.apply(void 0, tslib_1.__spread(asyncFunctions)).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            /** @type {?} */
            var isValidUploadAsync = res.every((/**
             * @param {?} result
             * @return {?}
             */
            function (result) { return result === true; }));
            if (!isValidUploadSync || !isValidUploadAsync) {
                return;
            }
            files.forEach((/**
             * @param {?} file
             * @param {?} index
             * @return {?}
             */
            function (file, index) {
                _this.handleInputFile(file, index);
            }));
        })));
    };
    /** Validates synchronous validations */
    /**
     * Validates synchronous validations
     * @param {?} file
     * @return {?}
     */
    FilePickerComponent.prototype.validateFileSync = /**
     * Validates synchronous validations
     * @param {?} file
     * @return {?}
     */
    function (file) {
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
    };
    /** Validates asynchronous validations */
    /**
     * Validates asynchronous validations
     * @param {?} file
     * @return {?}
     */
    FilePickerComponent.prototype.validateFileAsync = /**
     * Validates asynchronous validations
     * @param {?} file
     * @return {?}
     */
    function (file) {
        var _this = this;
        if (!this.customValidator) {
            return of(true);
        }
        return this.customValidator(file).pipe(tap((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (!res) {
                _this.validationError.next({
                    file: file,
                    error: FileValidationTypes.customValidator
                });
            }
        })));
    };
    /** Handles input and drag&drop files */
    /**
     * Handles input and drag&drop files
     * @param {?} file
     * @param {?} index
     * @return {?}
     */
    FilePickerComponent.prototype.handleInputFile = /**
     * Handles input and drag&drop files
     * @param {?} file
     * @param {?} index
     * @return {?}
     */
    function (file, index) {
        /** @type {?} */
        var type = getFileType(file.type);
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
    };
    /** Validates if upload type is single so another file cannot be added */
    /**
     * Validates if upload type is single so another file cannot be added
     * @param {?} file
     * @return {?}
     */
    FilePickerComponent.prototype.isValidUploadType = /**
     * Validates if upload type is single so another file cannot be added
     * @param {?} file
     * @return {?}
     */
    function (file) {
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
    };
    /** Validates max file count */
    /**
     * Validates max file count
     * @param {?} files
     * @return {?}
     */
    FilePickerComponent.prototype.isValidMaxFileCount = /**
     * Validates max file count
     * @param {?} files
     * @return {?}
     */
    function (files) {
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
    };
    /** On file dropped */
    /**
     * On file dropped
     * @param {?} event
     * @return {?}
     */
    FilePickerComponent.prototype.dropped = /**
     * On file dropped
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        var e_1, _a;
        /** @type {?} */
        var files = event.files;
        /** @type {?} */
        var filesForUpload = [];
        try {
            for (var _b = tslib_1.__values(event.files), _c = _b.next(); !_c.done; _c = _b.next()) {
                var droppedFile = _c.value;
                // Is it a file?
                if (droppedFile.fileEntry.isFile) {
                    /** @type {?} */
                    var fileEntry = (/** @type {?} */ (droppedFile.fileEntry));
                    fileEntry.file((/**
                     * @param {?} file
                     * @return {?}
                     */
                    function (file) {
                        filesForUpload.push(file);
                    }));
                }
                else {
                    // It was a directory (empty directories are added, otherwise only files)
                    /** @type {?} */
                    var fileEntry = (/** @type {?} */ (droppedFile.fileEntry));
                    // console.log(droppedFile.relativePath, fileEntry);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        setTimeout((/**
         * @return {?}
         */
        function () { return _this.handleFiles(filesForUpload).subscribe(); }));
    };
    /** Add file to file list after succesfull validation */
    /**
     * Add file to file list after succesfull validation
     * @param {?} file
     * @param {?=} fileName
     * @return {?}
     */
    FilePickerComponent.prototype.pushFile = /**
     * Add file to file list after succesfull validation
     * @param {?} file
     * @param {?=} fileName
     * @return {?}
     */
    function (file, fileName) {
        if (fileName === void 0) { fileName = file.name; }
        this.files.push({ file: file, fileName: fileName });
        this.fileAdded.next({ file: file, fileName: fileName });
    };
    /** Opens cropper for image crop */
    /**
     * Opens cropper for image crop
     * @param {?} file
     * @return {?}
     */
    FilePickerComponent.prototype.openCropper = /**
     * Opens cropper for image crop
     * @param {?} file
     * @return {?}
     */
    function (file) {
        if (((/** @type {?} */ (window))).UPLOADER_TEST_MODE || typeof Cropper !== 'undefined') {
            this.safeCropImgUrl = this.fileService.createSafeUrl(file);
            this.currentCropperFile = file;
        }
        else {
            console.warn("please import cropperjs script and styles to use cropper feature or disable it by setting [enableCropper]='false'");
            return;
        }
    };
    /**
     * @param {?} file
     * @return {?}
     */
    FilePickerComponent.prototype.getSafeUrl = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return this.fileService.createSafeUrl(file);
    };
    /** On img load event */
    /**
     * On img load event
     * @param {?} e
     * @return {?}
     */
    FilePickerComponent.prototype.cropperImgLoaded = /**
     * On img load event
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var image = document.getElementById('cropper-img');
        this.cropper = new Cropper(image, this.cropperOptions);
    };
    /** Close or cancel cropper */
    /**
     * Close or cancel cropper
     * @param {?} filePreview
     * @return {?}
     */
    FilePickerComponent.prototype.closeCropper = /**
     * Close or cancel cropper
     * @param {?} filePreview
     * @return {?}
     */
    function (filePreview) {
        var _this = this;
        this.currentCropperFile = undefined;
        this.cropper = undefined;
        setTimeout((/**
         * @return {?}
         */
        function () { return _this.cropClosed$.next(filePreview); }), 200);
    };
    /** Removes files from files list */
    /**
     * Removes files from files list
     * @param {?} file
     * @return {?}
     */
    FilePickerComponent.prototype.removeFileFromList = /**
     * Removes files from files list
     * @param {?} file
     * @return {?}
     */
    function (file) {
        this.files = this.files.filter((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f !== file; }));
    };
    /** Emits event when file upload api returns success  */
    /**
     * Emits event when file upload api returns success
     * @param {?} fileItem
     * @return {?}
     */
    FilePickerComponent.prototype.onUploadSuccess = /**
     * Emits event when file upload api returns success
     * @param {?} fileItem
     * @return {?}
     */
    function (fileItem) {
        this.uploadSuccess.next(fileItem);
    };
    /** Emits event when file upload api returns success  */
    /**
     * Emits event when file upload api returns success
     * @param {?} er
     * @return {?}
     */
    FilePickerComponent.prototype.onUploadFail = /**
     * Emits event when file upload api returns success
     * @param {?} er
     * @return {?}
     */
    function (er) {
        this.uploadFail.next(er);
    };
    /** Validates file extension */
    /**
     * Validates file extension
     * @param {?} file
     * @param {?} fileName
     * @return {?}
     */
    FilePickerComponent.prototype.isValidExtension = /**
     * Validates file extension
     * @param {?} file
     * @param {?} fileName
     * @return {?}
     */
    function (file, fileName) {
        if (!this.fileExtensions) {
            return true;
        }
        /** @type {?} */
        var extension = fileName.split('.').pop();
        /** @type {?} */
        var fileExtensions = this.fileExtensions.map((/**
         * @param {?} ext
         * @return {?}
         */
        function (ext) { return ext.toLowerCase(); }));
        if (fileExtensions.indexOf(extension.toLowerCase()) === -1) {
            this.validationError.next({ file: file, error: FileValidationTypes.extensions });
            return false;
        }
    };
    /** Validates selected file size and total file size */
    /**
     * Validates selected file size and total file size
     * @param {?} file
     * @param {?} size
     * @return {?}
     */
    FilePickerComponent.prototype.isValidSize = /**
     * Validates selected file size and total file size
     * @param {?} file
     * @param {?} size
     * @return {?}
     */
    function (file, size) {
        /**
         * Validating selected file size
         * @type {?}
         */
        var res = this.bitsToMb(size.toString());
        /** @type {?} */
        var isValidFileSize;
        /** @type {?} */
        var isValidTotalFileSize;
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
        var totalBits = this.files
            .map((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.file.size; }))
            .reduce((/**
         * @param {?} acc
         * @param {?} curr
         * @return {?}
         */
        function (acc, curr) { return acc + curr; }), 0);
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
    };
    /**
     * @param {?} size
     * @return {?}
     */
    FilePickerComponent.prototype.bitsToMb = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        return parseFloat(size) / 1048576;
    };
    /** when crop button submitted */
    /**
     * when crop button submitted
     * @return {?}
     */
    FilePickerComponent.prototype.onCropSubmit = /**
     * when crop button submitted
     * @return {?}
     */
    function () {
        /** @type {?} */
        var canvas = this.cropper.getCroppedCanvas();
        if (canvas != null) {
            this.cropper.getCroppedCanvas().toBlob(this.blobFallBack.bind(this), 'image/jpeg');
        }
    };
    /** After crop submit */
    /**
     * After crop submit
     * @param {?} blob
     * @return {?}
     */
    FilePickerComponent.prototype.blobFallBack = /**
     * After crop submit
     * @param {?} blob
     * @return {?}
     */
    function (blob) {
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
    };
    /**
     * @param {?} fileItem
     * @return {?}
     */
    FilePickerComponent.prototype.removeFile = /**
     * @param {?} fileItem
     * @return {?}
     */
    function (fileItem) {
        var _this = this;
        if (this.adapter) {
            this.adapter.removeFile(fileItem).subscribe((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                _this.onRemoveSuccess(fileItem);
            }));
        }
        else {
            console.warn('no adapter was provided');
        }
    };
    /** Emits event when file remove api returns success  */
    /**
     * Emits event when file remove api returns success
     * @param {?} fileItem
     * @return {?}
     */
    FilePickerComponent.prototype.onRemoveSuccess = /**
     * Emits event when file remove api returns success
     * @param {?} fileItem
     * @return {?}
     */
    function (fileItem) {
        this.removeSuccess.next(fileItem);
        this.removeFileFromList(fileItem);
    };
    FilePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-file-picker',
                    template: "<div\n(click)=\"fileInput.click()\"\nclass=\"file-drop-wrapper\"\n*ngIf=\"showeDragDropZone\"\n>\n<file-drop\n  (onFileDrop)=\"dropped($event)\"\n  [customstyle]=\"'custom-drag'\"\n  [captions]=\"_captions\"\n>\n  <ng-content select=\".dropzoneTemplate\"> </ng-content>\n</file-drop>\n</div>\n\n<input\ntype=\"file\"\nname=\"file[]\"\nid=\"fileInput\"\n#fileInput\n[multiple]=\"uploadType === 'multi' ? 'multiple' : ''\"\n(click)=\"fileInput.value = null\"\n(change)=\"onChange(fileInput)\"\n[accept]=\"accept\"\nclass=\"file-input\"\n/>\n\n<div class=\"cropperJsOverlay\" *ngIf=\"currentCropperFile\">\n<div class=\"cropperJsBox\">\n  <img\n    [src]=\"safeCropImgUrl\"\n    id=\"cropper-img\"\n    (load)=\"cropperImgLoaded($event)\"\n  />\n  <div class=\"cropper-actions\">\n    <button class=\"cropSubmit\" (click)=\"onCropSubmit()\">\n      {{ _captions?.cropper?.crop }}\n    </button>\n    <button\n      class=\"cropCancel\"\n      (click)=\"\n        closeCropper({\n          file: currentCropperFile,\n          fileName: currentCropperFile.name\n        })\n      \"\n    >\n      {{ _captions?.cropper?.cancel }}\n    </button>\n  </div>\n</div>\n</div>\n<div\nclass=\"files-preview-wrapper\"\n[ngClass]=\"{ 'visually-hidden': !showPreviewContainer }\"\n>\n<file-preview-container\n  *ngIf=\"files\"\n  [previewFiles]=\"files\"\n  (removeFile)=\"removeFile($event)\"\n  (uploadSuccess)=\"onUploadSuccess($event)\"\n  [adapter]=\"adapter\"\n  [itemTemplate]=\"itemTemplate\"\n  [captions]=\"_captions\"\n>\n</file-preview-container>\n</div>\n",
                    styles: ["*{box-sizing:border-box}:host{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:center;align-items:center;width:100%;height:100%;overflow:auto;max-width:440px;border-radius:6px}.files-preview-wrapper{width:100%}#cropper-img{max-width:60vw}#cropper-img img{width:100%;height:100%}.file-drop-wrapper{width:100%;background:#fafbfd;padding-top:20px}.preview-container{display:-webkit-box;display:flex}.cropperJsOverlay{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;position:fixed;z-index:999;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,.32)}.cropperJsBox{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;max-height:calc(100vh - 38px - 50px);max-width:90vw}.cropperJsBox .cropper-actions{display:-webkit-box;display:flex}.cropperJsBox .cropper-actions button{margin:5px;padding:12px 25px;border-radius:6px;border:0;cursor:pointer}.cropperJsBox .cropper-actions .cropSubmit{color:#fff;background:#16a085}::ng-deep.cropper img{max-height:300px!important}#images{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;width:500px;overflow-x:auto}#images .image{-webkit-box-flex:0;flex:0 0 100px;margin:0 2px;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:end;align-items:flex-end}#fileInput{display:none}.uploader-submit-btn{background:#ffd740;color:rgba(0,0,0,.87);border:0;padding:0 16px;line-height:36px;font-size:15px;margin-top:12px;border-radius:4px;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);cursor:pointer}button:disabled{color:rgba(0,0,0,.26);background:#dcdcdc}.visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}"]
                }] }
    ];
    /** @nocollapse */
    FilePickerComponent.ctorParameters = function () { return [
        { type: FilePickerService },
        { type: ElementRef }
    ]; };
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
    return FilePickerComponent;
}());
export { FilePickerComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF3ZXNvbWUtdXBsb2FkZXIvIiwic291cmNlcyI6WyJsaWIvZmlsZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQW1CLE1BQU0sMEJBQTBCLENBQUM7QUFDaEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFNMUQsT0FBTyxFQUFFLGFBQWEsRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlELE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUtyRDtJQWdFRSw2QkFDVSxXQUE4QixFQUM5QixVQUFzQjtRQUR0QixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFDOUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTs7OztRQTNEdEIsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQzs7OztRQUVyRCxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7Ozs7UUFFbkQsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQzs7OztRQUVyRCxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDOzs7O1FBRXRELGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQzs7OztRQUszRCxr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LFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLDhoREFBMkM7O2lCQUU1Qzs7OztnQkFoQ1EsaUJBQWlCO2dCQUd4QixVQUFVOzs7Z0NBZ0NULE1BQU07NkJBRU4sTUFBTTtnQ0FFTixNQUFNO2tDQUVOLE1BQU07NEJBRU4sTUFBTTtrQ0FFTixLQUFLO2dDQUVMLEtBQUs7b0NBR0wsS0FBSzt1Q0FFTCxLQUFLOytCQUVMLEtBQUs7NkJBRUwsS0FBSzs4QkFHTCxLQUFLOytCQUdMLEtBQUs7K0JBR0wsS0FBSzt5QkFHTCxLQUFLO2lDQUlMLEtBQUs7aUNBR0wsS0FBSzswQkFNTCxLQUFLO21DQUdMLEtBQUs7MkJBRUwsS0FBSzs7SUE4U1IsMEJBQUM7Q0FBQSxBQXhXRCxJQXdXQztTQW5XWSxtQkFBbUI7Ozs7OztJQUU5Qiw0Q0FBK0Q7Ozs7O0lBRS9ELHlDQUE2RDs7Ozs7SUFFN0QsNENBQStEOzs7OztJQUUvRCw4Q0FBZ0U7Ozs7O0lBRWhFLHdDQUEyRDs7Ozs7SUFFM0QsOENBQThEOzs7OztJQUU5RCw0Q0FDc0I7Ozs7O0lBRXRCLGdEQUFrQzs7Ozs7SUFFbEMsbURBQXFDOzs7OztJQUVyQywyQ0FBd0M7Ozs7O0lBRXhDLHlDQUNxQjs7Ozs7SUFFckIsMENBQ29COzs7OztJQUVwQiwyQ0FDcUI7Ozs7O0lBRXJCLDJDQUNxQjs7Ozs7SUFFckIscUNBQ2U7O0lBQ2Ysb0NBQStCOzs7OztJQUUvQiw2Q0FBa0M7O0lBQ2xDLHNDQUFhOzs7OztJQUViLDZDQUFnQzs7Ozs7SUFFaEMsOENBQTZCOzs7OztJQUU3QixpREFBeUI7Ozs7O0lBRXpCLHNDQUMyQjs7Ozs7SUFFM0IsK0NBQTRDOzs7OztJQUU1Qyx1Q0FBb0M7Ozs7O0lBRXBDLHdDQUE0Qjs7SUFDNUIsMENBQThDOztJQUM5QywwQ0FBa0M7O0lBQ2xDLDZDQUFnQzs7Ozs7SUFFOUIsMENBQXNDOzs7OztJQUN0Qyx5Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWxlUGlja2VyU2VydmljZSB9IGZyb20gJy4vZmlsZS1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2FmZVJlc291cmNlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBGaWxlUHJldmlld01vZGVsIH0gZnJvbSAnLi9maWxlLXByZXZpZXcubW9kZWwnO1xuaW1wb3J0IHsgZ2V0RmlsZVR5cGUgfSBmcm9tICcuL2ZpbGUtdXBsb2FkLnV0aWxzJztcbmltcG9ydCB7IEZpbGVWYWxpZGF0aW9uVHlwZXMsIFZhbGlkYXRpb25FcnJvciB9IGZyb20gJy4vdmFsaWRhdGlvbi1lcnJvci5tb2RlbCc7XG5pbXBvcnQgeyBGaWxlUGlja2VyQWRhcHRlciB9IGZyb20gJy4vZmlsZS1waWNrZXIuYWRhcHRlcic7XG5pbXBvcnQge1xuICBGaWxlU3lzdGVtRGlyZWN0b3J5RW50cnksXG4gIEZpbGVTeXN0ZW1GaWxlRW50cnksXG4gIFVwbG9hZEV2ZW50XG59IGZyb20gJy4vZmlsZS1kcm9wJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGVmYXVsdENhcHRpb25zIH0gZnJvbSAnLi9kZWZhdWx0LWNhcHRpb25zJztcbmltcG9ydCB7IFVwbG9hZGVyQ2FwdGlvbnMgfSBmcm9tICcuL3VwbG9hZGVyLWNhcHRpb25zJztcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5kZWNsYXJlIHZhciBDcm9wcGVyO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWZpbGUtcGlja2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbGUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmlsZS1waWNrZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGaWxlUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKiogRW1pdHRlZCB3aGVuIGZpbGUgdXBsb2FkIHZpYSBhcGkgc3VjY2Vzc2Z1bGx5LiBFbWl0dGVkIGZvciBldmVyeSBmaWxlICovXG4gIEBPdXRwdXQoKSB1cGxvYWRTdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlUHJldmlld01vZGVsPigpO1xuICAvKiogRW1pdHRlZCB3aGVuIGZpbGUgdXBsb2FkIHZpYSBhcGkgZmFpbGVkLiBFbWl0dGVkIGZvciBldmVyeSBmaWxlICovXG4gIEBPdXRwdXQoKSB1cGxvYWRGYWlsID0gbmV3IEV2ZW50RW1pdHRlcjxIdHRwRXJyb3JSZXNwb25zZT4oKTtcbiAgLyoqIEVtaXR0ZWQgd2hlbiBmaWxlIGlzIHJlbW92ZWQgdmlhIGFwaSBzdWNjZXNzZnVsbHkuIEVtaXR0ZWQgZm9yIGV2ZXJ5IGZpbGUgKi9cbiAgQE91dHB1dCgpIHJlbW92ZVN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVQcmV2aWV3TW9kZWw+KCk7XG4gIC8qKiBFbWl0dGVkIG9uIGZpbGUgdmFsaWRhdGlvbiBmYWlsICovXG4gIEBPdXRwdXQoKSB2YWxpZGF0aW9uRXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPFZhbGlkYXRpb25FcnJvcj4oKTtcbiAgLyoqIEVtaXR0ZWQgd2hlbiBmaWxlIGlzIGFkZGVkIGFuZCBwYXNzZWQgdmFsaWRhdGlvbnMuIE5vdCB1cGxvYWRlZCB5ZXQgKi9cbiAgQE91dHB1dCgpIGZpbGVBZGRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVByZXZpZXdNb2RlbD4oKTtcbiAgLyoqIEN1c3RvbSB2YWxpZGF0b3IgZnVuY3Rpb24gKi9cbiAgQElucHV0KCkgY3VzdG9tVmFsaWRhdG9yOiAoZmlsZTogRmlsZSkgPT4gT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgLyoqIFdoZXRoZXIgdG8gZW5hYmxlIGNyb3BwZXIuIERlZmF1bHQ6IGRpc2FibGVkICovXG4gIEBJbnB1dCgpXG4gIGVuYWJsZUNyb3BwZXIgPSBmYWxzZTtcbiAgLyoqIFdoZXRoZXIgdG8gc2hvdyBkZWZhdWx0IGRyYWcgYW5kIGRyb3Agem9uZS4gRGVmYXVsdDp0cnVlICovXG4gIEBJbnB1dCgpIHNob3dlRHJhZ0Ryb3Bab25lID0gdHJ1ZTtcbiAgLyoqIFdoZXRoZXIgdG8gc2hvdyBkZWZhdWx0IGZpbGVzIHByZXZpZXcgY29udGFpbmVyLiBEZWZhdWx0OiB0cnVlICovXG4gIEBJbnB1dCgpIHNob3dQcmV2aWV3Q29udGFpbmVyID0gdHJ1ZTtcbiAgLyoqIFByZXZpZXcgSXRlbSB0ZW1wbGF0ZSAqL1xuICBASW5wdXQoKSBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIC8qKiBTaW5nbGUgb3IgbXVsdGlwbGUuIERlZmF1bHQ6IG11bHRpICovXG4gIEBJbnB1dCgpXG4gIHVwbG9hZFR5cGUgPSAnbXVsdGknO1xuICAvKiogTWF4IHNpemUgb2Ygc2VsZWN0ZWQgZmlsZSBpbiBNQi4gRGVmYXVsdDogbm8gbGltaXQgKi9cbiAgQElucHV0KClcbiAgZmlsZU1heFNpemU6IG51bWJlcjtcbiAgLyoqIE1heCBjb3VudCBvZiBmaWxlIGluIG11bHRpLXVwbG9hZC4gRGVmYXVsdDogbm8gbGltaXQgKi9cbiAgQElucHV0KClcbiAgZmlsZU1heENvdW50OiBudW1iZXI7XG4gIC8qKiBUb3RhbCBNYXggc2l6ZSBsaW1pdCBvZiBhbGwgZmlsZXMgaW4gTUIuIERlZmF1bHQ6IG5vIGxpbWl0ICovXG4gIEBJbnB1dCgpXG4gIHRvdGFsTWF4U2l6ZTogbnVtYmVyO1xuICAvKiogV2hpY2ggZmlsZSB0eXBlcyB0byBzaG93IG9uIGNob29zZSBmaWxlIGRpYWxvZy4gRGVmYXVsdDogc2hvdyBhbGwgKi9cbiAgQElucHV0KClcbiAgYWNjZXB0OiBzdHJpbmc7XG4gIGZpbGVzOiBGaWxlUHJldmlld01vZGVsW10gPSBbXTtcbiAgLyoqIEZpbGUgZXh0ZW5zaW9ucyBmaWx0ZXIgKi9cbiAgQElucHV0KCkgZmlsZUV4dGVuc2lvbnM6IFN0cmluZ1tdO1xuICBjcm9wcGVyOiBhbnk7XG4gIC8qKiBDcm9wcGVyIG9wdGlvbnMuICovXG4gIEBJbnB1dCgpIGNyb3BwZXJPcHRpb25zOiBPYmplY3Q7XG4gIC8qKiBGaWxlcyBhcnJheSBmb3IgY3JvcHBlci4gV2lsbCBiZSBzaG93biBlcXVlbnRpYWxseSBpZiBjcm9wIGVuYWJsZWQgKi9cbiAgZmlsZXNGb3JDcm9wcGVyOiBGaWxlW10gPSBbXTtcbiAgLyoqIEN1cnJlbnQgZmlsZSB0byBiZSBzaG93biBpbiBjcm9wcGVyKi9cbiAgY3VycmVudENyb3BwZXJGaWxlOiBGaWxlO1xuICAvKiogQ3VzdG9tIGFwaSBBZGFwdGVyIGZvciB1cGxvYWRpbmcvcmVtb3ZpbmcgZmlsZXMgKi9cbiAgQElucHV0KClcbiAgYWRhcHRlcjogRmlsZVBpY2tlckFkYXB0ZXI7XG4gIC8qKiAgQ3VzdG9tZSB0ZW1wbGF0ZSBmb3IgZHJvcHpvbmUgKi9cbiAgQElucHV0KCkgZHJvcHpvbmVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgLyoqIEN1c3RvbSBjYXB0aW9ucyBpbnB1dC4gVXNlZCBmb3IgbXVsdGkgbGFuZ3VhZ2Ugc3VwcG9ydCAqL1xuICBASW5wdXQoKSBjYXB0aW9uczogVXBsb2FkZXJDYXB0aW9ucztcbiAgLyoqIGNhcHRpb25zIG9iamVjdCovXG4gIF9jYXB0aW9uczogVXBsb2FkZXJDYXB0aW9ucztcbiAgY3JvcENsb3NlZCQgPSBuZXcgU3ViamVjdDxGaWxlUHJldmlld01vZGVsPigpO1xuICBfb25EZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHNhZmVDcm9wSW1nVXJsOiBTYWZlUmVzb3VyY2VVcmw7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVQaWNrZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZlxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZXRDcm9wcGVyT3B0aW9ucygpO1xuICAgIHRoaXMubGlzdGVuVG9Dcm9wQ2xvc2UoKTtcbiAgICB0aGlzLnNldENhcHRpb25zKCk7XG4gIH1cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fb25EZXN0cm95JC5uZXh0KCk7XG4gIH1cbiAgc2V0Q2FwdGlvbnMoKSB7XG4gICAgdGhpcy5fY2FwdGlvbnMgPSB0aGlzLmNhcHRpb25zIHx8IERlZmF1bHRDYXB0aW9ucztcbiAgfVxuICAvKiogTGlzdGVuIHdoZW4gQ3JvcHBlciBpcyBjbG9zZWQgYW5kIG9wZW4gbmV3IGNyb3BwZXIgaWYgbmV4dCBpbWFnZSBleGlzdHMgKi9cbiAgbGlzdGVuVG9Dcm9wQ2xvc2UoKSB7XG4gICAgdGhpcy5jcm9wQ2xvc2VkJFxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgocmVzOiBGaWxlUHJldmlld01vZGVsKSA9PiB7XG4gICAgICAgIGNvbnN0IGNyb3BwZWRJbmRleCA9IHRoaXMuZmlsZXNGb3JDcm9wcGVyLmZpbmRJbmRleChcbiAgICAgICAgICBpdGVtID0+IGl0ZW0ubmFtZSA9PT0gcmVzLmZpbGVOYW1lXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG5leHRGaWxlID1cbiAgICAgICAgICBjcm9wcGVkSW5kZXggIT09IC0xXG4gICAgICAgICAgICA/IHRoaXMuZmlsZXNGb3JDcm9wcGVyW2Nyb3BwZWRJbmRleCArIDFdXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobmV4dEZpbGUpXG4gICAgICAgIC8vICBjb25zb2xlLmxvZygnY3JvcHBlZCcsIHJlcyk7XG4gICAgICAgIHRoaXMuZmlsZXNGb3JDcm9wcGVyID0gWy4uLnRoaXMuZmlsZXNGb3JDcm9wcGVyXS5maWx0ZXIoXG4gICAgICAgICAgaXRlbSA9PiBpdGVtLm5hbWUgIT09IHJlcy5maWxlTmFtZVxuICAgICAgICApO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmZpbGVzRm9yQ3JvcHBlcik7XG4gICAgICAgIGlmIChuZXh0RmlsZSkge1xuICAgICAgICAgIHRoaXMub3BlbkNyb3BwZXIobmV4dEZpbGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuICAvKiogU2V0cyBjdXN0b20gY3JvcHBlciBvcHRpb25zIGlmIGF2YWlhYmxlICovXG4gIHNldENyb3BwZXJPcHRpb25zKCkge1xuICAgIGlmICghdGhpcy5jcm9wcGVyT3B0aW9ucykge1xuICAgICAgdGhpcy5zZXREZWZhdWx0Q3JvcHBlck9wdGlvbnMoKTtcbiAgICB9XG4gIH1cbiAgLyoqIFNldHMgbWFudWFsIGNyb3BwZXIgb3B0aW9ucyBpZiBubyBjdXN0b20gb3B0aW9ucyBhcmUgYXZhaWFibGUgKi9cbiAgc2V0RGVmYXVsdENyb3BwZXJPcHRpb25zKCkge1xuICAgIHRoaXMuY3JvcHBlck9wdGlvbnMgPSB7XG4gICAgICBkcmFnTW9kZTogJ2Nyb3AnLFxuICAgICAgYXNwZWN0UmF0aW86IDEsXG4gICAgICBhdXRvQ3JvcDogdHJ1ZSxcbiAgICAgIG1vdmFibGU6IHRydWUsXG4gICAgICB6b29tYWJsZTogdHJ1ZSxcbiAgICAgIHNjYWxhYmxlOiB0cnVlLFxuICAgICAgYXV0b0Nyb3BBcmVhOiAwLjhcbiAgICB9O1xuICB9XG4gIC8qKiBPbiBpbnB1dCBmaWxlIHNlbGVjdGVkICovXG4gIG9uQ2hhbmdlKGZpbGVJbnB1dDogSFRNTElucHV0RWxlbWVudCkge1xuICAgIGNvbnN0IGZpbGVzOiBGaWxlW10gPSBBcnJheS5mcm9tKGZpbGVJbnB1dC5maWxlcyk7XG4gICAgdGhpcy5oYW5kbGVGaWxlcyhmaWxlcykuc3Vic2NyaWJlKCk7XG4gIH1cbiAgLyoqIEhhbmRsZXMgaW5wdXQgYW5kIGRyYWcvZHJvcCBmaWxlcyAqL1xuICBoYW5kbGVGaWxlcyhmaWxlczogRmlsZVtdKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWRNYXhGaWxlQ291bnQoZmlsZXMpKSB7XG4gICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgfVxuICAgIGNvbnN0IGlzVmFsaWRVcGxvYWRTeW5jID0gZmlsZXMuZXZlcnkoaXRlbSA9PiB0aGlzLnZhbGlkYXRlRmlsZVN5bmMoaXRlbSkpO1xuICAgIGNvbnN0IGFzeW5jRnVuY3Rpb25zID0gZmlsZXMubWFwKGl0ZW0gPT4gdGhpcy52YWxpZGF0ZUZpbGVBc3luYyhpdGVtKSk7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoLi4uYXN5bmNGdW5jdGlvbnMpLnBpcGUoXG4gICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgY29uc3QgaXNWYWxpZFVwbG9hZEFzeW5jID0gcmVzLmV2ZXJ5KHJlc3VsdCA9PiByZXN1bHQgPT09IHRydWUpO1xuICAgICAgICBpZiAoIWlzVmFsaWRVcGxvYWRTeW5jIHx8ICFpc1ZhbGlkVXBsb2FkQXN5bmMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZTogRmlsZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIHRoaXMuaGFuZGxlSW5wdXRGaWxlKGZpbGUsIGluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgLyoqIFZhbGlkYXRlcyBzeW5jaHJvbm91cyB2YWxpZGF0aW9ucyAqL1xuICB2YWxpZGF0ZUZpbGVTeW5jKGZpbGU6IEZpbGUpOiBib29sZWFuIHtcbiAgICBpZiAoIWZpbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzVmFsaWRVcGxvYWRUeXBlKGZpbGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGhpcy5pc1ZhbGlkRXh0ZW5zaW9uKGZpbGUsIGZpbGUubmFtZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgLyoqIFZhbGlkYXRlcyBhc3luY2hyb25vdXMgdmFsaWRhdGlvbnMgKi9cbiAgdmFsaWRhdGVGaWxlQXN5bmMoZmlsZTogRmlsZSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGlmICghdGhpcy5jdXN0b21WYWxpZGF0b3IpIHtcbiAgICAgIHJldHVybiBvZih0cnVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3VzdG9tVmFsaWRhdG9yKGZpbGUpLnBpcGUoXG4gICAgICB0YXAocmVzID0+IHtcbiAgICAgICAgaWYgKCFyZXMpIHtcbiAgICAgICAgICB0aGlzLnZhbGlkYXRpb25FcnJvci5uZXh0KHtcbiAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICBlcnJvcjogRmlsZVZhbGlkYXRpb25UeXBlcy5jdXN0b21WYWxpZGF0b3JcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIC8qKiBIYW5kbGVzIGlucHV0IGFuZCBkcmFnJmRyb3AgZmlsZXMgKi9cbiAgaGFuZGxlSW5wdXRGaWxlKGZpbGU6IEZpbGUsIGluZGV4KTogdm9pZCB7XG4gICAgY29uc3QgdHlwZSA9IGdldEZpbGVUeXBlKGZpbGUudHlwZSk7XG4gICAgaWYgKHR5cGUgPT09ICdpbWFnZScgJiYgdGhpcy5lbmFibGVDcm9wcGVyKSB7XG4gICAgICB0aGlzLmZpbGVzRm9yQ3JvcHBlci5wdXNoKGZpbGUpO1xuICAgICAgaWYgKCF0aGlzLmN1cnJlbnRDcm9wcGVyRmlsZSkge1xuICAgICAgICB0aGlzLm9wZW5Dcm9wcGVyKGZpbGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvKiogU2l6ZSBpcyBub3QgaW5pdGlhbGx5IGNoZWNrZWQgb24gaGFuZGxlSW5wdXRGaWxlcyBiZWNhdXNlIG9mIGNyb3BwZXIgc2l6ZSBjaGFuZ2UgKi9cbiAgICAgIGlmICh0aGlzLmlzVmFsaWRTaXplKGZpbGUsIGZpbGUuc2l6ZSkpIHtcbiAgICAgICAgdGhpcy5wdXNoRmlsZShmaWxlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLyoqIFZhbGlkYXRlcyBpZiB1cGxvYWQgdHlwZSBpcyBzaW5nbGUgc28gYW5vdGhlciBmaWxlIGNhbm5vdCBiZSBhZGRlZCAqL1xuICBpc1ZhbGlkVXBsb2FkVHlwZShmaWxlKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMudXBsb2FkVHlwZSA9PT0gJ3NpbmdsZScgJiYgdGhpcy5maWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnZhbGlkYXRpb25FcnJvci5uZXh0KHtcbiAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgZXJyb3I6IEZpbGVWYWxpZGF0aW9uVHlwZXMudXBsb2FkVHlwZVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICAvKiogVmFsaWRhdGVzIG1heCBmaWxlIGNvdW50ICovXG4gIGlzVmFsaWRNYXhGaWxlQ291bnQoZmlsZXM6IEZpbGVbXSk6IGJvb2xlYW4ge1xuICAgIGlmIChcbiAgICAgICF0aGlzLmZpbGVNYXhDb3VudCB8fFxuICAgICAgdGhpcy5maWxlTWF4Q291bnQgPj0gdGhpcy5maWxlcy5sZW5ndGggKyBmaWxlcy5sZW5ndGhcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbGlkYXRpb25FcnJvci5uZXh0KHtcbiAgICAgICAgZmlsZTogbnVsbCxcbiAgICAgICAgZXJyb3I6IEZpbGVWYWxpZGF0aW9uVHlwZXMuZmlsZU1heENvdW50XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgLyoqIE9uIGZpbGUgZHJvcHBlZCAqL1xuICBkcm9wcGVkKGV2ZW50OiBVcGxvYWRFdmVudCkge1xuICAgIGNvbnN0IGZpbGVzID0gZXZlbnQuZmlsZXM7XG4gICAgY29uc3QgZmlsZXNGb3JVcGxvYWQ6IEZpbGVbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgZHJvcHBlZEZpbGUgb2YgZXZlbnQuZmlsZXMpIHtcbiAgICAgIC8vIElzIGl0IGEgZmlsZT9cbiAgICAgIGlmIChkcm9wcGVkRmlsZS5maWxlRW50cnkuaXNGaWxlKSB7XG4gICAgICAgIGNvbnN0IGZpbGVFbnRyeSA9IGRyb3BwZWRGaWxlLmZpbGVFbnRyeSBhcyBGaWxlU3lzdGVtRmlsZUVudHJ5O1xuICAgICAgICBmaWxlRW50cnkuZmlsZSgoZmlsZTogRmlsZSkgPT4ge1xuICAgICAgICAgIGZpbGVzRm9yVXBsb2FkLnB1c2goZmlsZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSXQgd2FzIGEgZGlyZWN0b3J5IChlbXB0eSBkaXJlY3RvcmllcyBhcmUgYWRkZWQsIG90aGVyd2lzZSBvbmx5IGZpbGVzKVxuICAgICAgICBjb25zdCBmaWxlRW50cnkgPSBkcm9wcGVkRmlsZS5maWxlRW50cnkgYXMgRmlsZVN5c3RlbURpcmVjdG9yeUVudHJ5O1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkcm9wcGVkRmlsZS5yZWxhdGl2ZVBhdGgsIGZpbGVFbnRyeSk7XG4gICAgICB9XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oYW5kbGVGaWxlcyhmaWxlc0ZvclVwbG9hZCkuc3Vic2NyaWJlKCkpO1xuICB9XG4gIC8qKiBBZGQgZmlsZSB0byBmaWxlIGxpc3QgYWZ0ZXIgc3VjY2VzZnVsbCB2YWxpZGF0aW9uICovXG4gIHB1c2hGaWxlKGZpbGU6IEZpbGUsIGZpbGVOYW1lID0gZmlsZS5uYW1lKTogdm9pZCB7XG4gICAgdGhpcy5maWxlcy5wdXNoKHsgZmlsZTogZmlsZSwgZmlsZU5hbWU6IGZpbGVOYW1lIH0pO1xuICAgIHRoaXMuZmlsZUFkZGVkLm5leHQoeyBmaWxlOiBmaWxlLCBmaWxlTmFtZTogZmlsZU5hbWUgfSk7XG4gIH1cbiAgLyoqIE9wZW5zIGNyb3BwZXIgZm9yIGltYWdlIGNyb3AgKi9cbiAgb3BlbkNyb3BwZXIoZmlsZTogRmlsZSk6IHZvaWQge1xuICAgIGlmICgoPGFueT53aW5kb3cpLlVQTE9BREVSX1RFU1RfTU9ERSB8fCB0eXBlb2YgQ3JvcHBlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuc2FmZUNyb3BJbWdVcmwgPSB0aGlzLmZpbGVTZXJ2aWNlLmNyZWF0ZVNhZmVVcmwoZmlsZSk7XG4gICAgICB0aGlzLmN1cnJlbnRDcm9wcGVyRmlsZSA9IGZpbGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgXCJwbGVhc2UgaW1wb3J0IGNyb3BwZXJqcyBzY3JpcHQgYW5kIHN0eWxlcyB0byB1c2UgY3JvcHBlciBmZWF0dXJlIG9yIGRpc2FibGUgaXQgYnkgc2V0dGluZyBbZW5hYmxlQ3JvcHBlcl09J2ZhbHNlJ1wiXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBnZXRTYWZlVXJsKGZpbGU6IEZpbGUpOiBTYWZlUmVzb3VyY2VVcmwge1xuICAgIHJldHVybiB0aGlzLmZpbGVTZXJ2aWNlLmNyZWF0ZVNhZmVVcmwoZmlsZSk7XG4gIH1cbiAgLyoqIE9uIGltZyBsb2FkIGV2ZW50ICovXG4gIGNyb3BwZXJJbWdMb2FkZWQoZSk6IHZvaWQge1xuICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nyb3BwZXItaW1nJyk7XG4gICAgdGhpcy5jcm9wcGVyID0gbmV3IENyb3BwZXIoaW1hZ2UsIHRoaXMuY3JvcHBlck9wdGlvbnMpO1xuICB9XG4gIC8qKiBDbG9zZSBvciBjYW5jZWwgY3JvcHBlciAqL1xuICBjbG9zZUNyb3BwZXIoZmlsZVByZXZpZXc6IEZpbGVQcmV2aWV3TW9kZWwpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRDcm9wcGVyRmlsZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNyb3BwZXIgPSB1bmRlZmluZWQ7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNyb3BDbG9zZWQkLm5leHQoZmlsZVByZXZpZXcpLCAyMDApO1xuICB9XG4gIC8qKiBSZW1vdmVzIGZpbGVzIGZyb20gZmlsZXMgbGlzdCAqL1xuICByZW1vdmVGaWxlRnJvbUxpc3QoZmlsZTogRmlsZVByZXZpZXdNb2RlbCk6IHZvaWQge1xuICAgIHRoaXMuZmlsZXMgPSB0aGlzLmZpbGVzLmZpbHRlcihmID0+IGYgIT09IGZpbGUpO1xuICB9XG5cbiAgLyoqIEVtaXRzIGV2ZW50IHdoZW4gZmlsZSB1cGxvYWQgYXBpIHJldHVybnMgc3VjY2VzcyAgKi9cbiAgb25VcGxvYWRTdWNjZXNzKGZpbGVJdGVtOiBGaWxlUHJldmlld01vZGVsKTogdm9pZCB7XG4gICAgdGhpcy51cGxvYWRTdWNjZXNzLm5leHQoZmlsZUl0ZW0pO1xuICB9XG5cbiAgLyoqIEVtaXRzIGV2ZW50IHdoZW4gZmlsZSB1cGxvYWQgYXBpIHJldHVybnMgc3VjY2VzcyAgKi9cbiAgb25VcGxvYWRGYWlsKGVyOiBIdHRwRXJyb3JSZXNwb25zZSk6IHZvaWQge1xuICAgIHRoaXMudXBsb2FkRmFpbC5uZXh0KGVyKTtcbiAgfVxuXG4gIC8qKiBWYWxpZGF0ZXMgZmlsZSBleHRlbnNpb24gKi9cbiAgaXNWYWxpZEV4dGVuc2lvbihmaWxlOiBGaWxlLCBmaWxlTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICBpZiAoIXRoaXMuZmlsZUV4dGVuc2lvbnMpIHtyZXR1cm4gdHJ1ZTsgfVxuICAgICAgY29uc3QgZXh0ZW5zaW9uID0gZmlsZU5hbWUuc3BsaXQoJy4nKS5wb3AoKTtcbiAgICAgIGNvbnN0IGZpbGVFeHRlbnNpb25zID0gdGhpcy5maWxlRXh0ZW5zaW9ucy5tYXAoZXh0ID0+IGV4dC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIGlmIChmaWxlRXh0ZW5zaW9ucy5pbmRleE9mKGV4dGVuc2lvbi50b0xvd2VyQ2FzZSgpKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3IubmV4dCh7ZmlsZTogZmlsZSwgZXJyb3I6IEZpbGVWYWxpZGF0aW9uVHlwZXMuZXh0ZW5zaW9uc30pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gIH1cbiAgLyoqIFZhbGlkYXRlcyBzZWxlY3RlZCBmaWxlIHNpemUgYW5kIHRvdGFsIGZpbGUgc2l6ZSAqL1xuICBpc1ZhbGlkU2l6ZShmaWxlOiBGaWxlLCBzaXplOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAvKiogVmFsaWRhdGluZyBzZWxlY3RlZCBmaWxlIHNpemUgKi9cbiAgICBjb25zdCByZXM6IG51bWJlciA9IHRoaXMuYml0c1RvTWIoc2l6ZS50b1N0cmluZygpKTtcbiAgICBsZXQgaXNWYWxpZEZpbGVTaXplOiBib29sZWFuO1xuICAgIGxldCBpc1ZhbGlkVG90YWxGaWxlU2l6ZTogYm9vbGVhbjtcbiAgICBpZiAoIXRoaXMuZmlsZU1heFNpemUgfHwgKHRoaXMuZmlsZU1heFNpemUgJiYgcmVzIDwgdGhpcy5maWxlTWF4U2l6ZSkpIHtcbiAgICAgIGlzVmFsaWRGaWxlU2l6ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yLm5leHQoe1xuICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICBlcnJvcjogRmlsZVZhbGlkYXRpb25UeXBlcy5maWxlTWF4U2l6ZVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKiBWYWxpZGF0aW5nIFRvdGFsIEZpbGVzIFNpemUgKi9cbiAgICBjb25zdCB0b3RhbEJpdHMgPSB0aGlzLmZpbGVzXG4gICAgICAubWFwKGYgPT4gZi5maWxlLnNpemUpXG4gICAgICAucmVkdWNlKChhY2MsIGN1cnIpID0+IGFjYyArIGN1cnIsIDApO1xuICAgIGlmIChcbiAgICAgICF0aGlzLnRvdGFsTWF4U2l6ZSB8fFxuICAgICAgKHRoaXMudG90YWxNYXhTaXplICYmXG4gICAgICAgIHRoaXMuYml0c1RvTWIodG90YWxCaXRzICsgZmlsZS5zaXplKSA8IHRoaXMudG90YWxNYXhTaXplKVxuICAgICkge1xuICAgICAgaXNWYWxpZFRvdGFsRmlsZVNpemUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbGlkYXRpb25FcnJvci5uZXh0KHtcbiAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgZXJyb3I6IEZpbGVWYWxpZGF0aW9uVHlwZXMudG90YWxNYXhTaXplXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuICEhaXNWYWxpZEZpbGVTaXplICYmIGlzVmFsaWRUb3RhbEZpbGVTaXplO1xuICB9XG4gIGJpdHNUb01iKHNpemUpOiBudW1iZXIge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KHNpemUpIC8gMTA0ODU3NjtcbiAgfVxuICAvKiogd2hlbiBjcm9wIGJ1dHRvbiBzdWJtaXR0ZWQgKi9cbiAgb25Dcm9wU3VibWl0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuY3JvcHBlci5nZXRDcm9wcGVkQ2FudmFzKCk7XG4gICAgaWYgKGNhbnZhcyAhPSBudWxsKSB7XG4gICAgICB0aGlzLmNyb3BwZXIuZ2V0Q3JvcHBlZENhbnZhcygpLnRvQmxvYih0aGlzLmJsb2JGYWxsQmFjay5iaW5kKHRoaXMpLCAnaW1hZ2UvanBlZycpO1xuICAgIH1cbiAgfVxuICAvKiogQWZ0ZXIgY3JvcCBzdWJtaXQgKi9cbiAgYmxvYkZhbGxCYWNrKGJsb2I6IEJsb2IpOiB2b2lkIHtcbiAgICBpZiAoIWJsb2IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNWYWxpZFNpemUoPEZpbGU+YmxvYiwgYmxvYi5zaXplKSkge1xuICAgICAgdGhpcy5wdXNoRmlsZSg8RmlsZT5ibG9iLCB0aGlzLmN1cnJlbnRDcm9wcGVyRmlsZS5uYW1lKTtcbiAgICB9XG4gICAgdGhpcy5jbG9zZUNyb3BwZXIoe1xuICAgICAgZmlsZTogYmxvYiBhcyBGaWxlLFxuICAgICAgZmlsZU5hbWU6IHRoaXMuY3VycmVudENyb3BwZXJGaWxlLm5hbWVcbiAgICB9KTtcbiAgfVxuICByZW1vdmVGaWxlKGZpbGVJdGVtOiBGaWxlUHJldmlld01vZGVsKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcikge1xuICAgICAgdGhpcy5hZGFwdGVyLnJlbW92ZUZpbGUoZmlsZUl0ZW0pLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICB0aGlzLm9uUmVtb3ZlU3VjY2VzcyhmaWxlSXRlbSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKCdubyBhZGFwdGVyIHdhcyBwcm92aWRlZCcpO1xuICAgIH1cbiAgfVxuICAvKiogRW1pdHMgZXZlbnQgd2hlbiBmaWxlIHJlbW92ZSBhcGkgcmV0dXJucyBzdWNjZXNzICAqL1xuICBvblJlbW92ZVN1Y2Nlc3MoZmlsZUl0ZW06IEZpbGVQcmV2aWV3TW9kZWwpOiB2b2lkIHtcbiAgICB0aGlzLnJlbW92ZVN1Y2Nlc3MubmV4dChmaWxlSXRlbSk7XG4gICAgdGhpcy5yZW1vdmVGaWxlRnJvbUxpc3QoZmlsZUl0ZW0pO1xuICB9XG59XG4iXX0=