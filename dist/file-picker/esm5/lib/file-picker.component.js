/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var FilePickerComponent = /** @class */ (function () {
    function FilePickerComponent(fileService, ref) {
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
            // .pipe(takeUntil(this._onDestroy$))
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
        this.cropperOptions = this.cropperOptions === undefined ? new CropperOptionsModel({}) : new CropperOptionsModel(this.cropperOptions);
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
                this.ref.detectChanges();
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
        this.droppingProcess = new FileDroppingProcessModel(event.files.length);
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
                        _this.droppingProcess.addFileForUpload(file);
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
        this.handleFilesIfDroppingProcessIsFinished();
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
        this.currentCropperFile = file;
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
        this.currentCropperFile = undefined;
        this.cropperIsReady = false;
        this.cropClosed$.next(filePreview);
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
    /** Emits event when file upload api returns failure  */
    /**
     * Emits event when file upload api returns failure
     * @param {?} er
     * @return {?}
     */
    FilePickerComponent.prototype.onUploadFail = /**
     * Emits event when file upload api returns failure
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
        return true;
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
        this.blobFallBack(this.croppedImage);
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
    /**
     * @param {?} event
     * @return {?}
     */
    FilePickerComponent.prototype.imageCropped = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.croppedImage = base64ToFile(event.base64);
    };
    /**
     * @return {?}
     */
    FilePickerComponent.prototype.imageLoaded = /**
     * @return {?}
     */
    function () {
        this.cropperIsReady = true;
    };
    /**
     * @return {?}
     */
    FilePickerComponent.prototype.loadImageFailed = /**
     * @return {?}
     */
    function () {
        console.log('Load Image Failed');
        this.closeCropper({
            file: this.currentCropperFile,
            fileName: this.currentCropperFile.name
        });
    };
    /**
     * @private
     * @return {?}
     */
    FilePickerComponent.prototype.handleFilesIfDroppingProcessIsFinished = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.droppingProcess.diminishCounter();
        if (this.droppingProcess.isProcessingFinished()) {
            this.handleFiles(this.droppingProcess.getFiles()).subscribe();
        }
        else {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.handleFilesIfDroppingProcessIsFinished();
            }), this.droppingProcess.checkTimeIntervalMS);
        }
    };
    FilePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-file-picker',
                    template: "<div\n(click)=\"fileInput.click()\"\nclass=\"file-drop-wrapper\"\n*ngIf=\"showeDragDropZone\"\n>\n<file-drop\n  (onFileDrop)=\"dropped($event)\"\n  [customstyle]=\"'custom-drag'\"\n  [captions]=\"_captions\"\n>\n  <ng-content select=\".dropzoneTemplate\"> </ng-content>\n</file-drop>\n</div>\n\n<input\ntype=\"file\"\nname=\"file[]\"\nid=\"fileInput\"\n#fileInput\n[multiple]=\"uploadType === 'multi' ? 'multiple' : ''\"\n(click)=\"fileInput.value = null\"\n(change)=\"onChange(fileInput)\"\n[accept]=\"accept\"\nclass=\"file-input\"\n/>\n\n<div class=\"cropperJsOverlay\" *ngIf=\"currentCropperFile\">\n  <div class=\"cropperJsBox\" [ngClass]=\"cropperIsReady? '' : 'visually-hidden'\">\n    <image-cropper\n      [imageFile]=\"currentCropperFile\"\n      [aspectRatio]=\"cropperOptions.aspectRatio\"\n      [autoCrop]=\"cropperOptions.autoCrop\"\n      [maintainAspectRatio]=\"cropperOptions.maintainAspectRatio\"\n      format=\"png\"\n      [resizeToWidth]=\"cropperOptions.resizeToWidth\"\n      [resizeToHeight]=\"cropperOptions.resizeToHeight\"\n      [cropperStaticWidth]=\"cropperOptions.cropperStaticWidth\"\n      [cropperStaticHeight]=\"cropperOptions.cropperStaticHeight\"\n      [cropperMinWidth]=\"cropperOptions.cropperMinWidth\"\n      [cropperMinHeight]=\"cropperOptions.cropperMinHeight\"\n      [initialStepSize]=\"cropperOptions.initialStepSize\"\n      [onlyScaleDown]=\"cropperOptions.onlyScaleDown\"\n      [roundCropper]=\"cropperOptions.roundCropper\"\n      [imageQuality]=\"cropperOptions.imageQuality\"\n      [alignImage]=\"cropperOptions.alignImage\"\n      [backgroundColor]=\"cropperOptions.backgroundColor\"\n      [hideResizeSquares]=\"cropperOptions.hideResizeSquares\"\n      [disabled]=\"cropperOptions.disabled\"\n      [canvasRotation]=\"cropperOptions.canvasRotation\"\n      [transform]=\"cropperOptions.transform\"\n      (imageCropped)=\"imageCropped($event)\"\n      (imageLoaded)=\"imageLoaded()\"\n      (loadImageFailed)=\"loadImageFailed()\"\n    ></image-cropper>\n\n    <div class=\"cropper-actions\">\n      <button class=\"cropSubmit\" (click)=\"onCropSubmit()\">\n        {{ _captions?.cropper?.crop }}\n      </button>\n      <button\n        class=\"cropCancel\"\n        (click)=\"\n          closeCropper({\n            file: currentCropperFile,\n            fileName: currentCropperFile.name\n          })\n        \"\n      >\n        {{ _captions?.cropper?.cancel }}\n      </button>\n    </div>\n  </div>\n  <div class=\"cropperJsBox loader_holder\" *ngIf=\"!cropperIsReady\">\n    <div class=\"loader\"></div>\n  </div>\n</div>\n\n<div\nclass=\"files-preview-wrapper\"\n[ngClass]=\"{ 'visually-hidden': !showPreviewContainer }\"\n>\n<file-preview-container\n  *ngIf=\"files\"\n  [previewFiles]=\"files\"\n  (removeFile)=\"removeFile($event)\"\n  (uploadSuccess)=\"onUploadSuccess($event)\"\n  [adapter]=\"adapter\"\n  [itemTemplate]=\"itemTemplate\"\n  [captions]=\"_captions\"\n>\n</file-preview-container>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["*{box-sizing:border-box}:host{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:center;align-items:center;width:100%;height:100%;overflow:auto;max-width:440px;border-radius:6px}.files-preview-wrapper{width:100%}.file-drop-wrapper{width:100%;background:#fafbfd;padding-top:20px}.preview-container{display:-webkit-box;display:flex}.cropperJsOverlay{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;position:fixed;z-index:999;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,.32)}.cropperJsBox{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;max-height:calc(100vh - 38px - 50px);max-width:90vw;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)}.cropperJsBox .cropper-actions{display:-webkit-box;display:flex}.cropperJsBox .cropper-actions button{margin:5px;padding:12px 25px;border-radius:6px;border:0;cursor:pointer}.cropperJsBox .cropper-actions .cropSubmit{color:#fff;background:#16a085}::ng-deep.cropper img{max-height:300px!important}#images{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;width:500px;overflow-x:auto}#images .image{-webkit-box-flex:0;flex:0 0 100px;margin:0 2px;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:end;align-items:flex-end}#fileInput{display:none}.uploader-submit-btn{background:#ffd740;color:rgba(0,0,0,.87);border:0;padding:0 16px;line-height:36px;font-size:15px;margin-top:12px;border-radius:4px;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);cursor:pointer}button:disabled{color:rgba(0,0,0,.26);background:#dcdcdc}.visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}.loader{border:8px solid #f3f3f3;border-radius:50%;border-top:8px solid #000;width:120px;height:120px;-webkit-animation:2s linear infinite spin;animation:2s linear infinite spin;display:inline-block}.loader_holder{padding:120px;display:block;float:right;background-color:#fff}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0)}100%{-webkit-transform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}"]
                }] }
    ];
    /** @nocollapse */
    FilePickerComponent.ctorParameters = function () { return [
        { type: FilePickerService },
        { type: ChangeDetectorRef }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF3ZXNvbWUtdXBsb2FkZXIvIiwic291cmNlcyI6WyJsaWIvZmlsZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUNMLHVCQUF1QixFQUFFLGlCQUFpQixFQUMxQyxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQW1CLE1BQU0sMEJBQTBCLENBQUM7QUFDaEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFNMUQsT0FBTyxFQUFFLGFBQWEsRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlELE9BQU8sRUFBRSxHQUFHLEVBQWEsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3JELE9BQU8sRUFBQyxZQUFZLEVBQW9CLE1BQU0sbUJBQW1CLENBQUM7QUFDbEUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDdkUsT0FBTyxFQUFpQixtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDOztBQUc1RTtJQXNFRSw2QkFDVSxXQUE4QixFQUM5QixHQUFzQjtRQUR0QixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFDOUIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7Ozs7UUFoRXRCLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7Ozs7UUFFckQsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDOzs7O1FBRW5ELGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7Ozs7UUFFckQsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQzs7OztRQUV0RCxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7Ozs7UUFLM0Qsa0JBQWEsR0FBRyxLQUFLLENBQUM7Ozs7UUFFYixzQkFBaUIsR0FBRyxJQUFJLENBQUM7Ozs7UUFFekIseUJBQW9CLEdBQUcsSUFBSSxDQUFDOzs7O1FBS3JDLGVBQVUsR0FBRyxPQUFPLENBQUM7UUFhckIsVUFBSyxHQUF1QixFQUFFLENBQUM7Ozs7UUFPL0Isb0JBQWUsR0FBVyxFQUFFLENBQUM7UUFZN0IsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBb0IsQ0FBQztRQUM5QyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFHbEMsbUJBQWMsR0FBRyxLQUFLLENBQUM7SUFPcEIsQ0FBQzs7OztJQUVKLHNDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7O0lBQ0QseUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7O0lBQ0QseUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLGVBQWUsQ0FBQztJQUNwRCxDQUFDO0lBQ0QsOEVBQThFOzs7OztJQUM5RSwrQ0FBaUI7Ozs7SUFBakI7UUFBQSxpQkFvQkM7UUFuQkMsSUFBSSxDQUFDLFdBQVc7WUFDZCxxQ0FBcUM7YUFDcEMsU0FBUzs7OztRQUFDLFVBQUMsR0FBcUI7O2dCQUN6QixZQUFZLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTOzs7O1lBQ2pELFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsUUFBUSxFQUExQixDQUEwQixFQUNuQzs7Z0JBQ0ssUUFBUSxHQUNaLFlBQVksS0FBSyxDQUFDLENBQUM7Z0JBQ2pCLENBQUMsQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7Z0JBQ3hDLENBQUMsQ0FBQyxTQUFTO1lBQ2YsZ0NBQWdDO1lBQ2hDLEtBQUksQ0FBQyxlQUFlLEdBQUcsaUJBQUksS0FBSSxDQUFDLGVBQWUsRUFBRSxNQUFNOzs7O1lBQ3JELFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsUUFBUSxFQUExQixDQUEwQixFQUNuQyxDQUFDO1lBQ0YscUNBQXFDO1lBQ3JDLElBQUksUUFBUSxFQUFFO2dCQUNaLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDNUI7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw4Q0FBOEM7Ozs7O0lBQzlDLCtDQUFpQjs7OztJQUFqQjtRQUNFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3ZJLENBQUM7SUFFRCw2QkFBNkI7Ozs7OztJQUM3QixzQ0FBUTs7Ozs7SUFBUixVQUFTLFNBQTJCOztZQUM1QixLQUFLLEdBQVcsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ2pELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVELHdDQUF3Qzs7Ozs7O0lBQ3hDLHlDQUFXOzs7OztJQUFYLFVBQVksS0FBYTtRQUF6QixpQkFrQkM7UUFqQkMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjs7WUFDSyxpQkFBaUIsR0FBRyxLQUFLLENBQUMsS0FBSzs7OztRQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUEzQixDQUEyQixFQUFDOztZQUNwRSxjQUFjLEdBQUcsS0FBSyxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBNUIsQ0FBNEIsRUFBQztRQUV0RSxPQUFPLGFBQWEsZ0NBQUksY0FBYyxHQUFFLElBQUksQ0FDMUMsR0FBRzs7OztRQUFDLFVBQUEsR0FBRzs7Z0JBQ0Msa0JBQWtCLEdBQUcsR0FBRyxDQUFDLEtBQUs7Ozs7WUFBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sS0FBSyxJQUFJLEVBQWYsQ0FBZSxFQUFDO1lBQy9ELElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUM3QyxPQUFPO2FBQ1I7WUFDRCxLQUFLLENBQUMsT0FBTzs7Ozs7WUFBQyxVQUFDLElBQVUsRUFBRSxLQUFhO2dCQUN0QyxLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNwQyxDQUFDLEVBQUMsQ0FBQztRQUNMLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBQ0Qsd0NBQXdDOzs7Ozs7SUFDeEMsOENBQWdCOzs7OztJQUFoQixVQUFpQixJQUFVO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pDLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMzQyxPQUFPO1NBQ1I7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCx5Q0FBeUM7Ozs7OztJQUN6QywrQ0FBaUI7Ozs7O0lBQWpCLFVBQWtCLElBQVU7UUFBNUIsaUJBY0M7UUFiQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN6QixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjtRQUNELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ3BDLEdBQUc7Ozs7UUFBQyxVQUFBLEdBQUc7WUFDTCxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNSLEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO29CQUN4QixJQUFJLEVBQUUsSUFBSTtvQkFDVixLQUFLLEVBQUUsbUJBQW1CLENBQUMsZUFBZTtpQkFDM0MsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUNELHdDQUF3Qzs7Ozs7OztJQUN4Qyw2Q0FBZTs7Ozs7O0lBQWYsVUFBZ0IsSUFBVSxFQUFFLEtBQUs7O1lBQ3pCLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuQyxJQUFJLElBQUksS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUMxQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQzFCO1NBQ0Y7YUFBTTtZQUNMLHVGQUF1RjtZQUN2RixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNyQjtTQUNGO0lBQ0gsQ0FBQztJQUNELHlFQUF5RTs7Ozs7O0lBQ3pFLCtDQUFpQjs7Ozs7SUFBakIsVUFBa0IsSUFBSTtRQUNwQixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN6RCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDeEIsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsS0FBSyxFQUFFLG1CQUFtQixDQUFDLFVBQVU7YUFDdEMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFDRCwrQkFBK0I7Ozs7OztJQUMvQixpREFBbUI7Ozs7O0lBQW5CLFVBQW9CLEtBQWE7UUFDL0IsSUFDRSxDQUFDLElBQUksQ0FBQyxZQUFZO1lBQ2xCLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFDckQ7WUFDQSxPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDeEIsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsS0FBSyxFQUFFLG1CQUFtQixDQUFDLFlBQVk7YUFDeEMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7SUFDRCxzQkFBc0I7Ozs7OztJQUN0QixxQ0FBTzs7Ozs7SUFBUCxVQUFRLEtBQWtCO1FBQTFCLGlCQWlCQzs7UUFoQkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7O1lBRXhFLEtBQTBCLElBQUEsS0FBQSxpQkFBQSxLQUFLLENBQUMsS0FBSyxDQUFBLGdCQUFBLDRCQUFFO2dCQUFsQyxJQUFNLFdBQVcsV0FBQTtnQkFDcEIsZ0JBQWdCO2dCQUNoQixJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFOzt3QkFDMUIsU0FBUyxHQUFHLG1CQUFBLFdBQVcsQ0FBQyxTQUFTLEVBQXVCO29CQUM5RCxTQUFTLENBQUMsSUFBSTs7OztvQkFBQyxVQUFDLElBQVU7d0JBQ3hCLEtBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzlDLENBQUMsRUFBQyxDQUFDO2lCQUNKO3FCQUFNOzs7d0JBRUMsU0FBUyxHQUFHLG1CQUFBLFdBQVcsQ0FBQyxTQUFTLEVBQTRCO29CQUNuRSxvREFBb0Q7aUJBQ3JEO2FBQ0Y7Ozs7Ozs7OztRQUNELElBQUksQ0FBQyxzQ0FBc0MsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFRCx3REFBd0Q7Ozs7Ozs7SUFDeEQsc0NBQVE7Ozs7OztJQUFSLFVBQVMsSUFBVSxFQUFFLFFBQW9CO1FBQXBCLHlCQUFBLEVBQUEsV0FBVyxJQUFJLENBQUMsSUFBSTtRQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxtQ0FBbUM7Ozs7OztJQUNuQyx5Q0FBVzs7Ozs7SUFBWCxVQUFZLElBQVU7UUFDcEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVELHdDQUFVOzs7O0lBQVYsVUFBVyxJQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELDhCQUE4Qjs7Ozs7O0lBQzlCLDBDQUFZOzs7OztJQUFaLFVBQWEsV0FBNkI7UUFDeEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQztRQUNwQyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0Qsb0NBQW9DOzs7Ozs7SUFDcEMsZ0RBQWtCOzs7OztJQUFsQixVQUFtQixJQUFzQjtRQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTs7OztRQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxLQUFLLElBQUksRUFBVixDQUFVLEVBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsd0RBQXdEOzs7Ozs7SUFDeEQsNkNBQWU7Ozs7O0lBQWYsVUFBZ0IsUUFBMEI7UUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELHdEQUF3RDs7Ozs7O0lBQ3hELDBDQUFZOzs7OztJQUFaLFVBQWEsRUFBcUI7UUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELCtCQUErQjs7Ozs7OztJQUMvQiw4Q0FBZ0I7Ozs7OztJQUFoQixVQUFpQixJQUFVLEVBQUUsUUFBZ0I7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFBQyxPQUFPLElBQUksQ0FBQztTQUFFOztZQUNuQyxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUU7O1lBQ3JDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBakIsQ0FBaUIsRUFBQztRQUN4RSxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDMUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxtQkFBbUIsQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO1lBQy9FLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0QsdURBQXVEOzs7Ozs7O0lBQ3ZELHlDQUFXOzs7Ozs7SUFBWCxVQUFZLElBQVUsRUFBRSxJQUFZOzs7OztZQUU1QixHQUFHLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7O1lBQzlDLGVBQXdCOztZQUN4QixvQkFBNkI7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDckUsZUFBZSxHQUFHLElBQUksQ0FBQztTQUN4QjthQUFNO1lBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hCLElBQUksRUFBRSxJQUFJO2dCQUNWLEtBQUssRUFBRSxtQkFBbUIsQ0FBQyxXQUFXO2FBQ3ZDLENBQUMsQ0FBQztTQUNKOzs7OztZQUVLLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSzthQUN6QixHQUFHOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBWCxDQUFXLEVBQUM7YUFDckIsTUFBTTs7Ozs7UUFBQyxVQUFDLEdBQUcsRUFBRSxJQUFJLElBQUssT0FBQSxHQUFHLEdBQUcsSUFBSSxFQUFWLENBQVUsR0FBRSxDQUFDLENBQUM7UUFDdkMsSUFDRSxDQUFDLElBQUksQ0FBQyxZQUFZO1lBQ2xCLENBQUMsSUFBSSxDQUFDLFlBQVk7Z0JBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQzNEO1lBQ0Esb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1NBQzdCO2FBQU07WUFDTCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDeEIsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsS0FBSyxFQUFFLG1CQUFtQixDQUFDLFlBQVk7YUFDeEMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLENBQUMsQ0FBQyxlQUFlLElBQUksb0JBQW9CLENBQUM7SUFDbkQsQ0FBQzs7Ozs7SUFDRCxzQ0FBUTs7OztJQUFSLFVBQVMsSUFBSTtRQUNYLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUNwQyxDQUFDO0lBQ0QsaUNBQWlDOzs7OztJQUNqQywwQ0FBWTs7OztJQUFaO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNELHdCQUF3Qjs7Ozs7O0lBQ3hCLDBDQUFZOzs7OztJQUFaLFVBQWEsSUFBVTtRQUNyQixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTztTQUNSO1FBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFNLElBQUksRUFBQSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFNLElBQUksRUFBQSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6RDtRQUNELElBQUksQ0FBQyxZQUFZLENBQUM7WUFDaEIsSUFBSSxFQUFFLG1CQUFBLElBQUksRUFBUTtZQUNsQixRQUFRLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUk7U0FDdkMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCx3Q0FBVTs7OztJQUFWLFVBQVcsUUFBMEI7UUFBckMsaUJBUUM7UUFQQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUzs7OztZQUFDLFVBQUEsR0FBRztnQkFDN0MsS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqQyxDQUFDLEVBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBQ0Qsd0RBQXdEOzs7Ozs7SUFDeEQsNkNBQWU7Ozs7O0lBQWYsVUFBZ0IsUUFBMEI7UUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBRUQsMENBQVk7Ozs7SUFBWixVQUFhLEtBQXdCO1FBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7O0lBRUQseUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELDZDQUFlOzs7SUFBZjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2hCLElBQUksRUFBRSxJQUFJLENBQUMsa0JBQWtCO1lBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSTtTQUN2QyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVPLG9FQUFzQzs7OztJQUE5QztRQUFBLGlCQVNDO1FBUkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUMvRDthQUFNO1lBQ0wsVUFBVTs7O1lBQUM7Z0JBQ1QsS0FBSSxDQUFDLHNDQUFzQyxFQUFFLENBQUM7WUFDaEQsQ0FBQyxHQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUM7O2dCQXJYRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsZzdGQUEyQztvQkFFM0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFwQ1EsaUJBQWlCO2dCQUVDLGlCQUFpQjs7O2dDQXFDekMsTUFBTTs2QkFFTixNQUFNO2dDQUVOLE1BQU07a0NBRU4sTUFBTTs0QkFFTixNQUFNO2tDQUVOLEtBQUs7Z0NBRUwsS0FBSztvQ0FHTCxLQUFLO3VDQUVMLEtBQUs7K0JBRUwsS0FBSzs2QkFFTCxLQUFLOzhCQUdMLEtBQUs7K0JBR0wsS0FBSzsrQkFHTCxLQUFLO3lCQUdMLEtBQUs7aUNBSUwsS0FBSztpQ0FHTCxLQUFLOzBCQU1MLEtBQUs7bUNBR0wsS0FBSzsyQkFFTCxLQUFLOztJQTJUUiwwQkFBQztDQUFBLEFBdFhELElBc1hDO1NBaFhZLG1CQUFtQjs7Ozs7O0lBRTlCLDRDQUErRDs7Ozs7SUFFL0QseUNBQTZEOzs7OztJQUU3RCw0Q0FBK0Q7Ozs7O0lBRS9ELDhDQUFnRTs7Ozs7SUFFaEUsd0NBQTJEOzs7OztJQUUzRCw4Q0FBOEQ7Ozs7O0lBRTlELDRDQUNzQjs7Ozs7SUFFdEIsZ0RBQWtDOzs7OztJQUVsQyxtREFBcUM7Ozs7O0lBRXJDLDJDQUF3Qzs7Ozs7SUFFeEMseUNBQ3FCOzs7OztJQUVyQiwwQ0FDb0I7Ozs7O0lBRXBCLDJDQUNxQjs7Ozs7SUFFckIsMkNBQ3FCOzs7OztJQUVyQixxQ0FDZTs7SUFDZixvQ0FBK0I7Ozs7O0lBRS9CLDZDQUFrQzs7SUFDbEMsc0NBQWE7Ozs7O0lBRWIsNkNBQXdDOzs7OztJQUV4Qyw4Q0FBNkI7Ozs7O0lBRTdCLGlEQUF5Qjs7Ozs7SUFFekIsc0NBQzJCOzs7OztJQUUzQiwrQ0FBNEM7Ozs7O0lBRTVDLHVDQUFvQzs7Ozs7SUFFcEMsd0NBQTRCOztJQUM1QiwwQ0FBOEM7O0lBQzlDLDBDQUFrQzs7SUFFbEMsMkNBQW1COztJQUNuQiw2Q0FBdUI7Ozs7O0lBRXZCLDhDQUFrRDs7Ozs7SUFHaEQsMENBQXNDOzs7OztJQUN0QyxrQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWxlUGlja2VyU2VydmljZSB9IGZyb20gJy4vZmlsZS1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTYWZlUmVzb3VyY2VVcmwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEZpbGVQcmV2aWV3TW9kZWwgfSBmcm9tICcuL2ZpbGUtcHJldmlldy5tb2RlbCc7XG5pbXBvcnQgeyBnZXRGaWxlVHlwZSB9IGZyb20gJy4vZmlsZS11cGxvYWQudXRpbHMnO1xuaW1wb3J0IHsgRmlsZVZhbGlkYXRpb25UeXBlcywgVmFsaWRhdGlvbkVycm9yIH0gZnJvbSAnLi92YWxpZGF0aW9uLWVycm9yLm1vZGVsJztcbmltcG9ydCB7IEZpbGVQaWNrZXJBZGFwdGVyIH0gZnJvbSAnLi9maWxlLXBpY2tlci5hZGFwdGVyJztcbmltcG9ydCB7XG4gIEZpbGVTeXN0ZW1EaXJlY3RvcnlFbnRyeSxcbiAgRmlsZVN5c3RlbUZpbGVFbnRyeSxcbiAgVXBsb2FkRXZlbnRcbn0gZnJvbSAnLi9maWxlLWRyb3AnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFrZVVudGlsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEZWZhdWx0Q2FwdGlvbnMgfSBmcm9tICcuL2RlZmF1bHQtY2FwdGlvbnMnO1xuaW1wb3J0IHsgVXBsb2FkZXJDYXB0aW9ucyB9IGZyb20gJy4vdXBsb2FkZXItY2FwdGlvbnMnO1xuaW1wb3J0IHsgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge2Jhc2U2NFRvRmlsZSwgSW1hZ2VDcm9wcGVkRXZlbnR9IGZyb20gJ25neC1pbWFnZS1jcm9wcGVyJztcbmltcG9ydCB7RmlsZURyb3BwaW5nUHJvY2Vzc01vZGVsfSBmcm9tICcuL2ZpbGUtZHJvcHBpbmctcHJvY2Vzcy5tb2RlbCc7XG5pbXBvcnQge0Nyb3BwZXJPcHRpb25zLCBDcm9wcGVyT3B0aW9uc01vZGVsfSBmcm9tICcuL2Nyb3BwZXItb3B0aW9ucy5tb2RlbCc7XG5cbi8vIGRlY2xhcmUgdmFyIENyb3BwZXI7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtZmlsZS1waWNrZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vZmlsZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9maWxlLXBpY2tlci5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBGaWxlUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKiogRW1pdHRlZCB3aGVuIGZpbGUgdXBsb2FkIHZpYSBhcGkgc3VjY2Vzc2Z1bGx5LiBFbWl0dGVkIGZvciBldmVyeSBmaWxlICovXG4gIEBPdXRwdXQoKSB1cGxvYWRTdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlUHJldmlld01vZGVsPigpO1xuICAvKiogRW1pdHRlZCB3aGVuIGZpbGUgdXBsb2FkIHZpYSBhcGkgZmFpbGVkLiBFbWl0dGVkIGZvciBldmVyeSBmaWxlICovXG4gIEBPdXRwdXQoKSB1cGxvYWRGYWlsID0gbmV3IEV2ZW50RW1pdHRlcjxIdHRwRXJyb3JSZXNwb25zZT4oKTtcbiAgLyoqIEVtaXR0ZWQgd2hlbiBmaWxlIGlzIHJlbW92ZWQgdmlhIGFwaSBzdWNjZXNzZnVsbHkuIEVtaXR0ZWQgZm9yIGV2ZXJ5IGZpbGUgKi9cbiAgQE91dHB1dCgpIHJlbW92ZVN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVQcmV2aWV3TW9kZWw+KCk7XG4gIC8qKiBFbWl0dGVkIG9uIGZpbGUgdmFsaWRhdGlvbiBmYWlsICovXG4gIEBPdXRwdXQoKSB2YWxpZGF0aW9uRXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPFZhbGlkYXRpb25FcnJvcj4oKTtcbiAgLyoqIEVtaXR0ZWQgd2hlbiBmaWxlIGlzIGFkZGVkIGFuZCBwYXNzZWQgdmFsaWRhdGlvbnMuIE5vdCB1cGxvYWRlZCB5ZXQgKi9cbiAgQE91dHB1dCgpIGZpbGVBZGRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVByZXZpZXdNb2RlbD4oKTtcbiAgLyoqIEN1c3RvbSB2YWxpZGF0b3IgZnVuY3Rpb24gKi9cbiAgQElucHV0KCkgY3VzdG9tVmFsaWRhdG9yOiAoZmlsZTogRmlsZSkgPT4gT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgLyoqIFdoZXRoZXIgdG8gZW5hYmxlIGNyb3BwZXIuIERlZmF1bHQ6IGRpc2FibGVkICovXG4gIEBJbnB1dCgpXG4gIGVuYWJsZUNyb3BwZXIgPSBmYWxzZTtcbiAgLyoqIFdoZXRoZXIgdG8gc2hvdyBkZWZhdWx0IGRyYWcgYW5kIGRyb3Agem9uZS4gRGVmYXVsdDp0cnVlICovXG4gIEBJbnB1dCgpIHNob3dlRHJhZ0Ryb3Bab25lID0gdHJ1ZTtcbiAgLyoqIFdoZXRoZXIgdG8gc2hvdyBkZWZhdWx0IGZpbGVzIHByZXZpZXcgY29udGFpbmVyLiBEZWZhdWx0OiB0cnVlICovXG4gIEBJbnB1dCgpIHNob3dQcmV2aWV3Q29udGFpbmVyID0gdHJ1ZTtcbiAgLyoqIFByZXZpZXcgSXRlbSB0ZW1wbGF0ZSAqL1xuICBASW5wdXQoKSBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIC8qKiBTaW5nbGUgb3IgbXVsdGlwbGUuIERlZmF1bHQ6IG11bHRpICovXG4gIEBJbnB1dCgpXG4gIHVwbG9hZFR5cGUgPSAnbXVsdGknO1xuICAvKiogTWF4IHNpemUgb2Ygc2VsZWN0ZWQgZmlsZSBpbiBNQi4gRGVmYXVsdDogbm8gbGltaXQgKi9cbiAgQElucHV0KClcbiAgZmlsZU1heFNpemU6IG51bWJlcjtcbiAgLyoqIE1heCBjb3VudCBvZiBmaWxlIGluIG11bHRpLXVwbG9hZC4gRGVmYXVsdDogbm8gbGltaXQgKi9cbiAgQElucHV0KClcbiAgZmlsZU1heENvdW50OiBudW1iZXI7XG4gIC8qKiBUb3RhbCBNYXggc2l6ZSBsaW1pdCBvZiBhbGwgZmlsZXMgaW4gTUIuIERlZmF1bHQ6IG5vIGxpbWl0ICovXG4gIEBJbnB1dCgpXG4gIHRvdGFsTWF4U2l6ZTogbnVtYmVyO1xuICAvKiogV2hpY2ggZmlsZSB0eXBlcyB0byBzaG93IG9uIGNob29zZSBmaWxlIGRpYWxvZy4gRGVmYXVsdDogc2hvdyBhbGwgKi9cbiAgQElucHV0KClcbiAgYWNjZXB0OiBzdHJpbmc7XG4gIGZpbGVzOiBGaWxlUHJldmlld01vZGVsW10gPSBbXTtcbiAgLyoqIEZpbGUgZXh0ZW5zaW9ucyBmaWx0ZXIgKi9cbiAgQElucHV0KCkgZmlsZUV4dGVuc2lvbnM6IFN0cmluZ1tdO1xuICBjcm9wcGVyOiBhbnk7XG4gIC8qKiBDcm9wcGVyIG9wdGlvbnMuICovXG4gIEBJbnB1dCgpIGNyb3BwZXJPcHRpb25zOiBDcm9wcGVyT3B0aW9ucztcbiAgLyoqIEZpbGVzIGFycmF5IGZvciBjcm9wcGVyLiBXaWxsIGJlIHNob3duIGVxdWVudGlhbGx5IGlmIGNyb3AgZW5hYmxlZCAqL1xuICBmaWxlc0ZvckNyb3BwZXI6IEZpbGVbXSA9IFtdO1xuICAvKiogQ3VycmVudCBmaWxlIHRvIGJlIHNob3duIGluIGNyb3BwZXIqL1xuICBjdXJyZW50Q3JvcHBlckZpbGU6IEZpbGU7XG4gIC8qKiBDdXN0b20gYXBpIEFkYXB0ZXIgZm9yIHVwbG9hZGluZy9yZW1vdmluZyBmaWxlcyAqL1xuICBASW5wdXQoKVxuICBhZGFwdGVyOiBGaWxlUGlja2VyQWRhcHRlcjtcbiAgLyoqICBDdXN0b21lIHRlbXBsYXRlIGZvciBkcm9wem9uZSAqL1xuICBASW5wdXQoKSBkcm9wem9uZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAvKiogQ3VzdG9tIGNhcHRpb25zIGlucHV0LiBVc2VkIGZvciBtdWx0aSBsYW5ndWFnZSBzdXBwb3J0ICovXG4gIEBJbnB1dCgpIGNhcHRpb25zOiBVcGxvYWRlckNhcHRpb25zO1xuICAvKiogY2FwdGlvbnMgb2JqZWN0Ki9cbiAgX2NhcHRpb25zOiBVcGxvYWRlckNhcHRpb25zO1xuICBjcm9wQ2xvc2VkJCA9IG5ldyBTdWJqZWN0PEZpbGVQcmV2aWV3TW9kZWw+KCk7XG4gIF9vbkRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjcm9wcGVkSW1hZ2U6IEJsb2I7XG4gIGNyb3BwZXJJc1JlYWR5ID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBkcm9wcGluZ1Byb2Nlc3M6IEZpbGVEcm9wcGluZ1Byb2Nlc3NNb2RlbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZpbGVTZXJ2aWNlOiBGaWxlUGlja2VyU2VydmljZSxcbiAgICBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2V0Q3JvcHBlck9wdGlvbnMoKTtcbiAgICB0aGlzLmxpc3RlblRvQ3JvcENsb3NlKCk7XG4gICAgdGhpcy5zZXRDYXB0aW9ucygpO1xuICB9XG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX29uRGVzdHJveSQubmV4dCgpO1xuICB9XG4gIHNldENhcHRpb25zKCkge1xuICAgIHRoaXMuX2NhcHRpb25zID0gdGhpcy5jYXB0aW9ucyB8fCBEZWZhdWx0Q2FwdGlvbnM7XG4gIH1cbiAgLyoqIExpc3RlbiB3aGVuIENyb3BwZXIgaXMgY2xvc2VkIGFuZCBvcGVuIG5ldyBjcm9wcGVyIGlmIG5leHQgaW1hZ2UgZXhpc3RzICovXG4gIGxpc3RlblRvQ3JvcENsb3NlKCkge1xuICAgIHRoaXMuY3JvcENsb3NlZCRcbiAgICAgIC8vIC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKHJlczogRmlsZVByZXZpZXdNb2RlbCkgPT4ge1xuICAgICAgICBjb25zdCBjcm9wcGVkSW5kZXggPSB0aGlzLmZpbGVzRm9yQ3JvcHBlci5maW5kSW5kZXgoXG4gICAgICAgICAgaXRlbSA9PiBpdGVtLm5hbWUgPT09IHJlcy5maWxlTmFtZVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBuZXh0RmlsZSA9XG4gICAgICAgICAgY3JvcHBlZEluZGV4ICE9PSAtMVxuICAgICAgICAgICAgPyB0aGlzLmZpbGVzRm9yQ3JvcHBlcltjcm9wcGVkSW5kZXggKyAxXVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIC8vICBjb25zb2xlLmxvZygnY3JvcHBlZCcsIHJlcyk7XG4gICAgICAgIHRoaXMuZmlsZXNGb3JDcm9wcGVyID0gWy4uLnRoaXMuZmlsZXNGb3JDcm9wcGVyXS5maWx0ZXIoXG4gICAgICAgICAgaXRlbSA9PiBpdGVtLm5hbWUgIT09IHJlcy5maWxlTmFtZVxuICAgICAgICApO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmZpbGVzRm9yQ3JvcHBlcik7XG4gICAgICAgIGlmIChuZXh0RmlsZSkge1xuICAgICAgICAgIHRoaXMub3BlbkNyb3BwZXIobmV4dEZpbGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKiBTZXRzIGN1c3RvbSBjcm9wcGVyIG9wdGlvbnMgaWYgYXZhaWFibGUgKi9cbiAgc2V0Q3JvcHBlck9wdGlvbnMoKSB7XG4gICAgdGhpcy5jcm9wcGVyT3B0aW9ucyA9IHRoaXMuY3JvcHBlck9wdGlvbnMgPT09IHVuZGVmaW5lZCA/IG5ldyBDcm9wcGVyT3B0aW9uc01vZGVsKHt9KSA6IG5ldyBDcm9wcGVyT3B0aW9uc01vZGVsKHRoaXMuY3JvcHBlck9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIE9uIGlucHV0IGZpbGUgc2VsZWN0ZWQgKi9cbiAgb25DaGFuZ2UoZmlsZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgY29uc3QgZmlsZXM6IEZpbGVbXSA9IEFycmF5LmZyb20oZmlsZUlucHV0LmZpbGVzKTtcbiAgICB0aGlzLmhhbmRsZUZpbGVzKGZpbGVzKS5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGlucHV0IGFuZCBkcmFnL2Ryb3AgZmlsZXMgKi9cbiAgaGFuZGxlRmlsZXMoZmlsZXM6IEZpbGVbXSk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkTWF4RmlsZUNvdW50KGZpbGVzKSkge1xuICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgIH1cbiAgICBjb25zdCBpc1ZhbGlkVXBsb2FkU3luYyA9IGZpbGVzLmV2ZXJ5KGl0ZW0gPT4gdGhpcy52YWxpZGF0ZUZpbGVTeW5jKGl0ZW0pKTtcbiAgICBjb25zdCBhc3luY0Z1bmN0aW9ucyA9IGZpbGVzLm1hcChpdGVtID0+IHRoaXMudmFsaWRhdGVGaWxlQXN5bmMoaXRlbSkpO1xuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoLi4uYXN5bmNGdW5jdGlvbnMpLnBpcGUoXG4gICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgY29uc3QgaXNWYWxpZFVwbG9hZEFzeW5jID0gcmVzLmV2ZXJ5KHJlc3VsdCA9PiByZXN1bHQgPT09IHRydWUpO1xuICAgICAgICBpZiAoIWlzVmFsaWRVcGxvYWRTeW5jIHx8ICFpc1ZhbGlkVXBsb2FkQXN5bmMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZTogRmlsZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIHRoaXMuaGFuZGxlSW5wdXRGaWxlKGZpbGUsIGluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgLyoqIFZhbGlkYXRlcyBzeW5jaHJvbm91cyB2YWxpZGF0aW9ucyAqL1xuICB2YWxpZGF0ZUZpbGVTeW5jKGZpbGU6IEZpbGUpOiBib29sZWFuIHtcbiAgICBpZiAoIWZpbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzVmFsaWRVcGxvYWRUeXBlKGZpbGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGhpcy5pc1ZhbGlkRXh0ZW5zaW9uKGZpbGUsIGZpbGUubmFtZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgLyoqIFZhbGlkYXRlcyBhc3luY2hyb25vdXMgdmFsaWRhdGlvbnMgKi9cbiAgdmFsaWRhdGVGaWxlQXN5bmMoZmlsZTogRmlsZSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGlmICghdGhpcy5jdXN0b21WYWxpZGF0b3IpIHtcbiAgICAgIHJldHVybiBvZih0cnVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3VzdG9tVmFsaWRhdG9yKGZpbGUpLnBpcGUoXG4gICAgICB0YXAocmVzID0+IHtcbiAgICAgICAgaWYgKCFyZXMpIHtcbiAgICAgICAgICB0aGlzLnZhbGlkYXRpb25FcnJvci5uZXh0KHtcbiAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICBlcnJvcjogRmlsZVZhbGlkYXRpb25UeXBlcy5jdXN0b21WYWxpZGF0b3JcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIC8qKiBIYW5kbGVzIGlucHV0IGFuZCBkcmFnJmRyb3AgZmlsZXMgKi9cbiAgaGFuZGxlSW5wdXRGaWxlKGZpbGU6IEZpbGUsIGluZGV4KTogdm9pZCB7XG4gICAgY29uc3QgdHlwZSA9IGdldEZpbGVUeXBlKGZpbGUudHlwZSk7XG4gICAgaWYgKHR5cGUgPT09ICdpbWFnZScgJiYgdGhpcy5lbmFibGVDcm9wcGVyKSB7XG4gICAgICB0aGlzLmZpbGVzRm9yQ3JvcHBlci5wdXNoKGZpbGUpO1xuICAgICAgaWYgKCF0aGlzLmN1cnJlbnRDcm9wcGVyRmlsZSkge1xuICAgICAgICB0aGlzLm9wZW5Dcm9wcGVyKGZpbGUpO1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8qKiBTaXplIGlzIG5vdCBpbml0aWFsbHkgY2hlY2tlZCBvbiBoYW5kbGVJbnB1dEZpbGVzIGJlY2F1c2Ugb2YgY3JvcHBlciBzaXplIGNoYW5nZSAqL1xuICAgICAgaWYgKHRoaXMuaXNWYWxpZFNpemUoZmlsZSwgZmlsZS5zaXplKSkge1xuICAgICAgICB0aGlzLnB1c2hGaWxlKGZpbGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvKiogVmFsaWRhdGVzIGlmIHVwbG9hZCB0eXBlIGlzIHNpbmdsZSBzbyBhbm90aGVyIGZpbGUgY2Fubm90IGJlIGFkZGVkICovXG4gIGlzVmFsaWRVcGxvYWRUeXBlKGZpbGUpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy51cGxvYWRUeXBlID09PSAnc2luZ2xlJyAmJiB0aGlzLmZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yLm5leHQoe1xuICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICBlcnJvcjogRmlsZVZhbGlkYXRpb25UeXBlcy51cGxvYWRUeXBlXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIC8qKiBWYWxpZGF0ZXMgbWF4IGZpbGUgY291bnQgKi9cbiAgaXNWYWxpZE1heEZpbGVDb3VudChmaWxlczogRmlsZVtdKTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgIXRoaXMuZmlsZU1heENvdW50IHx8XG4gICAgICB0aGlzLmZpbGVNYXhDb3VudCA+PSB0aGlzLmZpbGVzLmxlbmd0aCArIGZpbGVzLmxlbmd0aFxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yLm5leHQoe1xuICAgICAgICBmaWxlOiBudWxsLFxuICAgICAgICBlcnJvcjogRmlsZVZhbGlkYXRpb25UeXBlcy5maWxlTWF4Q291bnRcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICAvKiogT24gZmlsZSBkcm9wcGVkICovXG4gIGRyb3BwZWQoZXZlbnQ6IFVwbG9hZEV2ZW50KSB7XG4gICAgdGhpcy5kcm9wcGluZ1Byb2Nlc3MgPSBuZXcgRmlsZURyb3BwaW5nUHJvY2Vzc01vZGVsKGV2ZW50LmZpbGVzLmxlbmd0aCk7XG5cbiAgICBmb3IgKGNvbnN0IGRyb3BwZWRGaWxlIG9mIGV2ZW50LmZpbGVzKSB7XG4gICAgICAvLyBJcyBpdCBhIGZpbGU/XG4gICAgICBpZiAoZHJvcHBlZEZpbGUuZmlsZUVudHJ5LmlzRmlsZSkge1xuICAgICAgICBjb25zdCBmaWxlRW50cnkgPSBkcm9wcGVkRmlsZS5maWxlRW50cnkgYXMgRmlsZVN5c3RlbUZpbGVFbnRyeTtcbiAgICAgICAgZmlsZUVudHJ5LmZpbGUoKGZpbGU6IEZpbGUpID0+IHtcbiAgICAgICAgICB0aGlzLmRyb3BwaW5nUHJvY2Vzcy5hZGRGaWxlRm9yVXBsb2FkKGZpbGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEl0IHdhcyBhIGRpcmVjdG9yeSAoZW1wdHkgZGlyZWN0b3JpZXMgYXJlIGFkZGVkLCBvdGhlcndpc2Ugb25seSBmaWxlcylcbiAgICAgICAgY29uc3QgZmlsZUVudHJ5ID0gZHJvcHBlZEZpbGUuZmlsZUVudHJ5IGFzIEZpbGVTeXN0ZW1EaXJlY3RvcnlFbnRyeTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZHJvcHBlZEZpbGUucmVsYXRpdmVQYXRoLCBmaWxlRW50cnkpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmhhbmRsZUZpbGVzSWZEcm9wcGluZ1Byb2Nlc3NJc0ZpbmlzaGVkKCk7XG4gIH1cblxuICAvKiogQWRkIGZpbGUgdG8gZmlsZSBsaXN0IGFmdGVyIHN1Y2Nlc2Z1bGwgdmFsaWRhdGlvbiAqL1xuICBwdXNoRmlsZShmaWxlOiBGaWxlLCBmaWxlTmFtZSA9IGZpbGUubmFtZSk6IHZvaWQge1xuICAgIHRoaXMuZmlsZXMucHVzaCh7IGZpbGU6IGZpbGUsIGZpbGVOYW1lOiBmaWxlTmFtZSB9KTtcbiAgICB0aGlzLmZpbGVBZGRlZC5uZXh0KHsgZmlsZTogZmlsZSwgZmlsZU5hbWU6IGZpbGVOYW1lIH0pO1xuICB9XG5cbiAgLyoqIE9wZW5zIGNyb3BwZXIgZm9yIGltYWdlIGNyb3AgKi9cbiAgb3BlbkNyb3BwZXIoZmlsZTogRmlsZSk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudENyb3BwZXJGaWxlID0gZmlsZTtcbiAgfVxuXG4gIGdldFNhZmVVcmwoZmlsZTogRmlsZSk6IFNhZmVSZXNvdXJjZVVybCB7XG4gICAgcmV0dXJuIHRoaXMuZmlsZVNlcnZpY2UuY3JlYXRlU2FmZVVybChmaWxlKTtcbiAgfVxuXG4gIC8qKiBDbG9zZSBvciBjYW5jZWwgY3JvcHBlciAqL1xuICBjbG9zZUNyb3BwZXIoZmlsZVByZXZpZXc6IEZpbGVQcmV2aWV3TW9kZWwpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRDcm9wcGVyRmlsZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNyb3BwZXJJc1JlYWR5ID0gZmFsc2U7XG4gICAgdGhpcy5jcm9wQ2xvc2VkJC5uZXh0KGZpbGVQcmV2aWV3KTtcbiAgfVxuICAvKiogUmVtb3ZlcyBmaWxlcyBmcm9tIGZpbGVzIGxpc3QgKi9cbiAgcmVtb3ZlRmlsZUZyb21MaXN0KGZpbGU6IEZpbGVQcmV2aWV3TW9kZWwpOiB2b2lkIHtcbiAgICB0aGlzLmZpbGVzID0gdGhpcy5maWxlcy5maWx0ZXIoZiA9PiBmICE9PSBmaWxlKTtcbiAgfVxuXG4gIC8qKiBFbWl0cyBldmVudCB3aGVuIGZpbGUgdXBsb2FkIGFwaSByZXR1cm5zIHN1Y2Nlc3MgICovXG4gIG9uVXBsb2FkU3VjY2VzcyhmaWxlSXRlbTogRmlsZVByZXZpZXdNb2RlbCk6IHZvaWQge1xuICAgIHRoaXMudXBsb2FkU3VjY2Vzcy5uZXh0KGZpbGVJdGVtKTtcbiAgfVxuXG4gIC8qKiBFbWl0cyBldmVudCB3aGVuIGZpbGUgdXBsb2FkIGFwaSByZXR1cm5zIGZhaWx1cmUgICovXG4gIG9uVXBsb2FkRmFpbChlcjogSHR0cEVycm9yUmVzcG9uc2UpOiB2b2lkIHtcbiAgICB0aGlzLnVwbG9hZEZhaWwubmV4dChlcik7XG4gIH1cblxuICAvKiogVmFsaWRhdGVzIGZpbGUgZXh0ZW5zaW9uICovXG4gIGlzVmFsaWRFeHRlbnNpb24oZmlsZTogRmlsZSwgZmlsZU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgaWYgKCF0aGlzLmZpbGVFeHRlbnNpb25zKSB7cmV0dXJuIHRydWU7IH1cbiAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IGZpbGVOYW1lLnNwbGl0KCcuJykucG9wKCk7XG4gICAgICBjb25zdCBmaWxlRXh0ZW5zaW9ucyA9IHRoaXMuZmlsZUV4dGVuc2lvbnMubWFwKGV4dCA9PiBleHQudG9Mb3dlckNhc2UoKSk7XG4gICAgICBpZiAoZmlsZUV4dGVuc2lvbnMuaW5kZXhPZihleHRlbnNpb24udG9Mb3dlckNhc2UoKSkgPT09IC0xKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yLm5leHQoe2ZpbGU6IGZpbGUsIGVycm9yOiBGaWxlVmFsaWRhdGlvblR5cGVzLmV4dGVuc2lvbnN9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICAvKiogVmFsaWRhdGVzIHNlbGVjdGVkIGZpbGUgc2l6ZSBhbmQgdG90YWwgZmlsZSBzaXplICovXG4gIGlzVmFsaWRTaXplKGZpbGU6IEZpbGUsIHNpemU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIC8qKiBWYWxpZGF0aW5nIHNlbGVjdGVkIGZpbGUgc2l6ZSAqL1xuICAgIGNvbnN0IHJlczogbnVtYmVyID0gdGhpcy5iaXRzVG9NYihzaXplLnRvU3RyaW5nKCkpO1xuICAgIGxldCBpc1ZhbGlkRmlsZVNpemU6IGJvb2xlYW47XG4gICAgbGV0IGlzVmFsaWRUb3RhbEZpbGVTaXplOiBib29sZWFuO1xuICAgIGlmICghdGhpcy5maWxlTWF4U2l6ZSB8fCAodGhpcy5maWxlTWF4U2l6ZSAmJiByZXMgPCB0aGlzLmZpbGVNYXhTaXplKSkge1xuICAgICAgaXNWYWxpZEZpbGVTaXplID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3IubmV4dCh7XG4gICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgIGVycm9yOiBGaWxlVmFsaWRhdGlvblR5cGVzLmZpbGVNYXhTaXplXG4gICAgICB9KTtcbiAgICB9XG4gICAgLyoqIFZhbGlkYXRpbmcgVG90YWwgRmlsZXMgU2l6ZSAqL1xuICAgIGNvbnN0IHRvdGFsQml0cyA9IHRoaXMuZmlsZXNcbiAgICAgIC5tYXAoZiA9PiBmLmZpbGUuc2l6ZSlcbiAgICAgIC5yZWR1Y2UoKGFjYywgY3VycikgPT4gYWNjICsgY3VyciwgMCk7XG4gICAgaWYgKFxuICAgICAgIXRoaXMudG90YWxNYXhTaXplIHx8XG4gICAgICAodGhpcy50b3RhbE1heFNpemUgJiZcbiAgICAgICAgdGhpcy5iaXRzVG9NYih0b3RhbEJpdHMgKyBmaWxlLnNpemUpIDwgdGhpcy50b3RhbE1heFNpemUpXG4gICAgKSB7XG4gICAgICBpc1ZhbGlkVG90YWxGaWxlU2l6ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yLm5leHQoe1xuICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICBlcnJvcjogRmlsZVZhbGlkYXRpb25UeXBlcy50b3RhbE1heFNpemVcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gISFpc1ZhbGlkRmlsZVNpemUgJiYgaXNWYWxpZFRvdGFsRmlsZVNpemU7XG4gIH1cbiAgYml0c1RvTWIoc2l6ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc2l6ZSkgLyAxMDQ4NTc2O1xuICB9XG4gIC8qKiB3aGVuIGNyb3AgYnV0dG9uIHN1Ym1pdHRlZCAqL1xuICBvbkNyb3BTdWJtaXQoKTogdm9pZCB7XG4gICAgdGhpcy5ibG9iRmFsbEJhY2sodGhpcy5jcm9wcGVkSW1hZ2UpO1xuICB9XG4gIC8qKiBBZnRlciBjcm9wIHN1Ym1pdCAqL1xuICBibG9iRmFsbEJhY2soYmxvYjogQmxvYik6IHZvaWQge1xuICAgIGlmICghYmxvYikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc1ZhbGlkU2l6ZSg8RmlsZT5ibG9iLCBibG9iLnNpemUpKSB7XG4gICAgICB0aGlzLnB1c2hGaWxlKDxGaWxlPmJsb2IsIHRoaXMuY3VycmVudENyb3BwZXJGaWxlLm5hbWUpO1xuICAgIH1cbiAgICB0aGlzLmNsb3NlQ3JvcHBlcih7XG4gICAgICBmaWxlOiBibG9iIGFzIEZpbGUsXG4gICAgICBmaWxlTmFtZTogdGhpcy5jdXJyZW50Q3JvcHBlckZpbGUubmFtZVxuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlSXRlbTogRmlsZVByZXZpZXdNb2RlbCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFkYXB0ZXIpIHtcbiAgICAgIHRoaXMuYWRhcHRlci5yZW1vdmVGaWxlKGZpbGVJdGVtKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgdGhpcy5vblJlbW92ZVN1Y2Nlc3MoZmlsZUl0ZW0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2Fybignbm8gYWRhcHRlciB3YXMgcHJvdmlkZWQnKTtcbiAgICB9XG4gIH1cbiAgLyoqIEVtaXRzIGV2ZW50IHdoZW4gZmlsZSByZW1vdmUgYXBpIHJldHVybnMgc3VjY2VzcyAgKi9cbiAgb25SZW1vdmVTdWNjZXNzKGZpbGVJdGVtOiBGaWxlUHJldmlld01vZGVsKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmVTdWNjZXNzLm5leHQoZmlsZUl0ZW0pO1xuICAgIHRoaXMucmVtb3ZlRmlsZUZyb21MaXN0KGZpbGVJdGVtKTtcbiAgfVxuXG4gIGltYWdlQ3JvcHBlZChldmVudDogSW1hZ2VDcm9wcGVkRXZlbnQpIHtcbiAgICB0aGlzLmNyb3BwZWRJbWFnZSA9IGJhc2U2NFRvRmlsZShldmVudC5iYXNlNjQpO1xuICB9XG5cbiAgaW1hZ2VMb2FkZWQoKSB7XG4gICAgdGhpcy5jcm9wcGVySXNSZWFkeSA9IHRydWU7XG4gIH1cblxuICBsb2FkSW1hZ2VGYWlsZWQoKSB7XG4gICAgY29uc29sZS5sb2coJ0xvYWQgSW1hZ2UgRmFpbGVkJyk7XG4gICAgdGhpcy5jbG9zZUNyb3BwZXIoe1xuICAgICAgZmlsZTogdGhpcy5jdXJyZW50Q3JvcHBlckZpbGUsXG4gICAgICBmaWxlTmFtZTogdGhpcy5jdXJyZW50Q3JvcHBlckZpbGUubmFtZVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVGaWxlc0lmRHJvcHBpbmdQcm9jZXNzSXNGaW5pc2hlZCgpIHtcbiAgICB0aGlzLmRyb3BwaW5nUHJvY2Vzcy5kaW1pbmlzaENvdW50ZXIoKTtcbiAgICBpZiAodGhpcy5kcm9wcGluZ1Byb2Nlc3MuaXNQcm9jZXNzaW5nRmluaXNoZWQoKSkge1xuICAgICAgdGhpcy5oYW5kbGVGaWxlcyh0aGlzLmRyb3BwaW5nUHJvY2Vzcy5nZXRGaWxlcygpKS5zdWJzY3JpYmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuaGFuZGxlRmlsZXNJZkRyb3BwaW5nUHJvY2Vzc0lzRmluaXNoZWQoKTtcbiAgICAgIH0sIHRoaXMuZHJvcHBpbmdQcm9jZXNzLmNoZWNrVGltZUludGVydmFsTVMpO1xuICAgIH1cbiAgfVxufVxuIl19