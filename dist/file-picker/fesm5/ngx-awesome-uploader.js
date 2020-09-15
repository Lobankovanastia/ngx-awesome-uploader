import { Injectable, EventEmitter, Component, ChangeDetectionStrategy, ChangeDetectorRef, Output, Input, NgZone, Renderer2, NgModule } from '@angular/core';
import { of, Subject, combineLatest, timer } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { __spread, __values, __assign } from 'tslib';
import { map, tap } from 'rxjs/operators';
import { base64ToFile, ImageCropperModule } from 'ngx-image-cropper';
import { HttpEventType } from '@angular/common/http';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FilePickerService = /** @class */ (function () {
    function FilePickerService(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @param {?} formData
     * @return {?}
     */
    FilePickerService.prototype.mockUploadFile = /**
     * @param {?} formData
     * @return {?}
     */
    function (formData) {
        /** @type {?} */
        var event = new CustomEvent('customevent', {
            detail: {
                type: 'UploadProgreess'
            }
        });
        return of(event.detail);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    FilePickerService.prototype.createSafeUrl = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        if (((/** @type {?} */ (window))).UPLOADER_TEST_MODE) {
            return;
        }
        try {
            /** @type {?} */
            var url = window.URL.createObjectURL(file);
            /** @type {?} */
            var safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            return safeUrl;
        }
        catch (er) {
            console.log(er);
        }
    };
    FilePickerService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FilePickerService.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    return FilePickerService;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    FilePickerService.prototype.sanitizer;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} fileExtension
 * @return {?}
 */
function getFileType(fileExtension) {
    if (fileExtension.includes('image')) {
        return 'image';
    }
    else if (fileExtension.includes('video')) {
        return 'video';
    }
    else {
        return 'other';
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ValidationError() { }
if (false) {
    /** @type {?} */
    ValidationError.prototype.file;
    /** @type {?} */
    ValidationError.prototype.error;
}
/** @enum {string} */
var FileValidationTypes = {
    fileMaxSize: 'FILE_MAX_SIZE',
    fileMaxCount: 'FILE_MAX_COUNT',
    totalMaxSize: 'TOTAL_MAX_SIZE',
    extensions: 'EXTENSIONS',
    uploadType: 'UPLOAD_TYPE',
    customValidator: 'CUSTOM_VALIDATOR',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
FilePickerAdapter = /** @class */ (function () {
    function FilePickerAdapter() {
    }
    return FilePickerAdapter;
}());
if (false) {
    /**
     * @abstract
     * @param {?} fileItem
     * @return {?}
     */
    FilePickerAdapter.prototype.uploadFile = function (fileItem) { };
    /**
     * @abstract
     * @param {?} fileItem
     * @return {?}
     */
    FilePickerAdapter.prototype.removeFile = function (fileItem) { };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var DefaultCaptions = {
    dropzone: {
        title: "Drag and drop file here",
        or: "or",
        browse: "Browse Files"
    },
    cropper: {
        crop: "Crop",
        cancel: "Cancel"
    },
    previewCard: {
        remove: "Remove",
        uploadError: "Error on upload"
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FileDroppingProcessModel = /** @class */ (function () {
    function FileDroppingProcessModel(expectedLength, timerCounter) {
        if (timerCounter === void 0) { timerCounter = 20; }
        this.filesForUpload = [];
        this.timerCounter = 0;
        this.expectedLength = 0;
        this.checkTimeIntervalMS = 100;
        this.expectedLength = expectedLength;
        this.timerCounter = timerCounter;
    }
    /**
     * @param {?} file
     * @return {?}
     */
    FileDroppingProcessModel.prototype.addFileForUpload = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        this.filesForUpload.push(file);
    };
    /**
     * @return {?}
     */
    FileDroppingProcessModel.prototype.diminishCounter = /**
     * @return {?}
     */
    function () {
        this.timerCounter--;
    };
    /**
     * @return {?}
     */
    FileDroppingProcessModel.prototype.isProcessingFinished = /**
     * @return {?}
     */
    function () {
        return this.timerCounter === 0 || this.filesForUpload.length === this.expectedLength;
    };
    /**
     * @param {?} length
     * @return {?}
     */
    FileDroppingProcessModel.prototype.setExpectedLength = /**
     * @param {?} length
     * @return {?}
     */
    function (length) {
        this.expectedLength = length;
    };
    /**
     * @return {?}
     */
    FileDroppingProcessModel.prototype.getFiles = /**
     * @return {?}
     */
    function () {
        return this.filesForUpload;
    };
    return FileDroppingProcessModel;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    FileDroppingProcessModel.prototype.filesForUpload;
    /**
     * @type {?}
     * @private
     */
    FileDroppingProcessModel.prototype.timerCounter;
    /**
     * @type {?}
     * @private
     */
    FileDroppingProcessModel.prototype.expectedLength;
    /** @type {?} */
    FileDroppingProcessModel.prototype.checkTimeIntervalMS;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function CropperOptions() { }
if (false) {
    /** @type {?|undefined} */
    CropperOptions.prototype.aspectRatio;
    /** @type {?|undefined} */
    CropperOptions.prototype.autoCrop;
    /** @type {?|undefined} */
    CropperOptions.prototype.maintainAspectRatio;
    /** @type {?|undefined} */
    CropperOptions.prototype.resizeToWidth;
    /** @type {?|undefined} */
    CropperOptions.prototype.resizeToHeight;
    /** @type {?|undefined} */
    CropperOptions.prototype.cropperStaticWidth;
    /** @type {?|undefined} */
    CropperOptions.prototype.cropperStaticHeight;
    /** @type {?|undefined} */
    CropperOptions.prototype.cropperMinWidth;
    /** @type {?|undefined} */
    CropperOptions.prototype.cropperMinHeight;
    /** @type {?|undefined} */
    CropperOptions.prototype.initialStepSize;
    /** @type {?|undefined} */
    CropperOptions.prototype.onlyScaleDown;
    /** @type {?|undefined} */
    CropperOptions.prototype.roundCropper;
    /** @type {?|undefined} */
    CropperOptions.prototype.imageQuality;
    /** @type {?|undefined} */
    CropperOptions.prototype.alignImage;
    /** @type {?|undefined} */
    CropperOptions.prototype.backgroundColor;
    /** @type {?|undefined} */
    CropperOptions.prototype.hideResizeSquares;
    /** @type {?|undefined} */
    CropperOptions.prototype.disabled;
    /** @type {?|undefined} */
    CropperOptions.prototype.canvasRotation;
    /** @type {?|undefined} */
    CropperOptions.prototype.transform;
}
var CropperOptionsModel = /** @class */ (function () {
    function CropperOptionsModel(_a) {
        var _b = _a.aspectRatio, aspectRatio = _b === void 0 ? 1 : _b, _c = _a.autoCrop, autoCrop = _c === void 0 ? true : _c, _d = _a.maintainAspectRatio, maintainAspectRatio = _d === void 0 ? true : _d, _e = _a.resizeToWidth, resizeToWidth = _e === void 0 ? 0 : _e, _f = _a.resizeToHeight, resizeToHeight = _f === void 0 ? 0 : _f, _g = _a.cropperStaticWidth, cropperStaticWidth = _g === void 0 ? 0 : _g, _h = _a.cropperStaticHeight, cropperStaticHeight = _h === void 0 ? 0 : _h, _j = _a.cropperMinWidth, cropperMinWidth = _j === void 0 ? 0 : _j, _k = _a.cropperMinHeight, cropperMinHeight = _k === void 0 ? 0 : _k, _l = _a.initialStepSize, initialStepSize = _l === void 0 ? 3 : _l, _m = _a.onlyScaleDown, onlyScaleDown = _m === void 0 ? false : _m, _o = _a.roundCropper, roundCropper = _o === void 0 ? false : _o, _p = _a.imageQuality, imageQuality = _p === void 0 ? 92 : _p, _q = _a.alignImage, alignImage = _q === void 0 ? 'center' : _q, _r = _a.backgroundColor, backgroundColor = _r === void 0 ? '' : _r, _s = _a.hideResizeSquares, hideResizeSquares = _s === void 0 ? false : _s, _t = _a.disabled, disabled = _t === void 0 ? false : _t, _u = _a.canvasRotation, canvasRotation = _u === void 0 ? 0 : _u, _v = _a.transform, transform = _v === void 0 ? {} : _v;
        this.aspectRatio = aspectRatio;
        this.autoCrop = autoCrop;
        this.maintainAspectRatio = maintainAspectRatio;
        this.resizeToWidth = resizeToWidth;
        this.resizeToHeight = resizeToHeight;
        this.cropperStaticWidth = cropperStaticWidth;
        this.cropperStaticHeight = cropperStaticHeight;
        this.cropperMinWidth = cropperMinWidth;
        this.cropperMinHeight = cropperMinHeight;
        this.initialStepSize = initialStepSize;
        this.onlyScaleDown = onlyScaleDown;
        this.roundCropper = roundCropper;
        this.imageQuality = imageQuality;
        this.alignImage = alignImage;
        this.backgroundColor = backgroundColor;
        this.hideResizeSquares = hideResizeSquares;
        this.disabled = disabled;
        this.canvasRotation = canvasRotation;
        this.transform = transform;
    }
    return CropperOptionsModel;
}());
if (false) {
    /** @type {?} */
    CropperOptionsModel.prototype.aspectRatio;
    /** @type {?} */
    CropperOptionsModel.prototype.autoCrop;
    /** @type {?} */
    CropperOptionsModel.prototype.maintainAspectRatio;
    /** @type {?} */
    CropperOptionsModel.prototype.resizeToWidth;
    /** @type {?} */
    CropperOptionsModel.prototype.resizeToHeight;
    /** @type {?} */
    CropperOptionsModel.prototype.cropperStaticWidth;
    /** @type {?} */
    CropperOptionsModel.prototype.cropperStaticHeight;
    /** @type {?} */
    CropperOptionsModel.prototype.cropperMinWidth;
    /** @type {?} */
    CropperOptionsModel.prototype.cropperMinHeight;
    /** @type {?} */
    CropperOptionsModel.prototype.initialStepSize;
    /** @type {?} */
    CropperOptionsModel.prototype.onlyScaleDown;
    /** @type {?} */
    CropperOptionsModel.prototype.roundCropper;
    /** @type {?} */
    CropperOptionsModel.prototype.imageQuality;
    /** @type {?} */
    CropperOptionsModel.prototype.alignImage;
    /** @type {?} */
    CropperOptionsModel.prototype.backgroundColor;
    /** @type {?} */
    CropperOptionsModel.prototype.hideResizeSquares;
    /** @type {?} */
    CropperOptionsModel.prototype.disabled;
    /** @type {?} */
    CropperOptionsModel.prototype.canvasRotation;
    /** @type {?} */
    CropperOptionsModel.prototype.transform;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
            _this.filesForCropper = __spread(_this.filesForCropper).filter((/**
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
        return combineLatest.apply(void 0, __spread(asyncFunctions)).pipe(map((/**
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
            for (var _b = __values(event.files), _c = _b.next(); !_c.done; _c = _b.next()) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CloseIconComponent = /** @class */ (function () {
    function CloseIconComponent() {
    }
    /**
     * @return {?}
     */
    CloseIconComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    CloseIconComponent.decorators = [
        { type: Component, args: [{
                    selector: 'close-icon',
                    template: "<div class=\"ngx-close-icon\"></div>\n",
                    styles: [":host{display:block;cursor:pointer}.ngx-close-icon{color:#fff;position:relative;margin-top:0;margin-left:0;width:1.3125em;height:1.3125em}.ngx-close-icon:before{content:\"\";position:absolute;top:.625em;width:1.3125em;height:.2em;background-color:currentColor;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.ngx-close-icon:after{content:\"\";position:absolute;top:.625em;width:1.3125em;height:.2em;background-color:currentColor;-webkit-transform:rotate(45deg);transform:rotate(45deg)}"]
                }] }
    ];
    /** @nocollapse */
    CloseIconComponent.ctorParameters = function () { return []; };
    return CloseIconComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FilePreviewItemComponent = /** @class */ (function () {
    function FilePreviewItemComponent(fileService) {
        this.fileService = fileService;
        this.removeFile = new EventEmitter();
        this.uploadSuccess = new EventEmitter();
        this.uploadFail = new EventEmitter();
        this.imageClicked = new EventEmitter();
        this.icon = 'checkmark';
    }
    /**
     * @return {?}
     */
    FilePreviewItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.uploadFile(this.fileItem);
        this.fileType = getFileType(this.fileItem.file.type);
        this.safeUrl = this.getSafeUrl(this.fileItem.file);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    FilePreviewItemComponent.prototype.getSafeUrl = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return this.fileService.createSafeUrl(file);
    };
    /** Converts bytes to nice size */
    /**
     * Converts bytes to nice size
     * @param {?} x
     * @return {?}
     */
    FilePreviewItemComponent.prototype.niceBytes = /**
     * Converts bytes to nice size
     * @param {?} x
     * @return {?}
     */
    function (x) {
        /** @type {?} */
        var units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        /** @type {?} */
        var l = 0;
        /** @type {?} */
        var n = parseInt(x, 10) || 0;
        while (n >= 1024 && ++l) {
            n = n / 1024;
        }
        // include a decimal point and a tenths-place digit if presenting
        // less than ten of KB or greater units
        return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
    };
    /** Retry file upload when upload was unsuccessfull */
    /**
     * Retry file upload when upload was unsuccessfull
     * @return {?}
     */
    FilePreviewItemComponent.prototype.onRetry = /**
     * Retry file upload when upload was unsuccessfull
     * @return {?}
     */
    function () {
        this.uploadFile(this.fileItem);
    };
    /**
     * @return {?}
     */
    FilePreviewItemComponent.prototype.onCheckMarkClick = /**
     * @return {?}
     */
    function () {
        this.icon = 'error';
    };
    /**
     * @param {?} fileItem
     * @return {?}
     */
    FilePreviewItemComponent.prototype.uploadFile = /**
     * @param {?} fileItem
     * @return {?}
     */
    function (fileItem) {
        var _this = this;
        if (this.adapter) {
            this.uploadSubscription =
                this.adapter.uploadFile(fileItem)
                    .subscribe((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    if (typeof res === 'string') {
                        _this.onUploadSuccess(res, fileItem);
                        _this.uploadProgress = undefined;
                    }
                    if (typeof res === 'number') {
                        _this.uploadProgress = res;
                        //  this.handleProgressResponse(<HttpEvent<any>>res, fileItem);
                    }
                }), (/**
                 * @param {?} er
                 * @return {?}
                 */
                function (er) {
                    _this.uploadError = true;
                    _this.uploadFail.next(er);
                    _this.uploadProgress = undefined;
                }));
        }
        else {
            console.warn('no adapter was provided');
        }
    };
    /** Emits event when file upload api returns success  */
    /**
     * Emits event when file upload api returns success
     * @param {?} id
     * @param {?} fileItem
     * @return {?}
     */
    FilePreviewItemComponent.prototype.onUploadSuccess = /**
     * Emits event when file upload api returns success
     * @param {?} id
     * @param {?} fileItem
     * @return {?}
     */
    function (id, fileItem) {
        this.fileId = id;
        this.fileItem.fileId = id;
        this.uploadSuccess.next(__assign({}, fileItem, { fileId: id }));
    };
    /**
     * @param {?} event
     * @param {?} fileName
     * @return {?}
     */
    FilePreviewItemComponent.prototype.handleProgressResponse = /**
     * @param {?} event
     * @param {?} fileName
     * @return {?}
     */
    function (event, fileName) {
        switch (event.type) {
            case HttpEventType.Sent:
                return;
            case HttpEventType.UploadProgress:
                // Compute and show the % done:
                this.uploadProgress = Math.round((100 * event.loaded) / event.total);
                return;
            case HttpEventType.Response:
                /** @type {?} */
                var body = event.body;
                if (body && body.data) {
                    // this.uploaded.next(res.data.toString());
                }
                this.uploadProgress = undefined;
                return;
            default:
                this.uploadProgress = undefined;
                return "File \"" + fileName + "\" surprising upload event: " + event.type + ".";
        }
    };
    /**
     * @param {?} fileItem
     * @return {?}
     */
    FilePreviewItemComponent.prototype.onRemove = /**
     * @param {?} fileItem
     * @return {?}
     */
    function (fileItem) {
        this.uploadUnsubscribe();
        this.removeFile.next(fileItem);
    };
    /** Cancel upload. Cancels request  */
    /**
     * Cancel upload. Cancels request
     * @return {?}
     */
    FilePreviewItemComponent.prototype.uploadUnsubscribe = /**
     * Cancel upload. Cancels request
     * @return {?}
     */
    function () {
        if (this.uploadSubscription) {
            this.uploadSubscription.unsubscribe();
        }
    };
    FilePreviewItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'file-preview-item',
                    template: "    <div class=\"file-preview-wrapper\" *ngIf=\"fileItem\" [ngClass] = \"{'visually-hidden': itemTemplate}\">\n\n\n        <div class=\"file-preview-thumbnail\">\n          <div class=\"img-preview-thumbnail\" *ngIf=\"fileType === 'image'\" >\n            <img [src]=\"safeUrl\" (click)=\"imageClicked.next(fileItem)\">\n          </div>\n          <div class=\"other-preview-thumbnail\"\n            *ngIf=\"fileType !== 'image'\"\n            [ngClass]=\"fileItem.fileName.split('.').pop()\"\n            >\n            {{fileItem.fileName.split('.').pop()}}\n          </div>\n          <div class=\"thumbnail-backdrop\">\n\n          </div>\n        </div>\n        <div class=\"file-preview-description\" >\n          <a class=\"file-preview-title\" [title]=\"fileItem.fileName\" href=\"javascript:void(0)\"><p>{{fileItem.fileName}}</p></a>\n          <div class=\"file-preview-size\">{{niceBytes(fileItem.file.size)}}</div>\n        </div>\n        <div class=\"file-preview-actions\" >\n            <div class=\"ngx-checkmark-wrapper\" (click)=\"onCheckMarkClick()\" *ngIf=\"(icon === 'checkmark') && !uploadError && !uploadProgress\" (mouseenter)=\"icon = 'close'\">\n              <span class=\"ngx-checkmark\"></span>\n            </div>\n            <refresh-icon *ngIf=\"uploadError\" (retry)=\"onRetry()\"></refresh-icon>\n            <a class=\"ngx-close-icon-wrapper\"\n            *ngIf= \"(icon === 'close') ||  uploadError || uploadProgress\"\n            (click)=\"onRemove(fileItem)\"\n             (mouseleave)=\"icon = 'checkmark'\"\n             title=\"{{captions?.previewCard?.remove}}\"\n             >\n              <close-icon></close-icon>\n            </a>\n        </div>\n        <!-- *ngIf=\"uploadProgress !== 100\"-->\n          <a class=\"file-upload-error-wrapper\" *ngIf=\"uploadError && !uploadProgress\" href=\"javascipt:void(0)\"\n          title=\"{{captions?.previewCard?.uploadError}}\">\n          </a>\n\n        <ng-container *ngIf=\"uploadProgress\">\n        <div class=\"file-upload-progress-bar-wrapper\"  >\n          <div class=\"file-upload-progress-bar\"  [ngStyle]=\"{ 'width': uploadProgress + '%' }\">\n          </div>\n        </div>\n\n        <div class=\"file-upload-percentage-wrapper\" >\n          <div class=\"file-upload-percentage\">{{uploadProgress}} %</div>\n          </div>\n        </ng-container>\n\n      </div>\n\n<ng-container *ngTemplateOutlet=\"itemTemplate;context: {fileItem: fileItem, uploadProgress: uploadProgress}\" > </ng-container>\n",
                    styles: [":host{display:block;padding:20px 16px;border-bottom:1px solid #ebeef1;max-width:440px;position:relative}.visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}.file-preview-wrapper{display:-webkit-box;display:flex;width:100%}.file-preview-wrapper .file-preview-thumbnail{position:relative;z-index:2;cursor:pointer}.file-preview-wrapper .file-preview-thumbnail .img-preview-thumbnail{width:36px;height:36px}.file-preview-wrapper .file-preview-thumbnail .img-preview-thumbnail img{width:100%;height:100%;-o-object-fit:cover;object-fit:cover;border-radius:6px}.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail{width:36px;height:36px;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;background:#706fd3;border-radius:4px;color:#fff;font-size:12px;font-weight:700;white-space:nowrap;overflow:hidden}.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.pdf{background:#e4394e}.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.doc,.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.docx{background:#2196f3}.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.xls,.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.xlsx{background:#4caf50}.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.ppt,.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.txt{background:#ff9800}.file-preview-wrapper .file-preview-thumbnail .thumbnail-backdrop{visibility:hidden;position:absolute;left:0;top:0;width:100%;height:100%;border-radius:6px;-webkit-transition:.1s ease-in-out;transition:.1s ease-in-out;pointer-events:none;background:rgba(43,56,71,.2)}.file-preview-wrapper .file-preview-thumbnail:hover .thumbnail-backdrop{visibility:visible}.file-preview-wrapper .file-preview-thumbnail:active .thumbnail-backdrop{visibility:visible;background:rgba(43,56,71,.4)}.file-preview-wrapper .file-preview-description{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:start;align-items:flex-start;padding-left:16px;padding-right:16px;color:#74809d;overflow:hidden;-webkit-box-flex:1;flex:1;z-index:2;position:relative}.file-preview-wrapper .file-preview-description .file-preview-title{font-weight:700;width:90%;text-decoration:none;color:#74809d;cursor:default}.file-preview-wrapper .file-preview-description .file-preview-title p{text-overflow:ellipsis;max-width:100%;overflow:hidden;white-space:nowrap;margin:0}.file-preview-wrapper .file-preview-description .file-preview-size{font-size:12px;color:#979fb8}.file-preview-wrapper .file-preview-actions{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;font-size:10px;z-index:3;position:relative}.file-preview-wrapper .file-preview-actions .ngx-checkmark-wrapper{position:relative;cursor:pointer;font-size:22px;height:20px;width:20px;border-radius:50%;background:#43d084;box-shadow:-1px 1px 6px rgba(67,208,132,.8)}.file-preview-wrapper .file-preview-actions .ngx-checkmark-wrapper .ngx-checkmark{position:absolute;top:0;left:0;height:19px;width:19px}.file-preview-wrapper .file-preview-actions .ngx-checkmark-wrapper .ngx-checkmark:after{content:\"\";position:absolute;display:block;left:7px;top:4px;width:3px;height:7px;border:1px solid #fff;border-width:0 3px 3px 0;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.file-preview-wrapper .file-preview-actions .ngx-close-icon-wrapper{border-radius:50%;background:#fe7676;padding:3px;box-shadow:-1px 1px 6px rgba(254,118,118,.8);cursor:pointer}.file-preview-wrapper .file-upload-percentage-wrapper,.file-preview-wrapper .file-upload-progress-bar-wrapper{position:absolute;z-index:1;width:100%;height:95%;left:0;top:0;bottom:0;margin:auto}.file-preview-wrapper .file-upload-progress-bar{background:#eef1fa;border-radius:6px;width:0%;height:95%;-webkit-transition:width .3s ease-in;transition:width .3s ease-in}.file-preview-wrapper .file-upload-percentage{padding-right:10%;color:#c2cdda;padding-top:5%;font-size:19px;text-align:right}.file-preview-wrapper .file-upload-error-wrapper{position:absolute;z-index:1;width:100%;height:95%;left:0;top:0;bottom:0;margin:auto;background:rgba(254,84,111,.06)}"]
                }] }
    ];
    /** @nocollapse */
    FilePreviewItemComponent.ctorParameters = function () { return [
        { type: FilePickerService }
    ]; };
    FilePreviewItemComponent.propDecorators = {
        removeFile: [{ type: Output }],
        uploadSuccess: [{ type: Output }],
        uploadFail: [{ type: Output }],
        imageClicked: [{ type: Output }],
        fileItem: [{ type: Input }],
        adapter: [{ type: Input }],
        itemTemplate: [{ type: Input }],
        captions: [{ type: Input }]
    };
    return FilePreviewItemComponent;
}());
if (false) {
    /** @type {?} */
    FilePreviewItemComponent.prototype.removeFile;
    /** @type {?} */
    FilePreviewItemComponent.prototype.uploadSuccess;
    /** @type {?} */
    FilePreviewItemComponent.prototype.uploadFail;
    /** @type {?} */
    FilePreviewItemComponent.prototype.imageClicked;
    /** @type {?} */
    FilePreviewItemComponent.prototype.fileItem;
    /** @type {?} */
    FilePreviewItemComponent.prototype.adapter;
    /** @type {?} */
    FilePreviewItemComponent.prototype.itemTemplate;
    /** @type {?} */
    FilePreviewItemComponent.prototype.captions;
    /** @type {?} */
    FilePreviewItemComponent.prototype.icon;
    /** @type {?} */
    FilePreviewItemComponent.prototype.uploadProgress;
    /** @type {?} */
    FilePreviewItemComponent.prototype.fileType;
    /** @type {?} */
    FilePreviewItemComponent.prototype.safeUrl;
    /** @type {?} */
    FilePreviewItemComponent.prototype.uploadError;
    /** @type {?} */
    FilePreviewItemComponent.prototype.uploadSubscription;
    /** @type {?} */
    FilePreviewItemComponent.prototype.fileId;
    /**
     * @type {?}
     * @private
     */
    FilePreviewItemComponent.prototype.fileService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FilePreviewContainerComponent = /** @class */ (function () {
    function FilePreviewContainerComponent() {
        this.removeFile = new EventEmitter();
        this.uploadSuccess = new EventEmitter();
        this.uploadFail = new EventEmitter();
    }
    /**
     * @return {?}
     */
    FilePreviewContainerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} file
     * @return {?}
     */
    FilePreviewContainerComponent.prototype.openLightbox = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        this.lightboxFile = file;
    };
    /**
     * @return {?}
     */
    FilePreviewContainerComponent.prototype.closeLightbox = /**
     * @return {?}
     */
    function () {
        this.lightboxFile = undefined;
    };
    FilePreviewContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'file-preview-container',
                    template: "<preview-lightbox *ngIf=\"lightboxFile\" [file]=\"lightboxFile\" (close)=\"closeLightbox()\"></preview-lightbox>\n<file-preview-item\n*ngFor=\"let file of previewFiles\"\n[fileItem]=\"file\"\n(removeFile)=\"removeFile.next($event)\"\n(uploadSuccess)=\"uploadSuccess.next($event)\"\n(uploadFail)=\"uploadFail.next($event)\"\n(imageClicked)=\"openLightbox($event)\"\n[itemTemplate]=\"itemTemplate\"\n[adapter]=\"adapter\"\n[captions]=\"captions\"\n></file-preview-item>\n",
                    styles: [":host{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:start;justify-content:flex-start;width:100%;background:#fafbfd}"]
                }] }
    ];
    /** @nocollapse */
    FilePreviewContainerComponent.ctorParameters = function () { return []; };
    FilePreviewContainerComponent.propDecorators = {
        previewFiles: [{ type: Input }],
        itemTemplate: [{ type: Input }],
        removeFile: [{ type: Output }],
        uploadSuccess: [{ type: Output }],
        uploadFail: [{ type: Output }],
        adapter: [{ type: Input }],
        captions: [{ type: Input }]
    };
    return FilePreviewContainerComponent;
}());
if (false) {
    /** @type {?} */
    FilePreviewContainerComponent.prototype.previewFiles;
    /** @type {?} */
    FilePreviewContainerComponent.prototype.itemTemplate;
    /** @type {?} */
    FilePreviewContainerComponent.prototype.removeFile;
    /** @type {?} */
    FilePreviewContainerComponent.prototype.uploadSuccess;
    /** @type {?} */
    FilePreviewContainerComponent.prototype.uploadFail;
    /** @type {?} */
    FilePreviewContainerComponent.prototype.lightboxFile;
    /** @type {?} */
    FilePreviewContainerComponent.prototype.adapter;
    /** @type {?} */
    FilePreviewContainerComponent.prototype.captions;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * fileEntry is an instance of {\@link FileSystemFileEntry} or {\@link FileSystemDirectoryEntry}.
 * Which one is it can be checked using {\@link FileSystemEntry.isFile} or {\@link FileSystemEntry.isDirectory}
 * properties of the given {\@link FileSystemEntry}.
 */
var /**
 * fileEntry is an instance of {\@link FileSystemFileEntry} or {\@link FileSystemDirectoryEntry}.
 * Which one is it can be checked using {\@link FileSystemEntry.isFile} or {\@link FileSystemEntry.isDirectory}
 * properties of the given {\@link FileSystemEntry}.
 */
UploadFile = /** @class */ (function () {
    function UploadFile(relativePath, fileEntry) {
        this.relativePath = relativePath;
        this.fileEntry = fileEntry;
    }
    return UploadFile;
}());
if (false) {
    /** @type {?} */
    UploadFile.prototype.relativePath;
    /** @type {?} */
    UploadFile.prototype.fileEntry;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var UploadEvent = /** @class */ (function () {
    function UploadEvent(files) {
        this.files = files;
    }
    return UploadEvent;
}());
if (false) {
    /** @type {?} */
    UploadEvent.prototype.files;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FileComponent = /** @class */ (function () {
    function FileComponent(zone, renderer) {
        var _this = this;
        this.zone = zone;
        this.renderer = renderer;
        this.customstyle = null;
        this.disableIf = false;
        this.onFileDrop = new EventEmitter();
        this.onFileOver = new EventEmitter();
        this.onFileLeave = new EventEmitter();
        this.stack = [];
        this.files = [];
        this.dragoverflag = false;
        this.globalDisable = false;
        this.numOfActiveReadEntries = 0;
        if (!this.customstyle) {
            this.customstyle = 'drop-zone';
        }
        this.globalStart = this.renderer.listen('document', 'dragstart', (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            _this.globalDisable = true;
        }));
        this.globalEnd = this.renderer.listen('document', 'dragend', (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            _this.globalDisable = false;
        }));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    FileComponent.prototype.onDragOver = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.globalDisable && !this.disableIf) {
            if (!this.dragoverflag) {
                this.dragoverflag = true;
                this.onFileOver.emit(event);
            }
            this.preventAndStop(event);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FileComponent.prototype.onDragLeave = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.globalDisable && !this.disableIf) {
            if (this.dragoverflag) {
                this.dragoverflag = false;
                this.onFileLeave.emit(event);
            }
            this.preventAndStop(event);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FileComponent.prototype.dropFiles = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (!this.globalDisable && !this.disableIf) {
            this.dragoverflag = false;
            event.dataTransfer.dropEffect = 'copy';
            /** @type {?} */
            var length_1;
            if (event.dataTransfer.items) {
                length_1 = event.dataTransfer.items.length;
            }
            else {
                length_1 = event.dataTransfer.files.length;
            }
            var _loop_1 = function (i) {
                /** @type {?} */
                var entry = void 0;
                if (event.dataTransfer.items) {
                    if (event.dataTransfer.items[i].webkitGetAsEntry) {
                        entry = event.dataTransfer.items[i].webkitGetAsEntry();
                    }
                }
                else {
                    if (event.dataTransfer.files[i].webkitGetAsEntry) {
                        entry = event.dataTransfer.files[i].webkitGetAsEntry();
                    }
                }
                if (!entry) {
                    /** @type {?} */
                    var file_1 = event.dataTransfer.files[i];
                    if (file_1) {
                        /** @type {?} */
                        var fakeFileEntry = {
                            name: file_1.name,
                            isDirectory: false,
                            isFile: true,
                            file: (/**
                             * @param {?} callback
                             * @return {?}
                             */
                            function (callback) {
                                callback(file_1);
                            })
                        };
                        /** @type {?} */
                        var toUpload = new UploadFile(fakeFileEntry.name, fakeFileEntry);
                        this_1.addToQueue(toUpload);
                    }
                }
                else {
                    if (entry.isFile) {
                        /** @type {?} */
                        var toUpload = new UploadFile(entry.name, entry);
                        this_1.addToQueue(toUpload);
                    }
                    else if (entry.isDirectory) {
                        this_1.traverseFileTree(entry, entry.name);
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < length_1; i++) {
                _loop_1(i);
            }
            this.preventAndStop(event);
            /** @type {?} */
            var timerObservable = timer(200, 200);
            this.subscription = timerObservable.subscribe((/**
             * @param {?} t
             * @return {?}
             */
            function (t) {
                if (_this.files.length > 0 && _this.numOfActiveReadEntries === 0) {
                    _this.onFileDrop.emit(new UploadEvent(_this.files));
                    _this.files = [];
                }
            }));
        }
    };
    /**
     * @private
     * @param {?} item
     * @param {?} path
     * @return {?}
     */
    FileComponent.prototype.traverseFileTree = /**
     * @private
     * @param {?} item
     * @param {?} path
     * @return {?}
     */
    function (item, path) {
        var _this = this;
        if (item.isFile) {
            /** @type {?} */
            var toUpload = new UploadFile(path, item);
            this.files.push(toUpload);
            this.zone.run((/**
             * @return {?}
             */
            function () {
                _this.popToStack();
            }));
        }
        else {
            this.pushToStack(path);
            path = path + '/';
            /** @type {?} */
            var dirReader_1 = ((/** @type {?} */ (item))).createReader();
            /** @type {?} */
            var entries_1 = [];
            /** @type {?} */
            var thisObj_1 = this;
            /** @type {?} */
            var readEntries_1 = (/**
             * @return {?}
             */
            function () {
                thisObj_1.numOfActiveReadEntries++;
                dirReader_1.readEntries((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    if (!res.length) {
                        // add empty folders
                        if (entries_1.length === 0) {
                            /** @type {?} */
                            var toUpload_1 = new UploadFile(path, item);
                            thisObj_1.zone.run((/**
                             * @return {?}
                             */
                            function () {
                                thisObj_1.addToQueue(toUpload_1);
                            }));
                        }
                        else {
                            var _loop_2 = function (i) {
                                thisObj_1.zone.run((/**
                                 * @return {?}
                                 */
                                function () {
                                    thisObj_1.traverseFileTree(entries_1[i], path + entries_1[i].name);
                                }));
                            };
                            for (var i = 0; i < entries_1.length; i++) {
                                _loop_2(i);
                            }
                        }
                        thisObj_1.zone.run((/**
                         * @return {?}
                         */
                        function () {
                            thisObj_1.popToStack();
                        }));
                    }
                    else {
                        // continue with the reading
                        entries_1 = entries_1.concat(res);
                        readEntries_1();
                    }
                    thisObj_1.numOfActiveReadEntries--;
                }));
            });
            readEntries_1();
        }
    };
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    FileComponent.prototype.addToQueue = /**
     * @private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.files.push(item);
    };
    /**
     * @param {?} str
     * @return {?}
     */
    FileComponent.prototype.pushToStack = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        this.stack.push(str);
    };
    /**
     * @return {?}
     */
    FileComponent.prototype.popToStack = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value = this.stack.pop();
    };
    /**
     * @private
     * @return {?}
     */
    FileComponent.prototype.clearQueue = /**
     * @private
     * @return {?}
     */
    function () {
        this.files = [];
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    FileComponent.prototype.preventAndStop = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        event.preventDefault();
    };
    /**
     * @return {?}
     */
    FileComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.globalStart();
        this.globalEnd();
    };
    FileComponent.decorators = [
        { type: Component, args: [{
                    selector: 'file-drop',
                    template: "<div id=\"dropZone\"  [className]=\"customstyle\" [class.over]=\"dragoverflag\"\n    (drop)=\"dropFiles($event)\"\n    (dragover)=\"onDragOver($event)\" (dragleave)=\"onDragLeave($event)\">\n\n    <div #ref class=\"custom-dropzone\" >\n      <ng-content></ng-content>\n      </div>\n\n    <div class=\"content\" *ngIf=\"ref.children?.length == 0\">\n             <cloud-icon></cloud-icon>\n              <div class=\"content-top-text\">\n                {{captions?.dropzone?.title}}\n              </div>\n              <div class=\"content-center-text\">\n                {{captions?.dropzone?.or}}\n              </div>\n              <button class=\"file-browse-button\">\n                {{captions?.dropzone?.browse}}\n              </button>\n    </div>\n</div>\n",
                    styles: [":host{display:block;width:100%;padding:0 16px}#dropZone{max-width:440px;margin:auto;border:2px dashed #e8e0f5;border-radius:6px;padding:56px 0;background:#fff}.file-browse-button{padding:12px 18px;background:#673ab7;border:0;outline:0;font-size:14px;color:#fff;font-weight:700;border-radius:6px;cursor:pointer}.content{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center}.over{background-color:rgba(147,147,147,.5)}.content-top-text{font-size:18px;font-weight:700;color:#5b5b7b}.content-center-text{color:#90a0bc;margin:12px 0;font-size:14px}"]
                }] }
    ];
    /** @nocollapse */
    FileComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: Renderer2 }
    ]; };
    FileComponent.propDecorators = {
        captions: [{ type: Input }],
        customstyle: [{ type: Input }],
        disableIf: [{ type: Input }],
        onFileDrop: [{ type: Output }],
        onFileOver: [{ type: Output }],
        onFileLeave: [{ type: Output }]
    };
    return FileComponent;
}());
if (false) {
    /** @type {?} */
    FileComponent.prototype.captions;
    /** @type {?} */
    FileComponent.prototype.customstyle;
    /** @type {?} */
    FileComponent.prototype.disableIf;
    /** @type {?} */
    FileComponent.prototype.onFileDrop;
    /** @type {?} */
    FileComponent.prototype.onFileOver;
    /** @type {?} */
    FileComponent.prototype.onFileLeave;
    /** @type {?} */
    FileComponent.prototype.stack;
    /** @type {?} */
    FileComponent.prototype.files;
    /** @type {?} */
    FileComponent.prototype.subscription;
    /** @type {?} */
    FileComponent.prototype.dragoverflag;
    /** @type {?} */
    FileComponent.prototype.globalDisable;
    /** @type {?} */
    FileComponent.prototype.globalStart;
    /** @type {?} */
    FileComponent.prototype.globalEnd;
    /** @type {?} */
    FileComponent.prototype.numOfActiveReadEntries;
    /**
     * @type {?}
     * @private
     */
    FileComponent.prototype.zone;
    /**
     * @type {?}
     * @private
     */
    FileComponent.prototype.renderer;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CloudIconComponent = /** @class */ (function () {
    function CloudIconComponent() {
    }
    /**
     * @return {?}
     */
    CloudIconComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    CloudIconComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cloud-icon',
                    template: "    <div class=\"cloud-upload-icon\"><i></i></div>\n",
                    styles: [":host{display:block;font-size:48px;margin-bottom:.4em;height:1.36em;width:1.36em;position:relative}.cloud-upload-icon{color:#000;position:absolute;margin-left:.0625em;margin-top:.5625em;width:.3725em;height:.49em;border-radius:.25em 0 0 .25em;border-left:.0625em solid #673ab7;border-top:.0625em solid #673ab7;border-bottom:.0625em solid #673ab7}.cloud-upload-icon:before{content:\"\";position:absolute;top:-.4375em;left:.25em;width:.75em;height:.75em;border-radius:50%;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);border-left:.0625em solid transparent;border-right:.0625em solid #673ab7;border-top:.0625em solid #673ab7;border-bottom:.0625em solid #673ab7}.cloud-upload-icon:after{content:\"\";position:absolute;top:.3125em;left:.3125em;width:.5625em;height:.125em;color:#fff;background-color:#673ab7}.cloud-upload-icon i{position:absolute;left:.3125em;top:-.25em;z-index:2}.cloud-upload-icon i:before{content:\"\";position:absolute;top:.25em;left:.0625em;width:.0625em;height:.4375em;background-color:#673ab7;border-left:.25em solid #fff;border-right:.25em solid #fff}.cloud-upload-icon i:after{content:\"\";position:absolute;left:.1875em;top:.25em;width:.25em;height:.25em;border-top:.0625em solid #673ab7;border-right:.0625em solid #673ab7;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}"]
                }] }
    ];
    /** @nocollapse */
    CloudIconComponent.ctorParameters = function () { return []; };
    return CloudIconComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FileDropModule = /** @class */ (function () {
    function FileDropModule() {
    }
    FileDropModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FileComponent,
                        CloudIconComponent
                    ],
                    exports: [FileComponent],
                    imports: [CommonModule],
                    providers: [],
                    bootstrap: [FileComponent],
                },] }
    ];
    return FileDropModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PreviewLightboxComponent = /** @class */ (function () {
    function PreviewLightboxComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.close = new EventEmitter();
    }
    /**
     * @return {?}
     */
    PreviewLightboxComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.getSafeUrl(this.file.file);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    PreviewLightboxComponent.prototype.getSafeUrl = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        /** @type {?} */
        var url = window.URL.createObjectURL(file);
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PreviewLightboxComponent.prototype.onClose = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.close.next();
    };
    PreviewLightboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'preview-lightbox',
                    template: "<div class=\"ng-modal-backdrop\" (click)=\"onClose($event)\">\n\n</div>\n\n<div class=\"ng-modal-content\" >\n  <div class=\"close-icon-wrapper\" (click)=\"onClose($event)\">\n      <close-icon></close-icon>\n  </div>\n  <div class=\"lightbox-item\" >\n    <img [src]=\"safeUrl\" (load)=\"loaded = true\" [ngStyle]=\"{'visibility': loaded ? 'visible' : 'hidden'}\">\n  </div>\n </div>\n",
                    styles: [":host{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;position:fixed;z-index:1040;left:0;top:0;width:100vw;height:100vh;overflow:hidden}.ng-modal-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;background:rgba(0,0,0,.288)}.ng-modal-content{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;color:rgba(0,0,0,.87);z-index:1041}.ng-modal-content .close-icon-wrapper{position:absolute;top:20px;right:20px;font-size:20px}.ng-modal-content .lightbox-item img{max-width:calc(100vw - 30px);max-height:calc(100vh - 30px);width:100%;height:auto;-o-object-fit:contain;object-fit:contain;-webkit-animation-name:zoomIn;animation-name:zoomIn;-webkit-animation-duration:.2s;animation-duration:.2s}@-webkit-keyframes zoomIn{from{opacity:0;-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}50%{opacity:1}}@keyframes zoomIn{from{opacity:0;-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}50%{opacity:1}}"]
                }] }
    ];
    /** @nocollapse */
    PreviewLightboxComponent.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    PreviewLightboxComponent.propDecorators = {
        file: [{ type: Input }],
        close: [{ type: Output }]
    };
    return PreviewLightboxComponent;
}());
if (false) {
    /** @type {?} */
    PreviewLightboxComponent.prototype.file;
    /** @type {?} */
    PreviewLightboxComponent.prototype.close;
    /** @type {?} */
    PreviewLightboxComponent.prototype.loaded;
    /** @type {?} */
    PreviewLightboxComponent.prototype.safeUrl;
    /**
     * @type {?}
     * @private
     */
    PreviewLightboxComponent.prototype.sanitizer;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RefreshIconComponent = /** @class */ (function () {
    function RefreshIconComponent() {
        this.retry = new EventEmitter();
    }
    /**
     * @return {?}
     */
    RefreshIconComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    RefreshIconComponent.decorators = [
        { type: Component, args: [{
                    selector: 'refresh-icon',
                    template: "<a class=\"upload-refresh-icon\" title=\"Retry\" (click)=\"retry.next()\">\n",
                    styles: [":host{display:block;margin-right:12px;font-size:19px}.upload-refresh-icon{display:block;color:grey;-webkit-transform:rotateZ(-180deg);transform:rotateZ(-180deg);position:relative;margin-left:.25em;margin-top:.1875em;width:.75em;height:.75em;border-radius:50%;border-top:.0625em solid currentColor;border-bottom:.0625em solid currentColor;border-left:.0625em solid transparent;border-right:.0625em solid currentColor;text-decoration:none;-webkit-transition:color .1s ease-in-out;transition:color .1s ease-in-out;cursor:pointer}.upload-refresh-icon:hover{color:#668ee9}.upload-refresh-icon:before{content:\"\";position:absolute;left:.0625em;top:.625em;width:.1875em;height:.1875em;border-top:.0625em solid currentColor;border-left:.0625em solid currentColor;-webkit-transform:rotate(-22.5deg);transform:rotate(-22.5deg)}"]
                }] }
    ];
    /** @nocollapse */
    RefreshIconComponent.ctorParameters = function () { return []; };
    RefreshIconComponent.propDecorators = {
        retry: [{ type: Output }]
    };
    return RefreshIconComponent;
}());
if (false) {
    /** @type {?} */
    RefreshIconComponent.prototype.retry;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FilePickerModule = /** @class */ (function () {
    function FilePickerModule() {
    }
    FilePickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FileDropModule,
                        ImageCropperModule
                    ],
                    declarations: [
                        FilePickerComponent,
                        FilePreviewContainerComponent,
                        FilePreviewItemComponent,
                        PreviewLightboxComponent,
                        RefreshIconComponent,
                        CloseIconComponent
                    ],
                    exports: [FilePickerComponent],
                    providers: [FilePickerService]
                },] }
    ];
    return FilePickerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function FilePreviewModel() { }
if (false) {
    /** @type {?|undefined} */
    FilePreviewModel.prototype.fileId;
    /** @type {?} */
    FilePreviewModel.prototype.file;
    /** @type {?} */
    FilePreviewModel.prototype.fileName;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function UploaderCaptions() { }
if (false) {
    /** @type {?} */
    UploaderCaptions.prototype.dropzone;
    /** @type {?} */
    UploaderCaptions.prototype.cropper;
    /** @type {?} */
    UploaderCaptions.prototype.previewCard;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { FilePickerAdapter, FilePickerComponent, FilePickerModule, FilePickerService, FileValidationTypes, FileDropModule as ɵa, FileComponent as ɵb, CloudIconComponent as ɵc, FilePreviewContainerComponent as ɵd, FilePreviewItemComponent as ɵe, PreviewLightboxComponent as ɵf, RefreshIconComponent as ɵg, CloseIconComponent as ɵh };
//# sourceMappingURL=ngx-awesome-uploader.js.map
