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
        if (this.cropperOptions.loadImageFailed instanceof Function) {
            this.cropperOptions.loadImageFailed();
        }
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
                    template: "<div\n(click)=\"fileInput.click()\"\nclass=\"file-drop-wrapper\"\n*ngIf=\"showeDragDropZone\"\n>\n<file-drop\n  (onFileDrop)=\"dropped($event)\"\n  [customstyle]=\"'custom-drag'\"\n  [captions]=\"_captions\"\n>\n  <ng-content select=\".dropzoneTemplate\"> </ng-content>\n</file-drop>\n</div>\n\n<input\ntype=\"file\"\nname=\"file[]\"\nid=\"fileInput\"\n#fileInput\n[multiple]=\"uploadType === 'multi' ? 'multiple' : ''\"\n(click)=\"fileInput.value = null\"\n(change)=\"onChange(fileInput)\"\n[accept]=\"accept\"\nclass=\"file-input\"\n/>\n\n<div class=\"cropperJsOverlay\" *ngIf=\"currentCropperFile\">\n  <div class=\"cropperJsBox\" [ngClass]=\"cropperIsReady? '' : 'visually-hidden'\">\n    <image-cropper\n      [imageFile]=\"currentCropperFile\"\n      [aspectRatio]=\"cropperOptions.aspectRatio\"\n      [autoCrop]=\"true\"\n      [maintainAspectRatio]=\"cropperOptions.maintainAspectRatio\"\n      format=\"png\"\n      [resizeToWidth]=\"cropperOptions.resizeToWidth\"\n      [resizeToHeight]=\"cropperOptions.resizeToHeight\"\n      [cropperStaticWidth]=\"cropperOptions.cropperStaticWidth\"\n      [cropperStaticHeight]=\"cropperOptions.cropperStaticHeight\"\n      [cropperMinWidth]=\"cropperOptions.cropperMinWidth\"\n      [cropperMinHeight]=\"cropperOptions.cropperMinHeight\"\n      [initialStepSize]=\"cropperOptions.initialStepSize\"\n      [onlyScaleDown]=\"cropperOptions.onlyScaleDown\"\n      [roundCropper]=\"cropperOptions.roundCropper\"\n      [imageQuality]=\"cropperOptions.imageQuality\"\n      [alignImage]=\"cropperOptions.alignImage\"\n      [backgroundColor]=\"cropperOptions.backgroundColor\"\n      [hideResizeSquares]=\"cropperOptions.hideResizeSquares\"\n      [disabled]=\"cropperOptions.disabled\"\n      [canvasRotation]=\"cropperOptions.canvasRotation\"\n      [transform]=\"cropperOptions.transform\"\n      (imageCropped)=\"imageCropped($event)\"\n      (imageLoaded)=\"imageLoaded()\"\n      (loadImageFailed)=\"loadImageFailed()\"\n    ></image-cropper>\n\n    <div class=\"cropper-actions\">\n      <button class=\"cropSubmit\" (click)=\"onCropSubmit()\">\n        {{ _captions?.cropper?.crop }}\n      </button>\n      <button\n        class=\"cropCancel\"\n        (click)=\"\n          closeCropper({\n            file: currentCropperFile,\n            fileName: currentCropperFile.name\n          })\n        \"\n      >\n        {{ _captions?.cropper?.cancel }}\n      </button>\n    </div>\n  </div>\n  <div class=\"cropperJsBox loader_holder\" *ngIf=\"!cropperIsReady\">\n    <div class=\"loader\"></div>\n  </div>\n</div>\n\n<div\nclass=\"files-preview-wrapper\"\n[ngClass]=\"{ 'visually-hidden': !showPreviewContainer }\"\n>\n<file-preview-container\n  *ngIf=\"files\"\n  [previewFiles]=\"files\"\n  (removeFile)=\"removeFile($event)\"\n  (uploadSuccess)=\"onUploadSuccess($event)\"\n  (uploadFail)=\"onUploadFail($event)\"\n  [adapter]=\"adapter\"\n  [itemTemplate]=\"itemTemplate\"\n  [captions]=\"_captions\"\n>\n</file-preview-container>\n</div>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF3ZXNvbWUtdXBsb2FkZXIvIiwic291cmNlcyI6WyJsaWIvZmlsZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUNMLHVCQUF1QixFQUFFLGlCQUFpQixFQUMxQyxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQW1CLE1BQU0sMEJBQTBCLENBQUM7QUFDaEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFNMUQsT0FBTyxFQUFFLGFBQWEsRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlELE9BQU8sRUFBRSxHQUFHLEVBQWEsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3JELE9BQU8sRUFBQyxZQUFZLEVBQW9CLE1BQU0sbUJBQW1CLENBQUM7QUFDbEUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDdkUsT0FBTyxFQUFpQixtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDOztBQUc1RTtJQXNFRSw2QkFDVSxXQUE4QixFQUM5QixHQUFzQjtRQUR0QixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFDOUIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7Ozs7UUFoRXRCLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7Ozs7UUFFckQsZUFBVSxHQUFHLElBQUksWUFBWSxF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QUU3QixpREFBeUI7Ozs7O0lBRXpCLHNDQUMyQjs7Ozs7SUFFM0IsK0NBQTRDOzs7OztJQUU1Qyx1Q0FBb0M7Ozs7O0lBRXBDLHdDQUE0Qjs7SUFDNUIsMENBQThDOztJQUM5QywwQ0FBa0M7O0lBRWxDLDJDQUFtQjs7SUFDbkIsNkNBQXVCOzs7OztJQUV2Qiw4Q0FBa0Q7Ozs7O0lBR2hELDBDQUFzQzs7Ozs7SUFDdEMsa0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmlsZVBpY2tlclNlcnZpY2UgfSBmcm9tICcuL2ZpbGUtcGlja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2FmZVJlc291cmNlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBGaWxlUHJldmlld01vZGVsIH0gZnJvbSAnLi9maWxlLXByZXZpZXcubW9kZWwnO1xuaW1wb3J0IHsgZ2V0RmlsZVR5cGUgfSBmcm9tICcuL2ZpbGUtdXBsb2FkLnV0aWxzJztcbmltcG9ydCB7IEZpbGVWYWxpZGF0aW9uVHlwZXMsIFZhbGlkYXRpb25FcnJvciB9IGZyb20gJy4vdmFsaWRhdGlvbi1lcnJvci5tb2RlbCc7XG5pbXBvcnQgeyBGaWxlUGlja2VyQWRhcHRlciB9IGZyb20gJy4vZmlsZS1waWNrZXIuYWRhcHRlcic7XG5pbXBvcnQge1xuICBGaWxlU3lzdGVtRGlyZWN0b3J5RW50cnksXG4gIEZpbGVTeXN0ZW1GaWxlRW50cnksXG4gIFVwbG9hZEV2ZW50XG59IGZyb20gJy4vZmlsZS1kcm9wJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGVmYXVsdENhcHRpb25zIH0gZnJvbSAnLi9kZWZhdWx0LWNhcHRpb25zJztcbmltcG9ydCB7IFVwbG9hZGVyQ2FwdGlvbnMgfSBmcm9tICcuL3VwbG9hZGVyLWNhcHRpb25zJztcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtiYXNlNjRUb0ZpbGUsIEltYWdlQ3JvcHBlZEV2ZW50fSBmcm9tICduZ3gtaW1hZ2UtY3JvcHBlcic7XG5pbXBvcnQge0ZpbGVEcm9wcGluZ1Byb2Nlc3NNb2RlbH0gZnJvbSAnLi9maWxlLWRyb3BwaW5nLXByb2Nlc3MubW9kZWwnO1xuaW1wb3J0IHtDcm9wcGVyT3B0aW9ucywgQ3JvcHBlck9wdGlvbnNNb2RlbH0gZnJvbSAnLi9jcm9wcGVyLW9wdGlvbnMubW9kZWwnO1xuXG4vLyBkZWNsYXJlIHZhciBDcm9wcGVyO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWZpbGUtcGlja2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbGUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmlsZS1waWNrZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRmlsZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqIEVtaXR0ZWQgd2hlbiBmaWxlIHVwbG9hZCB2aWEgYXBpIHN1Y2Nlc3NmdWxseS4gRW1pdHRlZCBmb3IgZXZlcnkgZmlsZSAqL1xuICBAT3V0cHV0KCkgdXBsb2FkU3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVByZXZpZXdNb2RlbD4oKTtcbiAgLyoqIEVtaXR0ZWQgd2hlbiBmaWxlIHVwbG9hZCB2aWEgYXBpIGZhaWxlZC4gRW1pdHRlZCBmb3IgZXZlcnkgZmlsZSAqL1xuICBAT3V0cHV0KCkgdXBsb2FkRmFpbCA9IG5ldyBFdmVudEVtaXR0ZXI8SHR0cEVycm9yUmVzcG9uc2U+KCk7XG4gIC8qKiBFbWl0dGVkIHdoZW4gZmlsZSBpcyByZW1vdmVkIHZpYSBhcGkgc3VjY2Vzc2Z1bGx5LiBFbWl0dGVkIGZvciBldmVyeSBmaWxlICovXG4gIEBPdXRwdXQoKSByZW1vdmVTdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlUHJldmlld01vZGVsPigpO1xuICAvKiogRW1pdHRlZCBvbiBmaWxlIHZhbGlkYXRpb24gZmFpbCAqL1xuICBAT3V0cHV0KCkgdmFsaWRhdGlvbkVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxWYWxpZGF0aW9uRXJyb3I+KCk7XG4gIC8qKiBFbWl0dGVkIHdoZW4gZmlsZSBpcyBhZGRlZCBhbmQgcGFzc2VkIHZhbGlkYXRpb25zLiBOb3QgdXBsb2FkZWQgeWV0ICovXG4gIEBPdXRwdXQoKSBmaWxlQWRkZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVQcmV2aWV3TW9kZWw+KCk7XG4gIC8qKiBDdXN0b20gdmFsaWRhdG9yIGZ1bmN0aW9uICovXG4gIEBJbnB1dCgpIGN1c3RvbVZhbGlkYXRvcjogKGZpbGU6IEZpbGUpID0+IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIC8qKiBXaGV0aGVyIHRvIGVuYWJsZSBjcm9wcGVyLiBEZWZhdWx0OiBkaXNhYmxlZCAqL1xuICBASW5wdXQoKVxuICBlbmFibGVDcm9wcGVyID0gZmFsc2U7XG4gIC8qKiBXaGV0aGVyIHRvIHNob3cgZGVmYXVsdCBkcmFnIGFuZCBkcm9wIHpvbmUuIERlZmF1bHQ6dHJ1ZSAqL1xuICBASW5wdXQoKSBzaG93ZURyYWdEcm9wWm9uZSA9IHRydWU7XG4gIC8qKiBXaGV0aGVyIHRvIHNob3cgZGVmYXVsdCBmaWxlcyBwcmV2aWV3IGNvbnRhaW5lci4gRGVmYXVsdDogdHJ1ZSAqL1xuICBASW5wdXQoKSBzaG93UHJldmlld0NvbnRhaW5lciA9IHRydWU7XG4gIC8qKiBQcmV2aWV3IEl0ZW0gdGVtcGxhdGUgKi9cbiAgQElucHV0KCkgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAvKiogU2luZ2xlIG9yIG11bHRpcGxlLiBEZWZhdWx0OiBtdWx0aSAqL1xuICBASW5wdXQoKVxuICB1cGxvYWRUeXBlID0gJ211bHRpJztcbiAgLyoqIE1heCBzaXplIG9mIHNlbGVjdGVkIGZpbGUgaW4gTUIuIERlZmF1bHQ6IG5vIGxpbWl0ICovXG4gIEBJbnB1dCgpXG4gIGZpbGVNYXhTaXplOiBudW1iZXI7XG4gIC8qKiBNYXggY291bnQgb2YgZmlsZSBpbiBtdWx0aS11cGxvYWQuIERlZmF1bHQ6IG5vIGxpbWl0ICovXG4gIEBJbnB1dCgpXG4gIGZpbGVNYXhDb3VudDogbnVtYmVyO1xuICAvKiogVG90YWwgTWF4IHNpemUgbGltaXQgb2YgYWxsIGZpbGVzIGluIE1CLiBEZWZhdWx0OiBubyBsaW1pdCAqL1xuICBASW5wdXQoKVxuICB0b3RhbE1heFNpemU6IG51bWJlcjtcbiAgLyoqIFdoaWNoIGZpbGUgdHlwZXMgdG8gc2hvdyBvbiBjaG9vc2UgZmlsZSBkaWFsb2cuIERlZmF1bHQ6IHNob3cgYWxsICovXG4gIEBJbnB1dCgpXG4gIGFjY2VwdDogc3RyaW5nO1xuICBmaWxlczogRmlsZVByZXZpZXdNb2RlbFtdID0gW107XG4gIC8qKiBGaWxlIGV4dGVuc2lvbnMgZmlsdGVyICovXG4gIEBJbnB1dCgpIGZpbGVFeHRlbnNpb25zOiBTdHJpbmdbXTtcbiAgY3JvcHBlcjogYW55O1xuICAvKiogQ3JvcHBlciBvcHRpb25zLiAqL1xuICBASW5wdXQoKSBjcm9wcGVyT3B0aW9uczogQ3JvcHBlck9wdGlvbnM7XG4gIC8qKiBGaWxlcyBhcnJheSBmb3IgY3JvcHBlci4gV2lsbCBiZSBzaG93biBlcXVlbnRpYWxseSBpZiBjcm9wIGVuYWJsZWQgKi9cbiAgZmlsZXNGb3JDcm9wcGVyOiBGaWxlW10gPSBbXTtcbiAgLyoqIEN1cnJlbnQgZmlsZSB0byBiZSBzaG93biBpbiBjcm9wcGVyKi9cbiAgY3VycmVudENyb3BwZXJGaWxlOiBGaWxlO1xuICAvKiogQ3VzdG9tIGFwaSBBZGFwdGVyIGZvciB1cGxvYWRpbmcvcmVtb3ZpbmcgZmlsZXMgKi9cbiAgQElucHV0KClcbiAgYWRhcHRlcjogRmlsZVBpY2tlckFkYXB0ZXI7XG4gIC8qKiAgQ3VzdG9tZSB0ZW1wbGF0ZSBmb3IgZHJvcHpvbmUgKi9cbiAgQElucHV0KCkgZHJvcHpvbmVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgLyoqIEN1c3RvbSBjYXB0aW9ucyBpbnB1dC4gVXNlZCBmb3IgbXVsdGkgbGFuZ3VhZ2Ugc3VwcG9ydCAqL1xuICBASW5wdXQoKSBjYXB0aW9uczogVXBsb2FkZXJDYXB0aW9ucztcbiAgLyoqIGNhcHRpb25zIG9iamVjdCovXG4gIF9jYXB0aW9uczogVXBsb2FkZXJDYXB0aW9ucztcbiAgY3JvcENsb3NlZCQgPSBuZXcgU3ViamVjdDxGaWxlUHJldmlld01vZGVsPigpO1xuICBfb25EZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY3JvcHBlZEltYWdlOiBCbG9iO1xuICBjcm9wcGVySXNSZWFkeSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgZHJvcHBpbmdQcm9jZXNzOiBGaWxlRHJvcHBpbmdQcm9jZXNzTW9kZWw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmaWxlU2VydmljZTogRmlsZVBpY2tlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNldENyb3BwZXJPcHRpb25zKCk7XG4gICAgdGhpcy5saXN0ZW5Ub0Nyb3BDbG9zZSgpO1xuICAgIHRoaXMuc2V0Q2FwdGlvbnMoKTtcbiAgfVxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9vbkRlc3Ryb3kkLm5leHQoKTtcbiAgfVxuICBzZXRDYXB0aW9ucygpIHtcbiAgICB0aGlzLl9jYXB0aW9ucyA9IHRoaXMuY2FwdGlvbnMgfHwgRGVmYXVsdENhcHRpb25zO1xuICB9XG4gIC8qKiBMaXN0ZW4gd2hlbiBDcm9wcGVyIGlzIGNsb3NlZCBhbmQgb3BlbiBuZXcgY3JvcHBlciBpZiBuZXh0IGltYWdlIGV4aXN0cyAqL1xuICBsaXN0ZW5Ub0Nyb3BDbG9zZSgpIHtcbiAgICB0aGlzLmNyb3BDbG9zZWQkXG4gICAgICAvLyAucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKChyZXM6IEZpbGVQcmV2aWV3TW9kZWwpID0+IHtcbiAgICAgICAgY29uc3QgY3JvcHBlZEluZGV4ID0gdGhpcy5maWxlc0ZvckNyb3BwZXIuZmluZEluZGV4KFxuICAgICAgICAgIGl0ZW0gPT4gaXRlbS5uYW1lID09PSByZXMuZmlsZU5hbWVcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgbmV4dEZpbGUgPVxuICAgICAgICAgIGNyb3BwZWRJbmRleCAhPT0gLTFcbiAgICAgICAgICAgID8gdGhpcy5maWxlc0ZvckNyb3BwZXJbY3JvcHBlZEluZGV4ICsgMV1cbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAvLyAgY29uc29sZS5sb2coJ2Nyb3BwZWQnLCByZXMpO1xuICAgICAgICB0aGlzLmZpbGVzRm9yQ3JvcHBlciA9IFsuLi50aGlzLmZpbGVzRm9yQ3JvcHBlcl0uZmlsdGVyKFxuICAgICAgICAgIGl0ZW0gPT4gaXRlbS5uYW1lICE9PSByZXMuZmlsZU5hbWVcbiAgICAgICAgKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5maWxlc0ZvckNyb3BwZXIpO1xuICAgICAgICBpZiAobmV4dEZpbGUpIHtcbiAgICAgICAgICB0aGlzLm9wZW5Dcm9wcGVyKG5leHRGaWxlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvKiogU2V0cyBjdXN0b20gY3JvcHBlciBvcHRpb25zIGlmIGF2YWlhYmxlICovXG4gIHNldENyb3BwZXJPcHRpb25zKCkge1xuICAgIHRoaXMuY3JvcHBlck9wdGlvbnMgPSB0aGlzLmNyb3BwZXJPcHRpb25zID09PSB1bmRlZmluZWQgPyBuZXcgQ3JvcHBlck9wdGlvbnNNb2RlbCh7fSkgOiBuZXcgQ3JvcHBlck9wdGlvbnNNb2RlbCh0aGlzLmNyb3BwZXJPcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBPbiBpbnB1dCBmaWxlIHNlbGVjdGVkICovXG4gIG9uQ2hhbmdlKGZpbGVJbnB1dDogSFRNTElucHV0RWxlbWVudCkge1xuICAgIGNvbnN0IGZpbGVzOiBGaWxlW10gPSBBcnJheS5mcm9tKGZpbGVJbnB1dC5maWxlcyk7XG4gICAgdGhpcy5oYW5kbGVGaWxlcyhmaWxlcykuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKiogSGFuZGxlcyBpbnB1dCBhbmQgZHJhZy9kcm9wIGZpbGVzICovXG4gIGhhbmRsZUZpbGVzKGZpbGVzOiBGaWxlW10pOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZE1heEZpbGVDb3VudChmaWxlcykpIHtcbiAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICB9XG4gICAgY29uc3QgaXNWYWxpZFVwbG9hZFN5bmMgPSBmaWxlcy5ldmVyeShpdGVtID0+IHRoaXMudmFsaWRhdGVGaWxlU3luYyhpdGVtKSk7XG4gICAgY29uc3QgYXN5bmNGdW5jdGlvbnMgPSBmaWxlcy5tYXAoaXRlbSA9PiB0aGlzLnZhbGlkYXRlRmlsZUFzeW5jKGl0ZW0pKTtcblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KC4uLmFzeW5jRnVuY3Rpb25zKS5waXBlKFxuICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgIGNvbnN0IGlzVmFsaWRVcGxvYWRBc3luYyA9IHJlcy5ldmVyeShyZXN1bHQgPT4gcmVzdWx0ID09PSB0cnVlKTtcbiAgICAgICAgaWYgKCFpc1ZhbGlkVXBsb2FkU3luYyB8fCAhaXNWYWxpZFVwbG9hZEFzeW5jKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZpbGVzLmZvckVhY2goKGZpbGU6IEZpbGUsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZUlucHV0RmlsZShmaWxlLCBpbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG4gIC8qKiBWYWxpZGF0ZXMgc3luY2hyb25vdXMgdmFsaWRhdGlvbnMgKi9cbiAgdmFsaWRhdGVGaWxlU3luYyhmaWxlOiBGaWxlKTogYm9vbGVhbiB7XG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGhpcy5pc1ZhbGlkVXBsb2FkVHlwZShmaWxlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNWYWxpZEV4dGVuc2lvbihmaWxlLCBmaWxlLm5hbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIC8qKiBWYWxpZGF0ZXMgYXN5bmNocm9ub3VzIHZhbGlkYXRpb25zICovXG4gIHZhbGlkYXRlRmlsZUFzeW5jKGZpbGU6IEZpbGUpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBpZiAoIXRoaXMuY3VzdG9tVmFsaWRhdG9yKSB7XG4gICAgICByZXR1cm4gb2YodHJ1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmN1c3RvbVZhbGlkYXRvcihmaWxlKS5waXBlKFxuICAgICAgdGFwKHJlcyA9PiB7XG4gICAgICAgIGlmICghcmVzKSB7XG4gICAgICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3IubmV4dCh7XG4gICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgZXJyb3I6IEZpbGVWYWxpZGF0aW9uVHlwZXMuY3VzdG9tVmFsaWRhdG9yXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICAvKiogSGFuZGxlcyBpbnB1dCBhbmQgZHJhZyZkcm9wIGZpbGVzICovXG4gIGhhbmRsZUlucHV0RmlsZShmaWxlOiBGaWxlLCBpbmRleCk6IHZvaWQge1xuICAgIGNvbnN0IHR5cGUgPSBnZXRGaWxlVHlwZShmaWxlLnR5cGUpO1xuICAgIGlmICh0eXBlID09PSAnaW1hZ2UnICYmIHRoaXMuZW5hYmxlQ3JvcHBlcikge1xuICAgICAgdGhpcy5maWxlc0ZvckNyb3BwZXIucHVzaChmaWxlKTtcbiAgICAgIGlmICghdGhpcy5jdXJyZW50Q3JvcHBlckZpbGUpIHtcbiAgICAgICAgdGhpcy5vcGVuQ3JvcHBlcihmaWxlKTtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvKiogU2l6ZSBpcyBub3QgaW5pdGlhbGx5IGNoZWNrZWQgb24gaGFuZGxlSW5wdXRGaWxlcyBiZWNhdXNlIG9mIGNyb3BwZXIgc2l6ZSBjaGFuZ2UgKi9cbiAgICAgIGlmICh0aGlzLmlzVmFsaWRTaXplKGZpbGUsIGZpbGUuc2l6ZSkpIHtcbiAgICAgICAgdGhpcy5wdXNoRmlsZShmaWxlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLyoqIFZhbGlkYXRlcyBpZiB1cGxvYWQgdHlwZSBpcyBzaW5nbGUgc28gYW5vdGhlciBmaWxlIGNhbm5vdCBiZSBhZGRlZCAqL1xuICBpc1ZhbGlkVXBsb2FkVHlwZShmaWxlKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMudXBsb2FkVHlwZSA9PT0gJ3NpbmdsZScgJiYgdGhpcy5maWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnZhbGlkYXRpb25FcnJvci5uZXh0KHtcbiAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgZXJyb3I6IEZpbGVWYWxpZGF0aW9uVHlwZXMudXBsb2FkVHlwZVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICAvKiogVmFsaWRhdGVzIG1heCBmaWxlIGNvdW50ICovXG4gIGlzVmFsaWRNYXhGaWxlQ291bnQoZmlsZXM6IEZpbGVbXSk6IGJvb2xlYW4ge1xuICAgIGlmIChcbiAgICAgICF0aGlzLmZpbGVNYXhDb3VudCB8fFxuICAgICAgdGhpcy5maWxlTWF4Q291bnQgPj0gdGhpcy5maWxlcy5sZW5ndGggKyBmaWxlcy5sZW5ndGhcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbGlkYXRpb25FcnJvci5uZXh0KHtcbiAgICAgICAgZmlsZTogbnVsbCxcbiAgICAgICAgZXJyb3I6IEZpbGVWYWxpZGF0aW9uVHlwZXMuZmlsZU1heENvdW50XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgLyoqIE9uIGZpbGUgZHJvcHBlZCAqL1xuICBkcm9wcGVkKGV2ZW50OiBVcGxvYWRFdmVudCkge1xuICAgIHRoaXMuZHJvcHBpbmdQcm9jZXNzID0gbmV3IEZpbGVEcm9wcGluZ1Byb2Nlc3NNb2RlbChldmVudC5maWxlcy5sZW5ndGgpO1xuXG4gICAgZm9yIChjb25zdCBkcm9wcGVkRmlsZSBvZiBldmVudC5maWxlcykge1xuICAgICAgLy8gSXMgaXQgYSBmaWxlP1xuICAgICAgaWYgKGRyb3BwZWRGaWxlLmZpbGVFbnRyeS5pc0ZpbGUpIHtcbiAgICAgICAgY29uc3QgZmlsZUVudHJ5ID0gZHJvcHBlZEZpbGUuZmlsZUVudHJ5IGFzIEZpbGVTeXN0ZW1GaWxlRW50cnk7XG4gICAgICAgIGZpbGVFbnRyeS5maWxlKChmaWxlOiBGaWxlKSA9PiB7XG4gICAgICAgICAgdGhpcy5kcm9wcGluZ1Byb2Nlc3MuYWRkRmlsZUZvclVwbG9hZChmaWxlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJdCB3YXMgYSBkaXJlY3RvcnkgKGVtcHR5IGRpcmVjdG9yaWVzIGFyZSBhZGRlZCwgb3RoZXJ3aXNlIG9ubHkgZmlsZXMpXG4gICAgICAgIGNvbnN0IGZpbGVFbnRyeSA9IGRyb3BwZWRGaWxlLmZpbGVFbnRyeSBhcyBGaWxlU3lzdGVtRGlyZWN0b3J5RW50cnk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRyb3BwZWRGaWxlLnJlbGF0aXZlUGF0aCwgZmlsZUVudHJ5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5oYW5kbGVGaWxlc0lmRHJvcHBpbmdQcm9jZXNzSXNGaW5pc2hlZCgpO1xuICB9XG5cbiAgLyoqIEFkZCBmaWxlIHRvIGZpbGUgbGlzdCBhZnRlciBzdWNjZXNmdWxsIHZhbGlkYXRpb24gKi9cbiAgcHVzaEZpbGUoZmlsZTogRmlsZSwgZmlsZU5hbWUgPSBmaWxlLm5hbWUpOiB2b2lkIHtcbiAgICB0aGlzLmZpbGVzLnB1c2goeyBmaWxlOiBmaWxlLCBmaWxlTmFtZTogZmlsZU5hbWUgfSk7XG4gICAgdGhpcy5maWxlQWRkZWQubmV4dCh7IGZpbGU6IGZpbGUsIGZpbGVOYW1lOiBmaWxlTmFtZSB9KTtcbiAgfVxuXG4gIC8qKiBPcGVucyBjcm9wcGVyIGZvciBpbWFnZSBjcm9wICovXG4gIG9wZW5Dcm9wcGVyKGZpbGU6IEZpbGUpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRDcm9wcGVyRmlsZSA9IGZpbGU7XG4gIH1cblxuICBnZXRTYWZlVXJsKGZpbGU6IEZpbGUpOiBTYWZlUmVzb3VyY2VVcmwge1xuICAgIHJldHVybiB0aGlzLmZpbGVTZXJ2aWNlLmNyZWF0ZVNhZmVVcmwoZmlsZSk7XG4gIH1cblxuICAvKiogQ2xvc2Ugb3IgY2FuY2VsIGNyb3BwZXIgKi9cbiAgY2xvc2VDcm9wcGVyKGZpbGVQcmV2aWV3OiBGaWxlUHJldmlld01vZGVsKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50Q3JvcHBlckZpbGUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5jcm9wcGVySXNSZWFkeSA9IGZhbHNlO1xuICAgIHRoaXMuY3JvcENsb3NlZCQubmV4dChmaWxlUHJldmlldyk7XG4gIH1cbiAgLyoqIFJlbW92ZXMgZmlsZXMgZnJvbSBmaWxlcyBsaXN0ICovXG4gIHJlbW92ZUZpbGVGcm9tTGlzdChmaWxlOiBGaWxlUHJldmlld01vZGVsKTogdm9pZCB7XG4gICAgdGhpcy5maWxlcyA9IHRoaXMuZmlsZXMuZmlsdGVyKGYgPT4gZiAhPT0gZmlsZSk7XG4gIH1cblxuICAvKiogRW1pdHMgZXZlbnQgd2hlbiBmaWxlIHVwbG9hZCBhcGkgcmV0dXJucyBzdWNjZXNzICAqL1xuICBvblVwbG9hZFN1Y2Nlc3MoZmlsZUl0ZW06IEZpbGVQcmV2aWV3TW9kZWwpOiB2b2lkIHtcbiAgICB0aGlzLnVwbG9hZFN1Y2Nlc3MubmV4dChmaWxlSXRlbSk7XG4gIH1cblxuICAvKiogRW1pdHMgZXZlbnQgd2hlbiBmaWxlIHVwbG9hZCBhcGkgcmV0dXJucyBmYWlsdXJlICAqL1xuICBvblVwbG9hZEZhaWwoZXI6IEh0dHBFcnJvclJlc3BvbnNlKTogdm9pZCB7XG4gICAgdGhpcy51cGxvYWRGYWlsLm5leHQoZXIpO1xuICB9XG5cbiAgLyoqIFZhbGlkYXRlcyBmaWxlIGV4dGVuc2lvbiAqL1xuICBpc1ZhbGlkRXh0ZW5zaW9uKGZpbGU6IEZpbGUsIGZpbGVOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgIGlmICghdGhpcy5maWxlRXh0ZW5zaW9ucykge3JldHVybiB0cnVlOyB9XG4gICAgICBjb25zdCBleHRlbnNpb24gPSBmaWxlTmFtZS5zcGxpdCgnLicpLnBvcCgpO1xuICAgICAgY29uc3QgZmlsZUV4dGVuc2lvbnMgPSB0aGlzLmZpbGVFeHRlbnNpb25zLm1hcChleHQgPT4gZXh0LnRvTG93ZXJDYXNlKCkpO1xuICAgICAgaWYgKGZpbGVFeHRlbnNpb25zLmluZGV4T2YoZXh0ZW5zaW9uLnRvTG93ZXJDYXNlKCkpID09PSAtMSkge1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25FcnJvci5uZXh0KHtmaWxlOiBmaWxlLCBlcnJvcjogRmlsZVZhbGlkYXRpb25UeXBlcy5leHRlbnNpb25zfSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgLyoqIFZhbGlkYXRlcyBzZWxlY3RlZCBmaWxlIHNpemUgYW5kIHRvdGFsIGZpbGUgc2l6ZSAqL1xuICBpc1ZhbGlkU2l6ZShmaWxlOiBGaWxlLCBzaXplOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAvKiogVmFsaWRhdGluZyBzZWxlY3RlZCBmaWxlIHNpemUgKi9cbiAgICBjb25zdCByZXM6IG51bWJlciA9IHRoaXMuYml0c1RvTWIoc2l6ZS50b1N0cmluZygpKTtcbiAgICBsZXQgaXNWYWxpZEZpbGVTaXplOiBib29sZWFuO1xuICAgIGxldCBpc1ZhbGlkVG90YWxGaWxlU2l6ZTogYm9vbGVhbjtcbiAgICBpZiAoIXRoaXMuZmlsZU1heFNpemUgfHwgKHRoaXMuZmlsZU1heFNpemUgJiYgcmVzIDwgdGhpcy5maWxlTWF4U2l6ZSkpIHtcbiAgICAgIGlzVmFsaWRGaWxlU2l6ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yLm5leHQoe1xuICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICBlcnJvcjogRmlsZVZhbGlkYXRpb25UeXBlcy5maWxlTWF4U2l6ZVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKiBWYWxpZGF0aW5nIFRvdGFsIEZpbGVzIFNpemUgKi9cbiAgICBjb25zdCB0b3RhbEJpdHMgPSB0aGlzLmZpbGVzXG4gICAgICAubWFwKGYgPT4gZi5maWxlLnNpemUpXG4gICAgICAucmVkdWNlKChhY2MsIGN1cnIpID0+IGFjYyArIGN1cnIsIDApO1xuICAgIGlmIChcbiAgICAgICF0aGlzLnRvdGFsTWF4U2l6ZSB8fFxuICAgICAgKHRoaXMudG90YWxNYXhTaXplICYmXG4gICAgICAgIHRoaXMuYml0c1RvTWIodG90YWxCaXRzICsgZmlsZS5zaXplKSA8IHRoaXMudG90YWxNYXhTaXplKVxuICAgICkge1xuICAgICAgaXNWYWxpZFRvdGFsRmlsZVNpemUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbGlkYXRpb25FcnJvci5uZXh0KHtcbiAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgZXJyb3I6IEZpbGVWYWxpZGF0aW9uVHlwZXMudG90YWxNYXhTaXplXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuICEhaXNWYWxpZEZpbGVTaXplICYmIGlzVmFsaWRUb3RhbEZpbGVTaXplO1xuICB9XG4gIGJpdHNUb01iKHNpemUpOiBudW1iZXIge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KHNpemUpIC8gMTA0ODU3NjtcbiAgfVxuICAvKiogd2hlbiBjcm9wIGJ1dHRvbiBzdWJtaXR0ZWQgKi9cbiAgb25Dcm9wU3VibWl0KCk6IHZvaWQge1xuICAgIHRoaXMuYmxvYkZhbGxCYWNrKHRoaXMuY3JvcHBlZEltYWdlKTtcbiAgfVxuICAvKiogQWZ0ZXIgY3JvcCBzdWJtaXQgKi9cbiAgYmxvYkZhbGxCYWNrKGJsb2I6IEJsb2IpOiB2b2lkIHtcbiAgICBpZiAoIWJsb2IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNWYWxpZFNpemUoPEZpbGU+YmxvYiwgYmxvYi5zaXplKSkge1xuICAgICAgdGhpcy5wdXNoRmlsZSg8RmlsZT5ibG9iLCB0aGlzLmN1cnJlbnRDcm9wcGVyRmlsZS5uYW1lKTtcbiAgICB9XG4gICAgdGhpcy5jbG9zZUNyb3BwZXIoe1xuICAgICAgZmlsZTogYmxvYiBhcyBGaWxlLFxuICAgICAgZmlsZU5hbWU6IHRoaXMuY3VycmVudENyb3BwZXJGaWxlLm5hbWVcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZUl0ZW06IEZpbGVQcmV2aWV3TW9kZWwpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hZGFwdGVyKSB7XG4gICAgICB0aGlzLmFkYXB0ZXIucmVtb3ZlRmlsZShmaWxlSXRlbSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgIHRoaXMub25SZW1vdmVTdWNjZXNzKGZpbGVJdGVtKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oJ25vIGFkYXB0ZXIgd2FzIHByb3ZpZGVkJyk7XG4gICAgfVxuICB9XG4gIC8qKiBFbWl0cyBldmVudCB3aGVuIGZpbGUgcmVtb3ZlIGFwaSByZXR1cm5zIHN1Y2Nlc3MgICovXG4gIG9uUmVtb3ZlU3VjY2VzcyhmaWxlSXRlbTogRmlsZVByZXZpZXdNb2RlbCk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlU3VjY2Vzcy5uZXh0KGZpbGVJdGVtKTtcbiAgICB0aGlzLnJlbW92ZUZpbGVGcm9tTGlzdChmaWxlSXRlbSk7XG4gIH1cblxuICBpbWFnZUNyb3BwZWQoZXZlbnQ6IEltYWdlQ3JvcHBlZEV2ZW50KSB7XG4gICAgdGhpcy5jcm9wcGVkSW1hZ2UgPSBiYXNlNjRUb0ZpbGUoZXZlbnQuYmFzZTY0KTtcbiAgfVxuXG4gIGltYWdlTG9hZGVkKCkge1xuICAgIHRoaXMuY3JvcHBlcklzUmVhZHkgPSB0cnVlO1xuICB9XG5cbiAgbG9hZEltYWdlRmFpbGVkKCkge1xuICAgIGNvbnNvbGUubG9nKCdMb2FkIEltYWdlIEZhaWxlZCcpO1xuICAgIHRoaXMuY2xvc2VDcm9wcGVyKHtcbiAgICAgIGZpbGU6IHRoaXMuY3VycmVudENyb3BwZXJGaWxlLFxuICAgICAgZmlsZU5hbWU6IHRoaXMuY3VycmVudENyb3BwZXJGaWxlLm5hbWVcbiAgICB9KTtcbiAgICBpZiAodGhpcy5jcm9wcGVyT3B0aW9ucy5sb2FkSW1hZ2VGYWlsZWQgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgdGhpcy5jcm9wcGVyT3B0aW9ucy5sb2FkSW1hZ2VGYWlsZWQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUZpbGVzSWZEcm9wcGluZ1Byb2Nlc3NJc0ZpbmlzaGVkKCkge1xuICAgIHRoaXMuZHJvcHBpbmdQcm9jZXNzLmRpbWluaXNoQ291bnRlcigpO1xuICAgIGlmICh0aGlzLmRyb3BwaW5nUHJvY2Vzcy5pc1Byb2Nlc3NpbmdGaW5pc2hlZCgpKSB7XG4gICAgICB0aGlzLmhhbmRsZUZpbGVzKHRoaXMuZHJvcHBpbmdQcm9jZXNzLmdldEZpbGVzKCkpLnN1YnNjcmliZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5oYW5kbGVGaWxlc0lmRHJvcHBpbmdQcm9jZXNzSXNGaW5pc2hlZCgpO1xuICAgICAgfSwgdGhpcy5kcm9wcGluZ1Byb2Nlc3MuY2hlY2tUaW1lSW50ZXJ2YWxNUyk7XG4gICAgfVxuICB9XG59XG4iXX0=