(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/raw-loader/index.js!./projects/file-picker/src/lib/file-drop/file-drop.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./projects/file-picker/src/lib/file-drop/file-drop.component.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"dropZone\"  [className]=\"customstyle\" [class.over]=\"dragoverflag\"\n    (drop)=\"dropFiles($event)\"\n    (dragover)=\"onDragOver($event)\" (dragleave)=\"onDragLeave($event)\">\n\n    <div #ref class=\"custom-dropzone\" >\n      <ng-content></ng-content>\n      </div>\n\n    <div class=\"content\" *ngIf=\"ref.children?.length == 0\">\n             <cloud-icon></cloud-icon>\n              <div class=\"content-top-text\">\n                {{captions?.dropzone?.title}}\n              </div>\n              <div class=\"content-center-text\">\n                {{captions?.dropzone?.or}}\n              </div>\n              <button class=\"file-browse-button\">\n                {{captions?.dropzone?.browse}}\n              </button>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./projects/file-picker/src/lib/file-picker.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./projects/file-picker/src/lib/file-picker.component.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div\n(click)=\"fileInput.click()\"\nclass=\"file-drop-wrapper\"\n*ngIf=\"showeDragDropZone\"\n>\n<file-drop\n  (onFileDrop)=\"dropped($event)\"\n  [customstyle]=\"'custom-drag'\"\n  [captions]=\"_captions\"\n>\n  <ng-content select=\".dropzoneTemplate\"> </ng-content>\n</file-drop>\n</div>\n\n<input\ntype=\"file\"\nname=\"file[]\"\nid=\"fileInput\"\n#fileInput\n[multiple]=\"uploadType === 'multi' ? 'multiple' : ''\"\n(click)=\"fileInput.value = null\"\n(change)=\"onChange(fileInput)\"\n[accept]=\"accept\"\nclass=\"file-input\"\n/>\n\n<div class=\"cropperJsOverlay\" *ngIf=\"currentCropperFile\">\n<div class=\"cropperJsBox\">\n  <img\n    [src]=\"safeCropImgUrl\"\n    id=\"cropper-img\"\n    (load)=\"cropperImgLoaded($event)\"\n  />\n  <div class=\"cropper-actions\">\n    <button class=\"cropSubmit\" (click)=\"onCropSubmit()\">\n      {{ _captions?.cropper?.crop }}\n    </button>\n    <button\n      class=\"cropCancel\"\n      (click)=\"\n        closeCropper({\n          file: currentCropperFile,\n          fileName: currentCropperFile.name\n        })\n      \"\n    >\n      {{ _captions?.cropper?.cancel }}\n    </button>\n  </div>\n</div>\n</div>\n<div\nclass=\"files-preview-wrapper\"\n[ngClass]=\"{ 'visually-hidden': !showPreviewContainer }\"\n>\n<file-preview-container\n  *ngIf=\"files\"\n  [previewFiles]=\"files\"\n  (removeFile)=\"removeFile($event)\"\n  (uploadSuccess)=\"onUploadSuccess($event)\"\n  [adapter]=\"adapter\"\n  [itemTemplate]=\"itemTemplate\"\n  [captions]=\"_captions\"\n>\n</file-preview-container>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./projects/file-picker/src/lib/file-preview-container/file-preview-container.component.html":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./projects/file-picker/src/lib/file-preview-container/file-preview-container.component.html ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<preview-lightbox *ngIf=\"lightboxFile\" [file]=\"lightboxFile\" (close)=\"closeLightbox()\"></preview-lightbox>\n<file-preview-item\n*ngFor=\"let file of previewFiles\"\n[fileItem]=\"file\"\n(removeFile)=\"removeFile.next($event)\"\n(uploadSuccess)=\"uploadSuccess.next($event)\"\n(uploadFail)=\"uploadFail.next($event)\"\n(imageClicked)=\"openLightbox($event)\"\n[itemTemplate]=\"itemTemplate\"\n[adapter]=\"adapter\"\n[captions]=\"captions\"\n></file-preview-item>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./projects/file-picker/src/lib/file-preview-container/file-preview-item/file-preview-item.component.html":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./projects/file-picker/src/lib/file-preview-container/file-preview-item/file-preview-item.component.html ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "    <div class=\"file-preview-wrapper\" *ngIf=\"fileItem\" [ngClass] = \"{'visually-hidden': itemTemplate}\">\n\n\n        <div class=\"file-preview-thumbnail\">\n          <div class=\"img-preview-thumbnail\" *ngIf=\"fileType === 'image'\" >\n            <img [src]=\"safeUrl\" (click)=\"imageClicked.next(fileItem)\">\n          </div>\n          <div class=\"other-preview-thumbnail\"\n            *ngIf=\"fileType !== 'image'\"\n            [ngClass]=\"fileItem.fileName.split('.').pop()\"\n            >\n            {{fileItem.fileName.split('.').pop()}}\n          </div>\n          <div class=\"thumbnail-backdrop\">\n\n          </div>\n        </div>\n        <div class=\"file-preview-description\" >\n          <a class=\"file-preview-title\" [title]=\"fileItem.fileName\" href=\"javascript:void(0)\"><p>{{fileItem.fileName}}</p></a>\n          <div class=\"file-preview-size\">{{niceBytes(fileItem.file.size)}}</div>\n        </div>\n        <div class=\"file-preview-actions\" >\n            <div class=\"ngx-checkmark-wrapper\" (click)=\"onCheckMarkClick()\" *ngIf=\"(icon === 'checkmark') && !uploadError && !uploadProgress\" (mouseenter)=\"icon = 'close'\">\n              <span class=\"ngx-checkmark\"></span>\n            </div>\n            <refresh-icon *ngIf=\"uploadError\" (retry)=\"onRetry()\"></refresh-icon>\n            <a class=\"ngx-close-icon-wrapper\"\n            *ngIf= \"(icon === 'close') ||  uploadError || uploadProgress\"\n            (click)=\"onRemove(fileItem)\"\n             (mouseleave)=\"icon = 'checkmark'\"\n             title=\"{{captions?.previewCard?.remove}}\"\n             >\n              <close-icon></close-icon>\n            </a>\n        </div>\n        <!-- *ngIf=\"uploadProgress !== 100\"-->\n          <a class=\"file-upload-error-wrapper\" *ngIf=\"uploadError && !uploadProgress\" href=\"javascipt:void(0)\"\n          title=\"{{captions?.previewCard?.uploadError}}\">\n          </a>\n\n        <ng-container *ngIf=\"uploadProgress\">\n        <div class=\"file-upload-progress-bar-wrapper\"  >\n          <div class=\"file-upload-progress-bar\"  [ngStyle]=\"{ 'width': uploadProgress + '%' }\">\n          </div>\n        </div>\n\n        <div class=\"file-upload-percentage-wrapper\" >\n          <div class=\"file-upload-percentage\">{{uploadProgress}} %</div>\n          </div>\n        </ng-container>\n\n      </div>\n\n<ng-container *ngTemplateOutlet=\"itemTemplate;context: {fileItem: fileItem, uploadProgress: uploadProgress}\" > </ng-container>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./projects/file-picker/src/lib/file-preview-container/file-preview-item/refresh-icon/refresh-icon.component.html":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./projects/file-picker/src/lib/file-preview-container/file-preview-item/refresh-icon/refresh-icon.component.html ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<a class=\"upload-refresh-icon\" title=\"Retry\" (click)=\"retry.next()\">\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./projects/file-picker/src/lib/file-preview-container/preview-lightbox/preview-lightbox.component.html":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./projects/file-picker/src/lib/file-preview-container/preview-lightbox/preview-lightbox.component.html ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"ng-modal-backdrop\" (click)=\"onClose($event)\">\n\n</div>\n\n<div class=\"ng-modal-content\" >\n  <div class=\"close-icon-wrapper\" (click)=\"onClose($event)\">\n      <close-icon></close-icon>\n  </div>\n  <div class=\"lightbox-item\" >\n    <img [src]=\"safeUrl\" (load)=\"loaded = true\" [ngStyle]=\"{'visibility': loaded ? 'visible' : 'hidden'}\">\n  </div>\n </div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./projects/file-picker/src/lib/icons/close-icon/close-icon.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./projects/file-picker/src/lib/icons/close-icon/close-icon.component.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"ngx-close-icon\"></div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./projects/file-picker/src/lib/icons/cloud-icon/cloud-icon.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./projects/file-picker/src/lib/icons/cloud-icon/cloud-icon.component.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "    <div class=\"cloud-upload-icon\"><i></i></div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<demo-file-picker> </demo-file-picker>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/demo-file-picker/demo-file-picker.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/demo-file-picker/demo-file-picker.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"position: fixed;width: 100vw;height: 80vh;display: flex;align-items: center;justify-content: center\">\n  <ngx-file-picker #uploader\n    [totalMaxSize]=\"0.5\"\n    [fileMaxCount]=\"1\"\n    [fileMaxSize]=\"200\"\n    [uploadType]=\"'multi'\"\n    (validationError)= \"onValidationError($event)\"\n    [adapter]=\"adapter\"\n    [fileExtensions]=\"['pdf', 'jpg', 'png', 'PNG', 'mp4', 'css', 'docx', 'txt']\"\n    [enableCropper]=\"false\"\n    (uploadSuccess)=\"onUploadSuccess($event)\"\n    (uploadFail)=\"onUploadFail($event)\"\n    (removeSuccess)=\"onRemoveSuccess($event)\"\n    [showeDragDropZone]=\"true\"\n    [showPreviewContainer]=\"true\"\n    [customValidator]=\"myCustomValidator\"\n    [accept]=\"'image/*'\"\n    [captions]=\"captions\"\n    (fileAdded)=\"onFileAdded($event)\"\n >\n  <!-- <div class=\"dropzoneTemplate\">\n    <button>Custom</button>\n  </div> -->\n</ngx-file-picker>\n<!-- <button (click)=\"removeFile()\">Remove First File</button> -->\n\n</div>\n\n<ng-template #itemTemplate let-fileItem=\"fileItem\" let-uploadProgress=\"uploadProgress\">\n  <p>{{fileItem.file.size}}</p>\n  <p>{{fileItem.fileName}}</p>\n  <p>{{uploadProgress}}</p>\n  <button (click)=\"uploader.removeFile(fileItem)\">Remove</button>\n</ng-template>\n"

/***/ }),

/***/ "./projects/file-picker/src/lib/default-captions.ts":
/*!**********************************************************!*\
  !*** ./projects/file-picker/src/lib/default-captions.ts ***!
  \**********************************************************/
/*! exports provided: DefaultCaptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultCaptions", function() { return DefaultCaptions; });
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


/***/ }),

/***/ "./projects/file-picker/src/lib/file-drop/dom.types.ts":
/*!*************************************************************!*\
  !*** ./projects/file-picker/src/lib/file-drop/dom.types.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./projects/file-picker/src/lib/file-drop/file-drop.component.scss":
/*!*************************************************************************!*\
  !*** ./projects/file-picker/src/lib/file-drop/file-drop.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: 100%;\n  padding: 0 16px;\n}\n\n#dropZone {\n  max-width: 440px;\n  margin: auto;\n  border: 2px dashed #e8e0f5;\n  border-radius: 6px;\n  padding: 56px 0;\n  background: #ffffff;\n}\n\n.file-browse-button {\n  padding: 12px 18px;\n  background: #673ab7;\n  border: 0;\n  outline: 0;\n  font-size: 14px;\n  color: #ffffff;\n  font-weight: 700;\n  border-radius: 6px;\n  cursor: pointer;\n}\n\n.content {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.over {\n  background-color: rgba(147, 147, 147, 0.5);\n}\n\n.content-top-text {\n  font-size: 18px;\n  font-weight: bold;\n  font-weight: bold;\n  color: #5b5b7b;\n}\n\n.content-center-text {\n  color: #90a0bc;\n  margin: 12px 0;\n  font-size: 14px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JlZGxvYnN0ZXIvcHJvamVjdHMvbmd4LWF3ZXNvbWUtdXBsb2FkZXIvcHJvamVjdHMvZmlsZS1waWNrZXIvc3JjL2xpYi9maWxlLWRyb3AvZmlsZS1kcm9wLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvZmlsZS1waWNrZXIvc3JjL2xpYi9maWxlLWRyb3AvZmlsZS1kcm9wLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FDQ0Y7O0FEQ0E7RUFDRSxnQkFBQTtFQUNBLFlBQUE7RUFDQSwwQkFBQTtFQUVBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0FDQ0Y7O0FEQ0E7RUFDRSxrQkFBQTtFQUNBLG1CQUFBO0VBRUEsU0FBQTtFQUNBLFVBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FDQ0Y7O0FEQ0E7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw0QkFBQTtFQUFBLDZCQUFBO1VBQUEsc0JBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtBQ0VGOztBREFBO0VBQ0UsMENBQUE7QUNHRjs7QUREQTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtBQ0lGOztBREZBO0VBQ0UsY0FBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0FDS0YiLCJmaWxlIjoicHJvamVjdHMvZmlsZS1waWNrZXIvc3JjL2xpYi9maWxlLWRyb3AvZmlsZS1kcm9wLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDAgMTZweDtcbn1cbiNkcm9wWm9uZSB7XG4gIG1heC13aWR0aDogNDQwcHg7XG4gIG1hcmdpbjogYXV0bztcbiAgYm9yZGVyOiAycHggZGFzaGVkICNlOGUwZjU7XG4gLy8gYm9yZGVyOiAycHggZGFzaGVkICNjMmNkZGE7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgcGFkZGluZzogNTZweCAwO1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xufVxuLmZpbGUtYnJvd3NlLWJ1dHRvbiB7XG4gIHBhZGRpbmc6IDEycHggMThweDtcbiAgYmFja2dyb3VuZDogIzY3M2FiNztcbiAvLyBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjM2E4ZmZlIDAsICM5NjU4ZmUgMTAwJSk7XG4gIGJvcmRlcjogMDtcbiAgb3V0bGluZTogMDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLm92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE0NywgMTQ3LCAxNDcsIDAuNSk7XG59XG4uY29udGVudC10b3AtdGV4dCB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogIzViNWI3Yjtcbn1cbi5jb250ZW50LWNlbnRlci10ZXh0IHtcbiAgY29sb3I6ICM5MGEwYmM7XG4gIG1hcmdpbjogMTJweCAwO1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cblxuXG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMCAxNnB4O1xufVxuXG4jZHJvcFpvbmUge1xuICBtYXgtd2lkdGg6IDQ0MHB4O1xuICBtYXJnaW46IGF1dG87XG4gIGJvcmRlcjogMnB4IGRhc2hlZCAjZThlMGY1O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIHBhZGRpbmc6IDU2cHggMDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbn1cblxuLmZpbGUtYnJvd3NlLWJ1dHRvbiB7XG4gIHBhZGRpbmc6IDEycHggMThweDtcbiAgYmFja2dyb3VuZDogIzY3M2FiNztcbiAgYm9yZGVyOiAwO1xuICBvdXRsaW5lOiAwO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBmb250LXdlaWdodDogNzAwO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmNvbnRlbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLm92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE0NywgMTQ3LCAxNDcsIDAuNSk7XG59XG5cbi5jb250ZW50LXRvcC10ZXh0IHtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGNvbG9yOiAjNWI1YjdiO1xufVxuXG4uY29udGVudC1jZW50ZXItdGV4dCB7XG4gIGNvbG9yOiAjOTBhMGJjO1xuICBtYXJnaW46IDEycHggMDtcbiAgZm9udC1zaXplOiAxNHB4O1xufSJdfQ== */"

/***/ }),

/***/ "./projects/file-picker/src/lib/file-drop/file-drop.component.ts":
/*!***********************************************************************!*\
  !*** ./projects/file-picker/src/lib/file-drop/file-drop.component.ts ***!
  \***********************************************************************/
/*! exports provided: FileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileComponent", function() { return FileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _upload_file_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./upload-file.model */ "./projects/file-picker/src/lib/file-drop/upload-file.model.ts");
/* harmony import */ var _upload_event_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./upload-event.model */ "./projects/file-picker/src/lib/file-drop/upload-event.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FileComponent = /** @class */ (function () {
    function FileComponent(zone, renderer) {
        var _this = this;
        this.zone = zone;
        this.renderer = renderer;
        this.customstyle = null;
        this.disableIf = false;
        this.onFileDrop = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onFileOver = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onFileLeave = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.stack = [];
        this.files = [];
        this.dragoverflag = false;
        this.globalDisable = false;
        this.numOfActiveReadEntries = 0;
        if (!this.customstyle) {
            this.customstyle = 'drop-zone';
        }
        this.globalStart = this.renderer.listen('document', 'dragstart', function (evt) {
            _this.globalDisable = true;
        });
        this.globalEnd = this.renderer.listen('document', 'dragend', function (evt) {
            _this.globalDisable = false;
        });
    }
    FileComponent.prototype.onDragOver = function (event) {
        if (!this.globalDisable && !this.disableIf) {
            if (!this.dragoverflag) {
                this.dragoverflag = true;
                this.onFileOver.emit(event);
            }
            this.preventAndStop(event);
        }
    };
    FileComponent.prototype.onDragLeave = function (event) {
        if (!this.globalDisable && !this.disableIf) {
            if (this.dragoverflag) {
                this.dragoverflag = false;
                this.onFileLeave.emit(event);
            }
            this.preventAndStop(event);
        }
    };
    FileComponent.prototype.dropFiles = function (event) {
        var _this = this;
        if (!this.globalDisable && !this.disableIf) {
            this.dragoverflag = false;
            event.dataTransfer.dropEffect = 'copy';
            var length_1;
            if (event.dataTransfer.items) {
                length_1 = event.dataTransfer.items.length;
            }
            else {
                length_1 = event.dataTransfer.files.length;
            }
            var _loop_1 = function (i) {
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
                    var file_1 = event.dataTransfer.files[i];
                    if (file_1) {
                        var fakeFileEntry = {
                            name: file_1.name,
                            isDirectory: false,
                            isFile: true,
                            file: function (callback) {
                                callback(file_1);
                            }
                        };
                        var toUpload = new _upload_file_model__WEBPACK_IMPORTED_MODULE_2__["UploadFile"](fakeFileEntry.name, fakeFileEntry);
                        this_1.addToQueue(toUpload);
                    }
                }
                else {
                    if (entry.isFile) {
                        var toUpload = new _upload_file_model__WEBPACK_IMPORTED_MODULE_2__["UploadFile"](entry.name, entry);
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
            var timerObservable = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["timer"])(200, 200);
            this.subscription = timerObservable.subscribe(function (t) {
                if (_this.files.length > 0 && _this.numOfActiveReadEntries === 0) {
                    _this.onFileDrop.emit(new _upload_event_model__WEBPACK_IMPORTED_MODULE_3__["UploadEvent"](_this.files));
                    _this.files = [];
                }
            });
        }
    };
    FileComponent.prototype.traverseFileTree = function (item, path) {
        var _this = this;
        if (item.isFile) {
            var toUpload = new _upload_file_model__WEBPACK_IMPORTED_MODULE_2__["UploadFile"](path, item);
            this.files.push(toUpload);
            this.zone.run(function () {
                _this.popToStack();
            });
        }
        else {
            this.pushToStack(path);
            path = path + '/';
            var dirReader_1 = item.createReader();
            var entries_1 = [];
            var thisObj_1 = this;
            var readEntries_1 = function () {
                thisObj_1.numOfActiveReadEntries++;
                dirReader_1.readEntries(function (res) {
                    if (!res.length) {
                        // add empty folders
                        if (entries_1.length === 0) {
                            var toUpload_1 = new _upload_file_model__WEBPACK_IMPORTED_MODULE_2__["UploadFile"](path, item);
                            thisObj_1.zone.run(function () {
                                thisObj_1.addToQueue(toUpload_1);
                            });
                        }
                        else {
                            var _loop_2 = function (i) {
                                thisObj_1.zone.run(function () {
                                    thisObj_1.traverseFileTree(entries_1[i], path + entries_1[i].name);
                                });
                            };
                            for (var i = 0; i < entries_1.length; i++) {
                                _loop_2(i);
                            }
                        }
                        thisObj_1.zone.run(function () {
                            thisObj_1.popToStack();
                        });
                    }
                    else {
                        // continue with the reading
                        entries_1 = entries_1.concat(res);
                        readEntries_1();
                    }
                    thisObj_1.numOfActiveReadEntries--;
                });
            };
            readEntries_1();
        }
    };
    FileComponent.prototype.addToQueue = function (item) {
        this.files.push(item);
    };
    FileComponent.prototype.pushToStack = function (str) {
        this.stack.push(str);
    };
    FileComponent.prototype.popToStack = function () {
        var value = this.stack.pop();
    };
    FileComponent.prototype.clearQueue = function () {
        this.files = [];
    };
    FileComponent.prototype.preventAndStop = function (event) {
        event.stopPropagation();
        event.preventDefault();
    };
    FileComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.globalStart();
        this.globalEnd();
    };
    FileComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FileComponent.prototype, "captions", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], FileComponent.prototype, "customstyle", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FileComponent.prototype, "disableIf", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], FileComponent.prototype, "onFileDrop", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], FileComponent.prototype, "onFileOver", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], FileComponent.prototype, "onFileLeave", void 0);
    FileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'file-drop',
            template: __webpack_require__(/*! raw-loader!./file-drop.component.html */ "./node_modules/raw-loader/index.js!./projects/file-picker/src/lib/file-drop/file-drop.component.html"),
            styles: [__webpack_require__(/*! ./file-drop.component.scss */ "./projects/file-picker/src/lib/file-drop/file-drop.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]])
    ], FileComponent);
    return FileComponent;
}());



/***/ }),

/***/ "./projects/file-picker/src/lib/file-drop/file-drop.module.ts":
/*!********************************************************************!*\
  !*** ./projects/file-picker/src/lib/file-drop/file-drop.module.ts ***!
  \********************************************************************/
/*! exports provided: FileDropModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileDropModule", function() { return FileDropModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _file_drop_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./file-drop.component */ "./projects/file-picker/src/lib/file-drop/file-drop.component.ts");
/* harmony import */ var _icons_cloud_icon_cloud_icon_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icons/cloud-icon/cloud-icon.component */ "./projects/file-picker/src/lib/icons/cloud-icon/cloud-icon.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var FileDropModule = /** @class */ (function () {
    function FileDropModule() {
    }
    FileDropModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _file_drop_component__WEBPACK_IMPORTED_MODULE_2__["FileComponent"],
                _icons_cloud_icon_cloud_icon_component__WEBPACK_IMPORTED_MODULE_3__["CloudIconComponent"]
            ],
            exports: [_file_drop_component__WEBPACK_IMPORTED_MODULE_2__["FileComponent"]],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]],
            providers: [],
            bootstrap: [_file_drop_component__WEBPACK_IMPORTED_MODULE_2__["FileComponent"]],
        })
    ], FileDropModule);
    return FileDropModule;
}());



/***/ }),

/***/ "./projects/file-picker/src/lib/file-drop/upload-event.model.ts":
/*!**********************************************************************!*\
  !*** ./projects/file-picker/src/lib/file-drop/upload-event.model.ts ***!
  \**********************************************************************/
/*! exports provided: UploadEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadEvent", function() { return UploadEvent; });
var UploadEvent = /** @class */ (function () {
    function UploadEvent(files) {
        this.files = files;
    }
    UploadEvent.ctorParameters = function () { return [
        { type: Array }
    ]; };
    return UploadEvent;
}());



/***/ }),

/***/ "./projects/file-picker/src/lib/file-drop/upload-file.model.ts":
/*!*********************************************************************!*\
  !*** ./projects/file-picker/src/lib/file-drop/upload-file.model.ts ***!
  \*********************************************************************/
/*! exports provided: UploadFile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadFile", function() { return UploadFile; });
/* harmony import */ var _dom_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.types */ "./projects/file-picker/src/lib/file-drop/dom.types.ts");
/* harmony import */ var _dom_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_dom_types__WEBPACK_IMPORTED_MODULE_0__);

/**
 * fileEntry is an instance of {@link FileSystemFileEntry} or {@link FileSystemDirectoryEntry}.
 * Which one is it can be checked using {@link FileSystemEntry.isFile} or {@link FileSystemEntry.isDirectory}
 * properties of the given {@link FileSystemEntry}.
 */
var UploadFile = /** @class */ (function () {
    function UploadFile(relativePath, fileEntry) {
        this.relativePath = relativePath;
        this.fileEntry = fileEntry;
    }
    UploadFile.ctorParameters = function () { return [
        { type: String },
        { type: _dom_types__WEBPACK_IMPORTED_MODULE_0__["FileSystemEntry"] }
    ]; };
    return UploadFile;
}());



/***/ }),

/***/ "./projects/file-picker/src/lib/file-picker.adapter.ts":
/*!*************************************************************!*\
  !*** ./projects/file-picker/src/lib/file-picker.adapter.ts ***!
  \*************************************************************/
/*! exports provided: FilePickerAdapter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilePickerAdapter", function() { return FilePickerAdapter; });
var FilePickerAdapter = /** @class */ (function () {
    function FilePickerAdapter() {
    }
    return FilePickerAdapter;
}());



/***/ }),

/***/ "./projects/file-picker/src/lib/file-picker.component.scss":
/*!*****************************************************************!*\
  !*** ./projects/file-picker/src/lib/file-picker.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "* {\n  box-sizing: border-box;\n}\n\n:host {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  max-width: 440px;\n  border-radius: 6px;\n}\n\n.files-preview-wrapper {\n  width: 100%;\n}\n\n#cropper-img {\n  max-width: 60vw;\n}\n\n#cropper-img img {\n  width: 100%;\n  height: 100%;\n}\n\n.file-drop-wrapper {\n  width: 100%;\n  background: #fafbfd;\n  padding-top: 20px;\n}\n\n.preview-container {\n  display: -webkit-box;\n  display: flex;\n}\n\n.cropperJsOverlay {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  position: fixed;\n  z-index: 999;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background: rgba(0, 0, 0, 0.32);\n}\n\n.cropperJsBox {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  max-height: calc(100vh - 38px - 50px);\n  max-width: 90vw;\n}\n\n.cropperJsBox .cropper-actions {\n  display: -webkit-box;\n  display: flex;\n}\n\n.cropperJsBox .cropper-actions button {\n  margin: 5px;\n  padding: 12px 25px;\n  border-radius: 6px;\n  border: 0;\n  cursor: pointer;\n}\n\n.cropperJsBox .cropper-actions .cropSubmit {\n  color: #ffffff;\n  background: #16a085;\n}\n\n::ng-deep.cropper img {\n  max-height: 300px !important;\n}\n\n#images {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  width: 500px;\n  overflow-x: auto;\n}\n\n#images .image {\n  -webkit-box-flex: 0;\n          flex: 0 0 100px;\n  margin: 0 2px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: end;\n          align-items: flex-end;\n}\n\n#fileInput {\n  display: none;\n}\n\n.uploader-submit-btn {\n  background: #ffd740;\n  color: rgba(0, 0, 0, 0.87);\n  border: 0;\n  padding: 0 16px;\n  line-height: 36px;\n  font-size: 15px;\n  margin-top: 12px;\n  border-radius: 4px;\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  cursor: pointer;\n}\n\nbutton:disabled {\n  color: rgba(0, 0, 0, 0.26);\n  background: gainsboro;\n}\n\n.visually-hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n  outline: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JlZGxvYnN0ZXIvcHJvamVjdHMvbmd4LWF3ZXNvbWUtdXBsb2FkZXIvcHJvamVjdHMvZmlsZS1waWNrZXIvc3JjL2xpYi9maWxlLXBpY2tlci5jb21wb25lbnQuc2NzcyIsInByb2plY3RzL2ZpbGUtcGlja2VyL3NyYy9saWIvZmlsZS1waWNrZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxzQkFBQTtBQ0NGOztBRENBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsNEJBQUE7RUFBQSw2QkFBQTtVQUFBLHNCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUNFRjs7QURBQTtFQUNFLFdBQUE7QUNHRjs7QUREQTtFQUNFLGVBQUE7QUNJRjs7QURGQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FDS0Y7O0FESEE7RUFDRSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtBQ01GOztBREhFO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0FDTUo7O0FESEU7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLCtCQUFBO0FDTUo7O0FESkU7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw0QkFBQTtFQUFBLDZCQUFBO1VBQUEsc0JBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHFDQUFBO0VBQ0EsZUFBQTtBQ09KOztBRE5HO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0FDUUw7O0FEUEs7RUFDQyxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0FDU047O0FEUEk7RUFDRSxjQUFBO0VBQ0EsbUJBQUE7QUNTTjs7QUREQTtFQUNJLDRCQUFBO0FDR0o7O0FEREU7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FDSUo7O0FERkU7RUFDRSxtQkFBQTtVQUFBLGVBQUE7RUFDQSxhQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EsNEJBQUE7RUFBQSw2QkFBQTtVQUFBLHNCQUFBO0VBQ0Esc0JBQUE7VUFBQSxxQkFBQTtBQ0tKOztBREZFO0VBQ0UsYUFBQTtBQ0tKOztBREZFO0VBQ0UsbUJBQUE7RUFDQSwwQkFBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLHlIQUFBO0VBRUEsZUFBQTtBQ0lKOztBREZFO0VBQ0UsMEJBQUE7RUFDQSxxQkFBQTtBQ0tKOztBREZFO0VBQ0UsU0FBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFHQSxVQUFBO0VBR0Esd0JBQUE7RUFDQSxxQkFBQTtBQ0NKIiwiZmlsZSI6InByb2plY3RzL2ZpbGUtcGlja2VyL3NyYy9saWIvZmlsZS1waWNrZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIqIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cbjpob3N0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIG1heC13aWR0aDogNDQwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbn1cbi5maWxlcy1wcmV2aWV3LXdyYXBwZXIge1xuICB3aWR0aDogMTAwJTtcbn1cbiNjcm9wcGVyLWltZyB7XG4gIG1heC13aWR0aDogNjB2dztcbn1cbiNjcm9wcGVyLWltZyBpbWcge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuLmZpbGUtZHJvcC13cmFwcGVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQ6ICNmYWZiZmQ7XG4gIHBhZGRpbmctdG9wOiAyMHB4O1xufVxuXG4gIC5wcmV2aWV3LWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgfVxuXG4gIC5jcm9wcGVySnNPdmVybGF5IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHotaW5kZXg6IDk5OTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICB3aWR0aDogMTAwdnc7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMzIpO1xuICB9XG4gIC5jcm9wcGVySnNCb3gge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1heC1oZWlnaHQ6IGNhbGMoMTAwdmggLSAzOHB4IC0gNTBweCk7XG4gICAgbWF4LXdpZHRoOiA5MHZ3O1xuICAgLmNyb3BwZXItYWN0aW9ucyB7XG4gICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgIGJ1dHRvbiB7XG4gICAgICBtYXJnaW46IDVweDtcbiAgICAgIHBhZGRpbmc6IDEycHggMjVweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgIGJvcmRlcjogMDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgfVxuICAgIC5jcm9wU3VibWl0IHtcbiAgICAgIGNvbG9yOiAjZmZmZmZmO1xuICAgICAgYmFja2dyb3VuZDogIzE2YTA4NTtcbiAgfVxuICAuY3JvcENhbmNlbCB7XG4gICAvLyBjb2xvcjogI2ZmZmZmZjtcbiAgIC8vIGJhY2tncm91bmQ6ICM0NzQ3ODc7XG4gIH1cbiAgIH1cbn1cbjo6bmctZGVlcC5jcm9wcGVyIGltZyB7XG4gICAgbWF4LWhlaWdodDogMzAwcHggIWltcG9ydGFudDtcbn1cbiAgI2ltYWdlcyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB3aWR0aDogNTAwcHg7XG4gICAgb3ZlcmZsb3cteDogYXV0bztcbiAgfVxuICAjaW1hZ2VzIC5pbWFnZSB7XG4gICAgZmxleDogMCAwIDEwMHB4O1xuICAgIG1hcmdpbjogMCAycHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgfVxuXG4gICNmaWxlSW5wdXQge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICAudXBsb2FkZXItc3VibWl0LWJ0biB7XG4gICAgYmFja2dyb3VuZDogI2ZmZDc0MDtcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjg3KTtcbiAgICBib3JkZXI6IDA7XG4gICAgcGFkZGluZzogMCAxNnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAzNnB4O1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICBtYXJnaW4tdG9wOiAxMnB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBib3gtc2hhZG93OiAwcHggM3B4IDFweCAtMnB4IHJnYmEoMCwgMCwgMCwgMC4yKSxcbiAgICAwcHggMnB4IDJweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwgMHB4IDFweCA1cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG4gIGJ1dHRvbjpkaXNhYmxlZCB7XG4gICAgY29sb3I6IHJnYmEoMCwwLDAsLjI2KTtcbiAgICBiYWNrZ3JvdW5kOiBnYWluc2Jvcm87XG4gIH1cblxuICAudmlzdWFsbHktaGlkZGVuIHtcbiAgICBib3JkZXI6IDA7XG4gICAgY2xpcDogcmVjdCgwIDAgMCAwKTtcbiAgICBoZWlnaHQ6IDFweDtcbiAgICBtYXJnaW46IC0xcHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBwYWRkaW5nOiAwO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMXB4O1xuXG4gICAgLy8gQXZvaWQgYnJvd3NlcnMgcmVuZGVyaW5nIHRoZSBmb2N1cyByaW5nIGluIHNvbWUgY2FzZXMuXG4gICAgb3V0bGluZTogMDtcblxuICAgIC8vIEF2b2lkIHNvbWUgY2FzZXMgd2hlcmUgdGhlIGJyb3dzZXIgd2lsbCBzdGlsbCByZW5kZXIgdGhlIG5hdGl2ZSBjb250cm9scyAoc2VlICM5MDQ5KS5cbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuICB9IiwiKiB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbjpob3N0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIG1heC13aWR0aDogNDQwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbn1cblxuLmZpbGVzLXByZXZpZXctd3JhcHBlciB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4jY3JvcHBlci1pbWcge1xuICBtYXgtd2lkdGg6IDYwdnc7XG59XG5cbiNjcm9wcGVyLWltZyBpbWcge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uZmlsZS1kcm9wLXdyYXBwZXIge1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZDogI2ZhZmJmZDtcbiAgcGFkZGluZy10b3A6IDIwcHg7XG59XG5cbi5wcmV2aWV3LWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5jcm9wcGVySnNPdmVybGF5IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgei1pbmRleDogOTk5O1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDB2dztcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjMyKTtcbn1cblxuLmNyb3BwZXJKc0JveCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXgtaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMzhweCAtIDUwcHgpO1xuICBtYXgtd2lkdGg6IDkwdnc7XG59XG4uY3JvcHBlckpzQm94IC5jcm9wcGVyLWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuLmNyb3BwZXJKc0JveCAuY3JvcHBlci1hY3Rpb25zIGJ1dHRvbiB7XG4gIG1hcmdpbjogNXB4O1xuICBwYWRkaW5nOiAxMnB4IDI1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgYm9yZGVyOiAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uY3JvcHBlckpzQm94IC5jcm9wcGVyLWFjdGlvbnMgLmNyb3BTdWJtaXQge1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgYmFja2dyb3VuZDogIzE2YTA4NTtcbn1cbjo6bmctZGVlcC5jcm9wcGVyIGltZyB7XG4gIG1heC1oZWlnaHQ6IDMwMHB4ICFpbXBvcnRhbnQ7XG59XG5cbiNpbWFnZXMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDUwMHB4O1xuICBvdmVyZmxvdy14OiBhdXRvO1xufVxuXG4jaW1hZ2VzIC5pbWFnZSB7XG4gIGZsZXg6IDAgMCAxMDBweDtcbiAgbWFyZ2luOiAwIDJweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xufVxuXG4jZmlsZUlucHV0IHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLnVwbG9hZGVyLXN1Ym1pdC1idG4ge1xuICBiYWNrZ3JvdW5kOiAjZmZkNzQwO1xuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjg3KTtcbiAgYm9yZGVyOiAwO1xuICBwYWRkaW5nOiAwIDE2cHg7XG4gIGxpbmUtaGVpZ2h0OiAzNnB4O1xuICBmb250LXNpemU6IDE1cHg7XG4gIG1hcmdpbi10b3A6IDEycHg7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYm94LXNoYWRvdzogMHB4IDNweCAxcHggLTJweCByZ2JhKDAsIDAsIDAsIDAuMiksIDBweCAycHggMnB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwcHggMXB4IDVweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG5idXR0b246ZGlzYWJsZWQge1xuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI2KTtcbiAgYmFja2dyb3VuZDogZ2FpbnNib3JvO1xufVxuXG4udmlzdWFsbHktaGlkZGVuIHtcbiAgYm9yZGVyOiAwO1xuICBjbGlwOiByZWN0KDAgMCAwIDApO1xuICBoZWlnaHQ6IDFweDtcbiAgbWFyZ2luOiAtMXB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwYWRkaW5nOiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAxcHg7XG4gIG91dGxpbmU6IDA7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xufSJdfQ== */"

/***/ }),

/***/ "./projects/file-picker/src/lib/file-picker.component.ts":
/*!***************************************************************!*\
  !*** ./projects/file-picker/src/lib/file-picker.component.ts ***!
  \***************************************************************/
/*! exports provided: FilePickerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilePickerComponent", function() { return FilePickerComponent; });
/* harmony import */ var _file_picker_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-picker.service */ "./projects/file-picker/src/lib/file-picker.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _file_upload_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./file-upload.utils */ "./projects/file-picker/src/lib/file-upload.utils.ts");
/* harmony import */ var _validation_error_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validation-error.model */ "./projects/file-picker/src/lib/validation-error.model.ts");
/* harmony import */ var _file_picker_adapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./file-picker.adapter */ "./projects/file-picker/src/lib/file-picker.adapter.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _default_captions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./default-captions */ "./projects/file-picker/src/lib/default-captions.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (undefined && undefined.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};








var FilePickerComponent = /** @class */ (function () {
    function FilePickerComponent(fileService, elementRef) {
        this.fileService = fileService;
        this.elementRef = elementRef;
        /** Emitted when file upload via api successfully. Emitted for every file */
        this.uploadSuccess = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        /** Emitted when file upload via api failed. Emitted for every file */
        this.uploadFail = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        /** Emitted when file is removed via api successfully. Emitted for every file */
        this.removeSuccess = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        /** Emitted on file validation fail */
        this.validationError = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        /** Emitted when file is added and passed validations. Not uploaded yet */
        this.fileAdded = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        /** Whether to enable cropper. Default: disabled */
        this.enableCropper = false;
        /** Whether to show default drag and drop zone. Default:true */
        this.showeDragDropZone = true;
        /** Whether to show default files preview container. Default: true */
        this.showPreviewContainer = true;
        /** Single or multiple. Default: multi */
        this.uploadType = 'multi';
        this.files = [];
        /** Files array for cropper. Will be shown equentially if crop enabled */
        this.filesForCropper = [];
        this.cropClosed$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
        this._onDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
    }
    FilePickerComponent.prototype.ngOnInit = function () {
        this.setCropperOptions();
        this.listenToCropClose();
        this.setCaptions();
    };
    FilePickerComponent.prototype.ngOnDestroy = function () {
        this._onDestroy$.next();
    };
    FilePickerComponent.prototype.setCaptions = function () {
        this._captions = this.captions || _default_captions__WEBPACK_IMPORTED_MODULE_7__["DefaultCaptions"];
    };
    /** Listen when Cropper is closed and open new cropper if next image exists */
    FilePickerComponent.prototype.listenToCropClose = function () {
        var _this = this;
        this.cropClosed$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this._onDestroy$))
            .subscribe(function (res) {
            var croppedIndex = _this.filesForCropper.findIndex(function (item) { return item.name === res.fileName; });
            var nextFile = croppedIndex !== -1
                ? _this.filesForCropper[croppedIndex + 1]
                : undefined;
            // console.log(nextFile)
            //  console.log('cropped', res);
            _this.filesForCropper = __spread(_this.filesForCropper).filter(function (item) { return item.name !== res.fileName; });
            // console.log(this.filesForCropper);
            if (nextFile) {
                _this.openCropper(nextFile);
            }
        });
    };
    /** Sets custom cropper options if avaiable */
    FilePickerComponent.prototype.setCropperOptions = function () {
        if (!this.cropperOptions) {
            this.setDefaultCropperOptions();
        }
    };
    /** Sets manual cropper options if no custom options are avaiable */
    FilePickerComponent.prototype.setDefaultCropperOptions = function () {
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
    FilePickerComponent.prototype.onChange = function (fileInput) {
        var files = Array.from(fileInput.files);
        this.handleFiles(files).subscribe();
    };
    /** Handles input and drag/drop files */
    FilePickerComponent.prototype.handleFiles = function (files) {
        var _this = this;
        if (!this.isValidMaxFileCount(files)) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(null);
        }
        var isValidUploadSync = files.every(function (item) { return _this.validateFileSync(item); });
        var asyncFunctions = files.map(function (item) { return _this.validateFileAsync(item); });
        return rxjs__WEBPACK_IMPORTED_MODULE_5__["combineLatest"].apply(void 0, __spread(asyncFunctions)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (res) {
            var isValidUploadAsync = res.every(function (result) { return result === true; });
            if (!isValidUploadSync || !isValidUploadAsync) {
                return;
            }
            files.forEach(function (file, index) {
                _this.handleInputFile(file, index);
            });
        }));
    };
    /** Validates synchronous validations */
    FilePickerComponent.prototype.validateFileSync = function (file) {
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
    FilePickerComponent.prototype.validateFileAsync = function (file) {
        var _this = this;
        if (!this.customValidator) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(true);
        }
        return this.customValidator(file).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["tap"])(function (res) {
            if (!res) {
                _this.validationError.next({
                    file: file,
                    error: _validation_error_model__WEBPACK_IMPORTED_MODULE_3__["FileValidationTypes"].customValidator
                });
            }
        }));
    };
    /** Handles input and drag&drop files */
    FilePickerComponent.prototype.handleInputFile = function (file, index) {
        var type = Object(_file_upload_utils__WEBPACK_IMPORTED_MODULE_2__["getFileType"])(file.type);
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
    FilePickerComponent.prototype.isValidUploadType = function (file) {
        if (this.uploadType === 'single' && this.files.length > 0) {
            this.validationError.next({
                file: file,
                error: _validation_error_model__WEBPACK_IMPORTED_MODULE_3__["FileValidationTypes"].uploadType
            });
            return false;
        }
        else {
            return true;
        }
    };
    /** Validates max file count */
    FilePickerComponent.prototype.isValidMaxFileCount = function (files) {
        if (!this.fileMaxCount ||
            this.fileMaxCount >= this.files.length + files.length) {
            return true;
        }
        else {
            this.validationError.next({
                file: null,
                error: _validation_error_model__WEBPACK_IMPORTED_MODULE_3__["FileValidationTypes"].fileMaxCount
            });
            return false;
        }
    };
    /** On file dropped */
    FilePickerComponent.prototype.dropped = function (event) {
        var _this = this;
        var e_1, _a;
        var files = event.files;
        var filesForUpload = [];
        try {
            for (var _b = __values(event.files), _c = _b.next(); !_c.done; _c = _b.next()) {
                var droppedFile = _c.value;
                // Is it a file?
                if (droppedFile.fileEntry.isFile) {
                    var fileEntry = droppedFile.fileEntry;
                    fileEntry.file(function (file) {
                        filesForUpload.push(file);
                    });
                }
                else {
                    // It was a directory (empty directories are added, otherwise only files)
                    var fileEntry = droppedFile.fileEntry;
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
        setTimeout(function () { return _this.handleFiles(filesForUpload).subscribe(); });
    };
    /** Add file to file list after succesfull validation */
    FilePickerComponent.prototype.pushFile = function (file, fileName) {
        if (fileName === void 0) { fileName = file.name; }
        this.files.push({ file: file, fileName: fileName });
        this.fileAdded.next({ file: file, fileName: fileName });
    };
    /** Opens cropper for image crop */
    FilePickerComponent.prototype.openCropper = function (file) {
        if (window.UPLOADER_TEST_MODE || typeof Cropper !== 'undefined') {
            this.safeCropImgUrl = this.fileService.createSafeUrl(file);
            this.currentCropperFile = file;
        }
        else {
            console.warn("please import cropperjs script and styles to use cropper feature or disable it by setting [enableCropper]='false'");
            return;
        }
    };
    FilePickerComponent.prototype.getSafeUrl = function (file) {
        return this.fileService.createSafeUrl(file);
    };
    /** On img load event */
    FilePickerComponent.prototype.cropperImgLoaded = function (e) {
        var image = document.getElementById('cropper-img');
        this.cropper = new Cropper(image, this.cropperOptions);
    };
    /** Close or cancel cropper */
    FilePickerComponent.prototype.closeCropper = function (filePreview) {
        var _this = this;
        this.currentCropperFile = undefined;
        this.cropper = undefined;
        setTimeout(function () { return _this.cropClosed$.next(filePreview); }, 200);
    };
    /** Removes files from files list */
    FilePickerComponent.prototype.removeFileFromList = function (file) {
        this.files = this.files.filter(function (f) { return f !== file; });
    };
    /** Emits event when file upload api returns success  */
    FilePickerComponent.prototype.onUploadSuccess = function (fileItem) {
        this.uploadSuccess.next(fileItem);
    };
    /** Emits event when file upload api returns success  */
    FilePickerComponent.prototype.onUploadFail = function (er) {
        this.uploadFail.next(er);
    };
    /** Validates file extension */
    FilePickerComponent.prototype.isValidExtension = function (file, fileName) {
        if (!this.fileExtensions) {
            return true;
        }
        var extension = fileName.split('.').pop();
        var fileExtensions = this.fileExtensions.map(function (ext) { return ext.toLowerCase(); });
        if (fileExtensions.indexOf(extension.toLowerCase()) === -1) {
            this.validationError.next({ file: file, error: _validation_error_model__WEBPACK_IMPORTED_MODULE_3__["FileValidationTypes"].extensions });
            return false;
        }
    };
    /** Validates selected file size and total file size */
    FilePickerComponent.prototype.isValidSize = function (file, size) {
        /** Validating selected file size */
        var res = this.bitsToMb(size.toString());
        var isValidFileSize;
        var isValidTotalFileSize;
        if (!this.fileMaxSize || (this.fileMaxSize && res < this.fileMaxSize)) {
            isValidFileSize = true;
        }
        else {
            this.validationError.next({
                file: file,
                error: _validation_error_model__WEBPACK_IMPORTED_MODULE_3__["FileValidationTypes"].fileMaxSize
            });
        }
        /** Validating Total Files Size */
        var totalBits = this.files
            .map(function (f) { return f.file.size; })
            .reduce(function (acc, curr) { return acc + curr; }, 0);
        if (!this.totalMaxSize ||
            (this.totalMaxSize &&
                this.bitsToMb(totalBits + file.size) < this.totalMaxSize)) {
            isValidTotalFileSize = true;
        }
        else {
            this.validationError.next({
                file: file,
                error: _validation_error_model__WEBPACK_IMPORTED_MODULE_3__["FileValidationTypes"].totalMaxSize
            });
        }
        return !!isValidFileSize && isValidTotalFileSize;
    };
    FilePickerComponent.prototype.bitsToMb = function (size) {
        return parseFloat(size) / 1048576;
    };
    /** when crop button submitted */
    FilePickerComponent.prototype.onCropSubmit = function () {
        var canvas = this.cropper.getCroppedCanvas();
        if (canvas != null) {
            this.cropper.getCroppedCanvas().toBlob(this.blobFallBack.bind(this), 'image/jpeg');
        }
    };
    /** After crop submit */
    FilePickerComponent.prototype.blobFallBack = function (blob) {
        if (!blob) {
            return;
        }
        if (this.isValidSize(blob, blob.size)) {
            this.pushFile(blob, this.currentCropperFile.name);
        }
        this.closeCropper({
            file: blob,
            fileName: this.currentCropperFile.name
        });
    };
    FilePickerComponent.prototype.removeFile = function (fileItem) {
        var _this = this;
        if (this.adapter) {
            this.adapter.removeFile(fileItem).subscribe(function (res) {
                _this.onRemoveSuccess(fileItem);
            });
        }
        else {
            console.warn('no adapter was provided');
        }
    };
    /** Emits event when file remove api returns success  */
    FilePickerComponent.prototype.onRemoveSuccess = function (fileItem) {
        this.removeSuccess.next(fileItem);
        this.removeFileFromList(fileItem);
    };
    FilePickerComponent.ctorParameters = function () { return [
        { type: _file_picker_service__WEBPACK_IMPORTED_MODULE_0__["FilePickerService"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        __metadata("design:type", Object)
    ], FilePickerComponent.prototype, "uploadSuccess", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        __metadata("design:type", Object)
    ], FilePickerComponent.prototype, "uploadFail", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        __metadata("design:type", Object)
    ], FilePickerComponent.prototype, "removeSuccess", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        __metadata("design:type", Object)
    ], FilePickerComponent.prototype, "validationError", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        __metadata("design:type", Object)
    ], FilePickerComponent.prototype, "fileAdded", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Function)
    ], FilePickerComponent.prototype, "customValidator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Object)
    ], FilePickerComponent.prototype, "enableCropper", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Object)
    ], FilePickerComponent.prototype, "showeDragDropZone", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Object)
    ], FilePickerComponent.prototype, "showPreviewContainer", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"])
    ], FilePickerComponent.prototype, "itemTemplate", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Object)
    ], FilePickerComponent.prototype, "uploadType", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Number)
    ], FilePickerComponent.prototype, "fileMaxSize", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Number)
    ], FilePickerComponent.prototype, "fileMaxCount", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Number)
    ], FilePickerComponent.prototype, "totalMaxSize", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", String)
    ], FilePickerComponent.prototype, "accept", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Array)
    ], FilePickerComponent.prototype, "fileExtensions", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Object)
    ], FilePickerComponent.prototype, "cropperOptions", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", _file_picker_adapter__WEBPACK_IMPORTED_MODULE_4__["FilePickerAdapter"])
    ], FilePickerComponent.prototype, "adapter", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"])
    ], FilePickerComponent.prototype, "dropzoneTemplate", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Object)
    ], FilePickerComponent.prototype, "captions", void 0);
    FilePickerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'ngx-file-picker',
            template: __webpack_require__(/*! raw-loader!./file-picker.component.html */ "./node_modules/raw-loader/index.js!./projects/file-picker/src/lib/file-picker.component.html"),
            styles: [__webpack_require__(/*! ./file-picker.component.scss */ "./projects/file-picker/src/lib/file-picker.component.scss")]
        }),
        __metadata("design:paramtypes", [_file_picker_service__WEBPACK_IMPORTED_MODULE_0__["FilePickerService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]])
    ], FilePickerComponent);
    return FilePickerComponent;
}());



/***/ }),

/***/ "./projects/file-picker/src/lib/file-picker.module.ts":
/*!************************************************************!*\
  !*** ./projects/file-picker/src/lib/file-picker.module.ts ***!
  \************************************************************/
/*! exports provided: FilePickerModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilePickerModule", function() { return FilePickerModule; });
/* harmony import */ var _icons_close_icon_close_icon_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons/close-icon/close-icon.component */ "./projects/file-picker/src/lib/icons/close-icon/close-icon.component.ts");
/* harmony import */ var _file_preview_container_file_preview_item_file_preview_item_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./file-preview-container/file-preview-item/file-preview-item.component */ "./projects/file-picker/src/lib/file-preview-container/file-preview-item/file-preview-item.component.ts");
/* harmony import */ var _file_preview_container_file_preview_container_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./file-preview-container/file-preview-container.component */ "./projects/file-picker/src/lib/file-preview-container/file-preview-container.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _file_picker_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./file-picker.component */ "./projects/file-picker/src/lib/file-picker.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _file_picker_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./file-picker.service */ "./projects/file-picker/src/lib/file-picker.service.ts");
/* harmony import */ var _file_drop_file_drop_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./file-drop/file-drop.module */ "./projects/file-picker/src/lib/file-drop/file-drop.module.ts");
/* harmony import */ var _file_preview_container_preview_lightbox_preview_lightbox_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./file-preview-container/preview-lightbox/preview-lightbox.component */ "./projects/file-picker/src/lib/file-preview-container/preview-lightbox/preview-lightbox.component.ts");
/* harmony import */ var _file_preview_container_file_preview_item_refresh_icon_refresh_icon_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./file-preview-container/file-preview-item/refresh-icon/refresh-icon.component */ "./projects/file-picker/src/lib/file-preview-container/file-preview-item/refresh-icon/refresh-icon.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var FilePickerModule = /** @class */ (function () {
    function FilePickerModule() {
    }
    FilePickerModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"],
                _file_drop_file_drop_module__WEBPACK_IMPORTED_MODULE_7__["FileDropModule"],
            ],
            declarations: [
                _file_picker_component__WEBPACK_IMPORTED_MODULE_4__["FilePickerComponent"],
                _file_preview_container_file_preview_container_component__WEBPACK_IMPORTED_MODULE_2__["FilePreviewContainerComponent"],
                _file_preview_container_file_preview_item_file_preview_item_component__WEBPACK_IMPORTED_MODULE_1__["FilePreviewItemComponent"],
                _file_preview_container_preview_lightbox_preview_lightbox_component__WEBPACK_IMPORTED_MODULE_8__["PreviewLightboxComponent"],
                _file_preview_container_file_preview_item_refresh_icon_refresh_icon_component__WEBPACK_IMPORTED_MODULE_9__["RefreshIconComponent"],
                _icons_close_icon_close_icon_component__WEBPACK_IMPORTED_MODULE_0__["CloseIconComponent"]
            ],
            exports: [_file_picker_component__WEBPACK_IMPORTED_MODULE_4__["FilePickerComponent"]],
            providers: [_file_picker_service__WEBPACK_IMPORTED_MODULE_6__["FilePickerService"]]
        })
    ], FilePickerModule);
    return FilePickerModule;
}());



/***/ }),

/***/ "./projects/file-picker/src/lib/file-picker.service.ts":
/*!*************************************************************!*\
  !*** ./projects/file-picker/src/lib/file-picker.service.ts ***!
  \*************************************************************/
/*! exports provided: FilePickerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilePickerService", function() { return FilePickerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FilePickerService = /** @class */ (function () {
    function FilePickerService(sanitizer) {
        this.sanitizer = sanitizer;
    }
    FilePickerService.prototype.mockUploadFile = function (formData) {
        var event = new CustomEvent('customevent', {
            detail: {
                type: 'UploadProgreess'
            }
        });
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(event.detail);
    };
    FilePickerService.prototype.createSafeUrl = function (file) {
        if (window.UPLOADER_TEST_MODE) {
            return;
        }
        try {
            var url = window.URL.createObjectURL(file);
            var safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            return safeUrl;
        }
        catch (er) {
            console.log(er);
        }
    };
    FilePickerService.ctorParameters = function () { return [
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"] }
    ]; };
    FilePickerService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]])
    ], FilePickerService);
    return FilePickerService;
}());



/***/ }),

/***/ "./projects/file-picker/src/lib/file-preview-container/file-preview-container.component.scss":
/*!***************************************************************************************************!*\
  !*** ./projects/file-picker/src/lib/file-preview-container/file-preview-container.component.scss ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  width: 100%;\n  background: #fafbfd;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JlZGxvYnN0ZXIvcHJvamVjdHMvbmd4LWF3ZXNvbWUtdXBsb2FkZXIvcHJvamVjdHMvZmlsZS1waWNrZXIvc3JjL2xpYi9maWxlLXByZXZpZXctY29udGFpbmVyL2ZpbGUtcHJldmlldy1jb250YWluZXIuY29tcG9uZW50LnNjc3MiLCJwcm9qZWN0cy9maWxlLXBpY2tlci9zcmMvbGliL2ZpbGUtcHJldmlldy1jb250YWluZXIvZmlsZS1wcmV2aWV3LWNvbnRhaW5lci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtFQUNBLHVCQUFBO1VBQUEsMkJBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7QUNDRiIsImZpbGUiOiJwcm9qZWN0cy9maWxlLXBpY2tlci9zcmMvbGliL2ZpbGUtcHJldmlldy1jb250YWluZXIvZmlsZS1wcmV2aWV3LWNvbnRhaW5lci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgZGlzcGxheTpmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kOiAjZmFmYmZkO1xufVxuIiwiOmhvc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kOiAjZmFmYmZkO1xufSJdfQ== */"

/***/ }),

/***/ "./projects/file-picker/src/lib/file-preview-container/file-preview-container.component.ts":
/*!*************************************************************************************************!*\
  !*** ./projects/file-picker/src/lib/file-preview-container/file-preview-container.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: FilePreviewContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilePreviewContainerComponent", function() { return FilePreviewContainerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _file_picker_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../file-picker.adapter */ "./projects/file-picker/src/lib/file-picker.adapter.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FilePreviewContainerComponent = /** @class */ (function () {
    function FilePreviewContainerComponent() {
        this.removeFile = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.uploadSuccess = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.uploadFail = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    FilePreviewContainerComponent.prototype.ngOnInit = function () {
    };
    FilePreviewContainerComponent.prototype.openLightbox = function (file) {
        this.lightboxFile = file;
    };
    FilePreviewContainerComponent.prototype.closeLightbox = function () {
        this.lightboxFile = undefined;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], FilePreviewContainerComponent.prototype, "previewFiles", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"])
    ], FilePreviewContainerComponent.prototype, "itemTemplate", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], FilePreviewContainerComponent.prototype, "removeFile", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], FilePreviewContainerComponent.prototype, "uploadSuccess", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], FilePreviewContainerComponent.prototype, "uploadFail", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _file_picker_adapter__WEBPACK_IMPORTED_MODULE_1__["FilePickerAdapter"])
    ], FilePreviewContainerComponent.prototype, "adapter", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FilePreviewContainerComponent.prototype, "captions", void 0);
    FilePreviewContainerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'file-preview-container',
            template: __webpack_require__(/*! raw-loader!./file-preview-container.component.html */ "./node_modules/raw-loader/index.js!./projects/file-picker/src/lib/file-preview-container/file-preview-container.component.html"),
            styles: [__webpack_require__(/*! ./file-preview-container.component.scss */ "./projects/file-picker/src/lib/file-preview-container/file-preview-container.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FilePreviewContainerComponent);
    return FilePreviewContainerComponent;
}());



/***/ }),

/***/ "./projects/file-picker/src/lib/file-preview-container/file-preview-item/file-preview-item.component.scss":
/*!****************************************************************************************************************!*\
  !*** ./projects/file-picker/src/lib/file-preview-container/file-preview-item/file-preview-item.component.scss ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  padding: 20px 16px;\n  border-bottom: 1px solid #ebeef1;\n  max-width: 440px;\n  position: relative;\n}\n\n.visually-hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n  outline: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n}\n\n.file-preview-wrapper {\n  display: -webkit-box;\n  display: flex;\n  width: 100%;\n}\n\n.file-preview-wrapper .file-preview-thumbnail {\n  position: relative;\n  z-index: 2;\n  cursor: pointer;\n}\n\n.file-preview-wrapper .file-preview-thumbnail .img-preview-thumbnail {\n  width: 36px;\n  height: 36px;\n}\n\n.file-preview-wrapper .file-preview-thumbnail .img-preview-thumbnail img {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-radius: 6px;\n}\n\n.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail {\n  width: 36px;\n  height: 36px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  background: #706fd3;\n  border-radius: 4px;\n  color: #ffffff;\n  font-size: 12px;\n  font-weight: 700;\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.pdf {\n  background: #e4394e;\n}\n\n.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.doc, .file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.docx {\n  background: #2196F3;\n}\n\n.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.xls, .file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.xlsx {\n  background: #4CAF50;\n}\n\n.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.txt, .file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.ppt {\n  background: #FF9800;\n}\n\n.file-preview-wrapper .file-preview-thumbnail .thumbnail-backdrop {\n  visibility: hidden;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  border-radius: 6px;\n  -webkit-transition: all 100ms ease-in-out;\n  transition: all 100ms ease-in-out;\n  pointer-events: none;\n  background: rgba(43, 56, 71, 0.2);\n}\n\n.file-preview-wrapper .file-preview-thumbnail:hover .thumbnail-backdrop {\n  visibility: visible;\n}\n\n.file-preview-wrapper .file-preview-thumbnail:active .thumbnail-backdrop {\n  visibility: visible;\n  background: rgba(43, 56, 71, 0.4);\n}\n\n.file-preview-wrapper .file-preview-description {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: start;\n          align-items: flex-start;\n  padding-left: 16px;\n  padding-right: 16px;\n  color: #74809d;\n  overflow: hidden;\n  -webkit-box-flex: 1;\n          flex: 1;\n  z-index: 2;\n  position: relative;\n}\n\n.file-preview-wrapper .file-preview-description .file-preview-title {\n  font-weight: 700;\n  width: 90%;\n  text-decoration: none;\n  color: #74809d;\n  cursor: default;\n}\n\n.file-preview-wrapper .file-preview-description .file-preview-title p {\n  text-overflow: ellipsis;\n  max-width: 100%;\n  overflow: hidden;\n  white-space: nowrap;\n  margin: 0;\n}\n\n.file-preview-wrapper .file-preview-description .file-preview-size {\n  font-size: 12px;\n  color: #979fb8;\n}\n\n.file-preview-wrapper .file-preview-actions {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  font-size: 10px;\n  z-index: 3;\n  position: relative;\n}\n\n.file-preview-wrapper .file-preview-actions .ngx-checkmark-wrapper {\n  position: relative;\n  cursor: pointer;\n  font-size: 22px;\n  height: 20px;\n  width: 20px;\n  border-radius: 50%;\n  background: #43d084;\n  box-shadow: -1px 1px 6px rgba(67, 208, 132, 0.8);\n}\n\n.file-preview-wrapper .file-preview-actions .ngx-checkmark-wrapper .ngx-checkmark {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 19px;\n  width: 19px;\n}\n\n.file-preview-wrapper .file-preview-actions .ngx-checkmark-wrapper .ngx-checkmark:after {\n  content: \"\";\n  position: absolute;\n  display: block;\n  left: 7px;\n  top: 4px;\n  width: 3px;\n  height: 7px;\n  border: 1px solid #ffffff;\n  border-width: 0 3px 3px 0;\n  -webkit-transform: rotate(45deg);\n  transform: rotate(45deg);\n}\n\n.file-preview-wrapper .file-preview-actions .ngx-close-icon-wrapper {\n  border-radius: 50%;\n  background: #fe7676;\n  padding: 3px;\n  box-shadow: -1px 1px 6px rgba(254, 118, 118, 0.8);\n  cursor: pointer;\n}\n\n.file-preview-wrapper .file-upload-progress-bar-wrapper,\n.file-preview-wrapper .file-upload-percentage-wrapper {\n  position: absolute;\n  z-index: 1;\n  width: 100%;\n  height: 95%;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n}\n\n.file-preview-wrapper .file-upload-progress-bar {\n  background: #eef1fa;\n  border-radius: 6px;\n  width: 0%;\n  height: 95%;\n  -webkit-transition: width 300ms ease-in;\n  transition: width 300ms ease-in;\n}\n\n.file-preview-wrapper .file-upload-percentage {\n  padding-right: 10%;\n  color: #c2cdda;\n  padding-top: 5%;\n  font-size: 19px;\n  text-align: right;\n}\n\n.file-preview-wrapper .file-upload-error-wrapper {\n  position: absolute;\n  z-index: 1;\n  width: 100%;\n  height: 95%;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n  background: rgba(254, 84, 111, 0.06);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JlZGxvYnN0ZXIvcHJvamVjdHMvbmd4LWF3ZXNvbWUtdXBsb2FkZXIvcHJvamVjdHMvZmlsZS1waWNrZXIvc3JjL2xpYi9maWxlLXByZXZpZXctY29udGFpbmVyL2ZpbGUtcHJldmlldy1pdGVtL2ZpbGUtcHJldmlldy1pdGVtLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvZmlsZS1waWNrZXIvc3JjL2xpYi9maWxlLXByZXZpZXctY29udGFpbmVyL2ZpbGUtcHJldmlldy1pdGVtL2ZpbGUtcHJldmlldy1pdGVtLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FDQ0Y7O0FERUE7RUFDRSxTQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUdBLFVBQUE7RUFHQSx3QkFBQTtFQUNBLHFCQUFBO0FDSEY7O0FETUE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSxXQUFBO0FDSEY7O0FESUU7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxlQUFBO0FDRko7O0FER0k7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQ0ROOztBREVNO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxvQkFBQTtLQUFBLGlCQUFBO0VBQ0Esa0JBQUE7QUNBUjs7QURHSTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QUNETjs7QURFTTtFQUNFLG1CQUFBO0FDQVI7O0FERU07RUFDQyxtQkFBQTtBQ0FQOztBREVNO0VBQ0UsbUJBQUE7QUNBUjs7QURFSztFQUNFLG1CQUFBO0FDQVA7O0FESUM7RUFDSSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsT0FBQTtFQUNBLE1BQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EseUNBQUE7RUFBQSxpQ0FBQTtFQUNBLG9CQUFBO0VBQ0EsaUNBQUE7QUNGTDs7QURLSTtFQUNFLG1CQUFBO0FDSE47O0FET0k7RUFDRSxtQkFBQTtFQUNBLGlDQUFBO0FDTE47O0FEU0U7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw0QkFBQTtFQUFBLDZCQUFBO1VBQUEsc0JBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO1VBQUEsT0FBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtBQ1BKOztBRFFJO0VBQ0UsZ0JBQUE7RUFDQSxVQUFBO0VBQ0EscUJBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtBQ05OOztBRE9NO0VBQ0UsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7QUNMUjs7QURRSTtFQUNFLGVBQUE7RUFDQSxjQUFBO0FDTk47O0FEU0U7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtBQ1BKOztBRFFJO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdEQUFBO0FDTk47O0FET007RUFDRSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUNMUjs7QURNUTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EseUJBQUE7RUFDQSx5QkFBQTtFQUNBLGdDQUFBO0VBRUEsd0JBQUE7QUNKVjs7QURRSTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsaURBQUE7RUFDQSxlQUFBO0FDTk47O0FEU0U7O0VBRUUsa0JBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSxPQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0FDUEo7O0FEU0U7RUFDRSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSx1Q0FBQTtFQUFBLCtCQUFBO0FDUEo7O0FEU0U7RUFDRSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0FDUEo7O0FEU0U7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUNBLE9BQUE7RUFDQSxNQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSxvQ0FBQTtBQ1BKIiwiZmlsZSI6InByb2plY3RzL2ZpbGUtcGlja2VyL3NyYy9saWIvZmlsZS1wcmV2aWV3LWNvbnRhaW5lci9maWxlLXByZXZpZXctaXRlbS9maWxlLXByZXZpZXctaXRlbS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBhZGRpbmc6IDIwcHggMTZweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlYmVlZjE7XG4gIG1heC13aWR0aDogNDQwcHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnZpc3VhbGx5LWhpZGRlbiB7XG4gIGJvcmRlcjogMDtcbiAgY2xpcDogcmVjdCgwIDAgMCAwKTtcbiAgaGVpZ2h0OiAxcHg7XG4gIG1hcmdpbjogLTFweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcGFkZGluZzogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMXB4O1xuXG4gIC8vIEF2b2lkIGJyb3dzZXJzIHJlbmRlcmluZyB0aGUgZm9jdXMgcmluZyBpbiBzb21lIGNhc2VzLlxuICBvdXRsaW5lOiAwO1xuXG4gIC8vIEF2b2lkIHNvbWUgY2FzZXMgd2hlcmUgdGhlIGJyb3dzZXIgd2lsbCBzdGlsbCByZW5kZXIgdGhlIG5hdGl2ZSBjb250cm9scyAoc2VlICM5MDQ5KS5cbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG59XG5cbi5maWxlLXByZXZpZXctd3JhcHBlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHdpZHRoOiAxMDAlO1xuICAuZmlsZS1wcmV2aWV3LXRodW1ibmFpbCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHotaW5kZXg6IDI7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIC5pbWctcHJldmlldy10aHVtYm5haWwge1xuICAgICAgd2lkdGg6IDM2cHg7XG4gICAgICBoZWlnaHQ6IDM2cHg7XG4gICAgICBpbWcge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgICAgfVxuICAgIH1cbiAgICAub3RoZXItcHJldmlldy10aHVtYm5haWwge1xuICAgICAgd2lkdGg6IDM2cHg7XG4gICAgICBoZWlnaHQ6IDM2cHg7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgYmFja2dyb3VuZDogIzcwNmZkMztcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgIGNvbG9yOiAjZmZmZmZmO1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgJi5wZGYge1xuICAgICAgICBiYWNrZ3JvdW5kOiAjZTQzOTRlO1xuICAgICAgfVxuICAgICAgJi5kb2MsICYuZG9jeCB7XG4gICAgICAgYmFja2dyb3VuZDogIzIxOTZGMztcbiAgICAgIH1cbiAgICAgICYueGxzLCAmLnhsc3gge1xuICAgICAgICBiYWNrZ3JvdW5kOiAjNENBRjUwO1xuICAgICAgfVxuICAgICAmLnR4dCwgJi5wcHQge1xuICAgICAgIGJhY2tncm91bmQ6ICNGRjk4MDA7XG4gICAgIH1cbiAgICB9XG5cbiAudGh1bWJuYWlsLWJhY2tkcm9wIHtcbiAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgIGxlZnQ6IDA7XG4gICAgIHRvcDowO1xuICAgICB3aWR0aDogMTAwJTtcbiAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgIHRyYW5zaXRpb246IGFsbCAxMDBtcyBlYXNlLWluLW91dDtcbiAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgIGJhY2tncm91bmQ6IHJnYmEoNDMsNTYsNzEsLjIpO1xuICAgfVxuICAgJjpob3ZlciB7XG4gICAgLnRodW1ibmFpbC1iYWNrZHJvcCB7XG4gICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgIH1cbiAgfVxuICAmOmFjdGl2ZSB7XG4gICAgLnRodW1ibmFpbC1iYWNrZHJvcCB7XG4gICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgICAgYmFja2dyb3VuZDogcmdiYSg0Myw1Niw3MSwuNCk7XG4gICAgfVxuICB9XG4gIH1cbiAgLmZpbGUtcHJldmlldy1kZXNjcmlwdGlvbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIHBhZGRpbmctbGVmdDogMTZweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAxNnB4O1xuICAgIGNvbG9yOiAjNzQ4MDlkO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgZmxleDogMTtcbiAgICB6LWluZGV4OiAyO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAuZmlsZS1wcmV2aWV3LXRpdGxlIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICB3aWR0aDogOTAlO1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgY29sb3I6ICM3NDgwOWQ7XG4gICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICBwIHtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgfVxuICAgIH1cbiAgICAuZmlsZS1wcmV2aWV3LXNpemUge1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgY29sb3I6ICM5NzlmYjg7XG4gICAgfVxuICB9XG4gIC5maWxlLXByZXZpZXctYWN0aW9ucyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICB6LWluZGV4OiAzO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAubmd4LWNoZWNrbWFyay13cmFwcGVyIHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICAgIGhlaWdodDogMjBweDtcbiAgICAgIHdpZHRoOiAyMHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgYmFja2dyb3VuZDogIzQzZDA4NDtcbiAgICAgIGJveC1zaGFkb3c6IC0xcHggMXB4IDZweCByZ2JhKDY3LCAyMDgsIDEzMiwgMC44KTtcbiAgICAgIC5uZ3gtY2hlY2ttYXJrIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIGhlaWdodDogMTlweDtcbiAgICAgICAgd2lkdGg6IDE5cHg7XG4gICAgICAgICY6YWZ0ZXIge1xuICAgICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICBsZWZ0OiA3cHg7XG4gICAgICAgICAgdG9wOiA0cHg7XG4gICAgICAgICAgd2lkdGg6IDNweDtcbiAgICAgICAgICBoZWlnaHQ6IDdweDtcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZmZmZmZmO1xuICAgICAgICAgIGJvcmRlci13aWR0aDogMCAzcHggM3B4IDA7XG4gICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLm5neC1jbG9zZS1pY29uLXdyYXBwZXIge1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgYmFja2dyb3VuZDogI2ZlNzY3NjtcbiAgICAgIHBhZGRpbmc6IDNweDtcbiAgICAgIGJveC1zaGFkb3c6IC0xcHggMXB4IDZweCByZ2JhKDI1NCwgMTE4LCAxMTgsIDAuOCk7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuICB9XG4gIC5maWxlLXVwbG9hZC1wcm9ncmVzcy1iYXItd3JhcHBlcixcbiAgLmZpbGUtdXBsb2FkLXBlcmNlbnRhZ2Utd3JhcHBlciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHotaW5kZXg6IDE7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiA5NSU7XG4gICAgbGVmdDogMDtcbiAgICB0b3A6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIG1hcmdpbjogYXV0bztcbiAgfVxuICAuZmlsZS11cGxvYWQtcHJvZ3Jlc3MtYmFyIHtcbiAgICBiYWNrZ3JvdW5kOiAjZWVmMWZhO1xuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICB3aWR0aDogMCU7XG4gICAgaGVpZ2h0OiA5NSU7XG4gICAgdHJhbnNpdGlvbjogd2lkdGggMzAwbXMgZWFzZS1pbjtcbiAgfVxuICAuZmlsZS11cGxvYWQtcGVyY2VudGFnZSB7XG4gICAgcGFkZGluZy1yaWdodDogMTAlO1xuICAgIGNvbG9yOiAjYzJjZGRhO1xuICAgIHBhZGRpbmctdG9wOiA1JTtcbiAgICBmb250LXNpemU6IDE5cHg7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIH1cbiAgLmZpbGUtdXBsb2FkLWVycm9yLXdyYXBwZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB6LWluZGV4OiAxO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogOTUlO1xuICAgIGxlZnQ6IDA7XG4gICAgdG9wOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTQsODQsMTExLC4wNik7XG4gIH1cbn1cbiIsIjpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBhZGRpbmc6IDIwcHggMTZweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlYmVlZjE7XG4gIG1heC13aWR0aDogNDQwcHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnZpc3VhbGx5LWhpZGRlbiB7XG4gIGJvcmRlcjogMDtcbiAgY2xpcDogcmVjdCgwIDAgMCAwKTtcbiAgaGVpZ2h0OiAxcHg7XG4gIG1hcmdpbjogLTFweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcGFkZGluZzogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMXB4O1xuICBvdXRsaW5lOiAwO1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbn1cblxuLmZpbGUtcHJldmlldy13cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgd2lkdGg6IDEwMCU7XG59XG4uZmlsZS1wcmV2aWV3LXdyYXBwZXIgLmZpbGUtcHJldmlldy10aHVtYm5haWwge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5maWxlLXByZXZpZXctd3JhcHBlciAuZmlsZS1wcmV2aWV3LXRodW1ibmFpbCAuaW1nLXByZXZpZXctdGh1bWJuYWlsIHtcbiAgd2lkdGg6IDM2cHg7XG4gIGhlaWdodDogMzZweDtcbn1cbi5maWxlLXByZXZpZXctd3JhcHBlciAuZmlsZS1wcmV2aWV3LXRodW1ibmFpbCAuaW1nLXByZXZpZXctdGh1bWJuYWlsIGltZyB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG59XG4uZmlsZS1wcmV2aWV3LXdyYXBwZXIgLmZpbGUtcHJldmlldy10aHVtYm5haWwgLm90aGVyLXByZXZpZXctdGh1bWJuYWlsIHtcbiAgd2lkdGg6IDM2cHg7XG4gIGhlaWdodDogMzZweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJhY2tncm91bmQ6ICM3MDZmZDM7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbi5maWxlLXByZXZpZXctd3JhcHBlciAuZmlsZS1wcmV2aWV3LXRodW1ibmFpbCAub3RoZXItcHJldmlldy10aHVtYm5haWwucGRmIHtcbiAgYmFja2dyb3VuZDogI2U0Mzk0ZTtcbn1cbi5maWxlLXByZXZpZXctd3JhcHBlciAuZmlsZS1wcmV2aWV3LXRodW1ibmFpbCAub3RoZXItcHJldmlldy10aHVtYm5haWwuZG9jLCAuZmlsZS1wcmV2aWV3LXdyYXBwZXIgLmZpbGUtcHJldmlldy10aHVtYm5haWwgLm90aGVyLXByZXZpZXctdGh1bWJuYWlsLmRvY3gge1xuICBiYWNrZ3JvdW5kOiAjMjE5NkYzO1xufVxuLmZpbGUtcHJldmlldy13cmFwcGVyIC5maWxlLXByZXZpZXctdGh1bWJuYWlsIC5vdGhlci1wcmV2aWV3LXRodW1ibmFpbC54bHMsIC5maWxlLXByZXZpZXctd3JhcHBlciAuZmlsZS1wcmV2aWV3LXRodW1ibmFpbCAub3RoZXItcHJldmlldy10aHVtYm5haWwueGxzeCB7XG4gIGJhY2tncm91bmQ6ICM0Q0FGNTA7XG59XG4uZmlsZS1wcmV2aWV3LXdyYXBwZXIgLmZpbGUtcHJldmlldy10aHVtYm5haWwgLm90aGVyLXByZXZpZXctdGh1bWJuYWlsLnR4dCwgLmZpbGUtcHJldmlldy13cmFwcGVyIC5maWxlLXByZXZpZXctdGh1bWJuYWlsIC5vdGhlci1wcmV2aWV3LXRodW1ibmFpbC5wcHQge1xuICBiYWNrZ3JvdW5kOiAjRkY5ODAwO1xufVxuLmZpbGUtcHJldmlldy13cmFwcGVyIC5maWxlLXByZXZpZXctdGh1bWJuYWlsIC50aHVtYm5haWwtYmFja2Ryb3Age1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIHRyYW5zaXRpb246IGFsbCAxMDBtcyBlYXNlLWluLW91dDtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIGJhY2tncm91bmQ6IHJnYmEoNDMsIDU2LCA3MSwgMC4yKTtcbn1cbi5maWxlLXByZXZpZXctd3JhcHBlciAuZmlsZS1wcmV2aWV3LXRodW1ibmFpbDpob3ZlciAudGh1bWJuYWlsLWJhY2tkcm9wIHtcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbn1cbi5maWxlLXByZXZpZXctd3JhcHBlciAuZmlsZS1wcmV2aWV3LXRodW1ibmFpbDphY3RpdmUgLnRodW1ibmFpbC1iYWNrZHJvcCB7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIGJhY2tncm91bmQ6IHJnYmEoNDMsIDU2LCA3MSwgMC40KTtcbn1cbi5maWxlLXByZXZpZXctd3JhcHBlciAuZmlsZS1wcmV2aWV3LWRlc2NyaXB0aW9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIHBhZGRpbmctbGVmdDogMTZweDtcbiAgcGFkZGluZy1yaWdodDogMTZweDtcbiAgY29sb3I6ICM3NDgwOWQ7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGZsZXg6IDE7XG4gIHotaW5kZXg6IDI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5maWxlLXByZXZpZXctd3JhcHBlciAuZmlsZS1wcmV2aWV3LWRlc2NyaXB0aW9uIC5maWxlLXByZXZpZXctdGl0bGUge1xuICBmb250LXdlaWdodDogNzAwO1xuICB3aWR0aDogOTAlO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGNvbG9yOiAjNzQ4MDlkO1xuICBjdXJzb3I6IGRlZmF1bHQ7XG59XG4uZmlsZS1wcmV2aWV3LXdyYXBwZXIgLmZpbGUtcHJldmlldy1kZXNjcmlwdGlvbiAuZmlsZS1wcmV2aWV3LXRpdGxlIHAge1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBtYXJnaW46IDA7XG59XG4uZmlsZS1wcmV2aWV3LXdyYXBwZXIgLmZpbGUtcHJldmlldy1kZXNjcmlwdGlvbiAuZmlsZS1wcmV2aWV3LXNpemUge1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiAjOTc5ZmI4O1xufVxuLmZpbGUtcHJldmlldy13cmFwcGVyIC5maWxlLXByZXZpZXctYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgei1pbmRleDogMztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmZpbGUtcHJldmlldy13cmFwcGVyIC5maWxlLXByZXZpZXctYWN0aW9ucyAubmd4LWNoZWNrbWFyay13cmFwcGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMjJweDtcbiAgaGVpZ2h0OiAyMHB4O1xuICB3aWR0aDogMjBweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBiYWNrZ3JvdW5kOiAjNDNkMDg0O1xuICBib3gtc2hhZG93OiAtMXB4IDFweCA2cHggcmdiYSg2NywgMjA4LCAxMzIsIDAuOCk7XG59XG4uZmlsZS1wcmV2aWV3LXdyYXBwZXIgLmZpbGUtcHJldmlldy1hY3Rpb25zIC5uZ3gtY2hlY2ttYXJrLXdyYXBwZXIgLm5neC1jaGVja21hcmsge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgaGVpZ2h0OiAxOXB4O1xuICB3aWR0aDogMTlweDtcbn1cbi5maWxlLXByZXZpZXctd3JhcHBlciAuZmlsZS1wcmV2aWV3LWFjdGlvbnMgLm5neC1jaGVja21hcmstd3JhcHBlciAubmd4LWNoZWNrbWFyazphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGxlZnQ6IDdweDtcbiAgdG9wOiA0cHg7XG4gIHdpZHRoOiAzcHg7XG4gIGhlaWdodDogN3B4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZmZmZmZmO1xuICBib3JkZXItd2lkdGg6IDAgM3B4IDNweCAwO1xuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xufVxuLmZpbGUtcHJldmlldy13cmFwcGVyIC5maWxlLXByZXZpZXctYWN0aW9ucyAubmd4LWNsb3NlLWljb24td3JhcHBlciB7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogI2ZlNzY3NjtcbiAgcGFkZGluZzogM3B4O1xuICBib3gtc2hhZG93OiAtMXB4IDFweCA2cHggcmdiYSgyNTQsIDExOCwgMTE4LCAwLjgpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uZmlsZS1wcmV2aWV3LXdyYXBwZXIgLmZpbGUtdXBsb2FkLXByb2dyZXNzLWJhci13cmFwcGVyLFxuLmZpbGUtcHJldmlldy13cmFwcGVyIC5maWxlLXVwbG9hZC1wZXJjZW50YWdlLXdyYXBwZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDE7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDk1JTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG4gIG1hcmdpbjogYXV0bztcbn1cbi5maWxlLXByZXZpZXctd3JhcHBlciAuZmlsZS11cGxvYWQtcHJvZ3Jlc3MtYmFyIHtcbiAgYmFja2dyb3VuZDogI2VlZjFmYTtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICB3aWR0aDogMCU7XG4gIGhlaWdodDogOTUlO1xuICB0cmFuc2l0aW9uOiB3aWR0aCAzMDBtcyBlYXNlLWluO1xufVxuLmZpbGUtcHJldmlldy13cmFwcGVyIC5maWxlLXVwbG9hZC1wZXJjZW50YWdlIHtcbiAgcGFkZGluZy1yaWdodDogMTAlO1xuICBjb2xvcjogI2MyY2RkYTtcbiAgcGFkZGluZy10b3A6IDUlO1xuICBmb250LXNpemU6IDE5cHg7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuLmZpbGUtcHJldmlldy13cmFwcGVyIC5maWxlLXVwbG9hZC1lcnJvci13cmFwcGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAxO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA5NSU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgYm90dG9tOiAwO1xuICBtYXJnaW46IGF1dG87XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU0LCA4NCwgMTExLCAwLjA2KTtcbn0iXX0= */"

/***/ }),

/***/ "./projects/file-picker/src/lib/file-preview-container/file-preview-item/file-preview-item.component.ts":
/*!**************************************************************************************************************!*\
  !*** ./projects/file-picker/src/lib/file-preview-container/file-preview-item/file-preview-item.component.ts ***!
  \**************************************************************************************************************/
/*! exports provided: FilePreviewItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilePreviewItemComponent", function() { return FilePreviewItemComponent; });
/* harmony import */ var _file_picker_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../file-picker.service */ "./projects/file-picker/src/lib/file-picker.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _file_upload_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../file-upload.utils */ "./projects/file-picker/src/lib/file-upload.utils.ts");
/* harmony import */ var _file_picker_adapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../file-picker.adapter */ "./projects/file-picker/src/lib/file-picker.adapter.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FilePreviewItemComponent = /** @class */ (function () {
    function FilePreviewItemComponent(fileService) {
        this.fileService = fileService;
        this.removeFile = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.uploadSuccess = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.uploadFail = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.imageClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.icon = 'checkmark';
    }
    FilePreviewItemComponent.prototype.ngOnInit = function () {
        this.uploadFile(this.fileItem);
        this.fileType = Object(_file_upload_utils__WEBPACK_IMPORTED_MODULE_3__["getFileType"])(this.fileItem.file.type);
        this.safeUrl = this.getSafeUrl(this.fileItem.file);
    };
    FilePreviewItemComponent.prototype.getSafeUrl = function (file) {
        return this.fileService.createSafeUrl(file);
    };
    /** Converts bytes to nice size */
    FilePreviewItemComponent.prototype.niceBytes = function (x) {
        var units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var l = 0, n = parseInt(x, 10) || 0;
        while (n >= 1024 && ++l) {
            n = n / 1024;
        }
        // include a decimal point and a tenths-place digit if presenting
        // less than ten of KB or greater units
        return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
    };
    /** Retry file upload when upload was unsuccessfull */
    FilePreviewItemComponent.prototype.onRetry = function () {
        this.uploadFile(this.fileItem);
    };
    FilePreviewItemComponent.prototype.onCheckMarkClick = function () {
        this.icon = 'error';
    };
    FilePreviewItemComponent.prototype.uploadFile = function (fileItem) {
        var _this = this;
        if (this.adapter) {
            this.uploadSubscription =
                this.adapter.uploadFile(fileItem)
                    .subscribe(function (res) {
                    if (typeof res === 'string') {
                        _this.onUploadSuccess(res, fileItem);
                        _this.uploadProgress = undefined;
                    }
                    if (typeof res === 'number') {
                        _this.uploadProgress = res;
                        //  this.handleProgressResponse(<HttpEvent<any>>res, fileItem);
                    }
                }, function (er) {
                    _this.uploadError = true;
                    _this.uploadFail.next(er);
                    _this.uploadProgress = undefined;
                });
        }
        else {
            console.warn('no adapter was provided');
        }
    };
    /** Emits event when file upload api returns success  */
    FilePreviewItemComponent.prototype.onUploadSuccess = function (id, fileItem) {
        this.fileId = id;
        this.fileItem.fileId = id;
        this.uploadSuccess.next(__assign({}, fileItem, { fileId: id }));
    };
    FilePreviewItemComponent.prototype.handleProgressResponse = function (event, fileName) {
        switch (event.type) {
            case _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpEventType"].Sent:
                return;
            case _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpEventType"].UploadProgress:
                // Compute and show the % done:
                this.uploadProgress = Math.round((100 * event.loaded) / event.total);
                return;
            case _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpEventType"].Response:
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
    FilePreviewItemComponent.prototype.onRemove = function (fileItem) {
        this.uploadUnsubscribe();
        this.removeFile.next(fileItem);
    };
    /** Cancel upload. Cancels request  */
    FilePreviewItemComponent.prototype.uploadUnsubscribe = function () {
        if (this.uploadSubscription) {
            this.uploadSubscription.unsubscribe();
        }
    };
    FilePreviewItemComponent.ctorParameters = function () { return [
        { type: _file_picker_service__WEBPACK_IMPORTED_MODULE_0__["FilePickerService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        __metadata("design:type", Object)
    ], FilePreviewItemComponent.prototype, "removeFile", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        __metadata("design:type", Object)
    ], FilePreviewItemComponent.prototype, "uploadSuccess", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        __metadata("design:type", Object)
    ], FilePreviewItemComponent.prototype, "uploadFail", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        __metadata("design:type", Object)
    ], FilePreviewItemComponent.prototype, "imageClicked", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Object)
    ], FilePreviewItemComponent.prototype, "fileItem", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", _file_picker_adapter__WEBPACK_IMPORTED_MODULE_4__["FilePickerAdapter"])
    ], FilePreviewItemComponent.prototype, "adapter", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"])
    ], FilePreviewItemComponent.prototype, "itemTemplate", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Object)
    ], FilePreviewItemComponent.prototype, "captions", void 0);
    FilePreviewItemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'file-preview-item',
            template: __webpack_require__(/*! raw-loader!./file-preview-item.component.html */ "./node_modules/raw-loader/index.js!./projects/file-picker/src/lib/file-preview-container/file-preview-item/file-preview-item.component.html"),
            styles: [__webpack_require__(/*! ./file-preview-item.component.scss */ "./projects/file-picker/src/lib/file-preview-container/file-preview-item/file-preview-item.component.scss")]
        }),
        __metadata("design:paramtypes", [_file_picker_service__WEBPACK_IMPORTED_MODULE_0__["FilePickerService"]])
    ], FilePreviewItemComponent);
    return FilePreviewItemComponent;
}());



/***/ }),

/***/ "./projects/file-picker/src/lib/file-preview-container/file-preview-item/refresh-icon/refresh-icon.component.scss":
/*!************************************************************************************************************************!*\
  !*** ./projects/file-picker/src/lib/file-preview-container/file-preview-item/refresh-icon/refresh-icon.component.scss ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  margin-right: 12px;\n  font-size: 19px;\n}\n\n.upload-refresh-icon {\n  display: block;\n  color: grey;\n  -webkit-transform: rotateZ(-180deg);\n          transform: rotateZ(-180deg);\n  position: relative;\n  margin-left: 0.25em;\n  margin-top: 0.1875em;\n  width: 0.75em;\n  height: 0.75em;\n  border-radius: 50%;\n  border-top: solid 0.0625em currentColor;\n  border-bottom: solid 0.0625em currentColor;\n  border-left: solid 0.0625em transparent;\n  border-right: solid 0.0625em currentColor;\n  text-decoration: none;\n  -webkit-transition: color 100ms ease-in-out;\n  transition: color 100ms ease-in-out;\n  cursor: pointer;\n}\n\n.upload-refresh-icon:hover {\n  color: #668ee9;\n}\n\n.upload-refresh-icon:before {\n  content: \"\";\n  position: absolute;\n  left: 0.0625em;\n  top: 0.625em;\n  width: 0.1875em;\n  height: 0.1875em;\n  border-top: solid 0.0625em currentColor;\n  border-left: solid 0.0625em currentColor;\n  -webkit-transform: rotate(-22.5deg);\n  transform: rotate(-22.5deg);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JlZGxvYnN0ZXIvcHJvamVjdHMvbmd4LWF3ZXNvbWUtdXBsb2FkZXIvcHJvamVjdHMvZmlsZS1waWNrZXIvc3JjL2xpYi9maWxlLXByZXZpZXctY29udGFpbmVyL2ZpbGUtcHJldmlldy1pdGVtL3JlZnJlc2gtaWNvbi9yZWZyZXNoLWljb24uY29tcG9uZW50LnNjc3MiLCJwcm9qZWN0cy9maWxlLXBpY2tlci9zcmMvbGliL2ZpbGUtcHJldmlldy1jb250YWluZXIvZmlsZS1wcmV2aWV3LWl0ZW0vcmVmcmVzaC1pY29uL3JlZnJlc2gtaWNvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUNDRjs7QURDQTtFQUNFLGNBQUE7RUFDQSxXQUFBO0VBQ0EsbUNBQUE7VUFBQSwyQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSx1Q0FBQTtFQUNBLDBDQUFBO0VBQ0EsdUNBQUE7RUFDQSx5Q0FBQTtFQUNBLHFCQUFBO0VBQ0EsMkNBQUE7RUFBQSxtQ0FBQTtFQUNBLGVBQUE7QUNFRjs7QURERTtFQUNFLGNBQUE7QUNHSjs7QURDQTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsdUNBQUE7RUFDQSx3Q0FBQTtFQUNBLG1DQUFBO0VBQ1EsMkJBQUE7QUNFViIsImZpbGUiOiJwcm9qZWN0cy9maWxlLXBpY2tlci9zcmMvbGliL2ZpbGUtcHJldmlldy1jb250YWluZXIvZmlsZS1wcmV2aWV3LWl0ZW0vcmVmcmVzaC1pY29uL3JlZnJlc2gtaWNvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbi1yaWdodDogMTJweDtcbiAgZm9udC1zaXplOiAxOXB4O1xufVxuLnVwbG9hZC1yZWZyZXNoLWljb24ge1xuICBkaXNwbGF5OiBibG9jaztcbiAgY29sb3I6IGdyZXk7XG4gIHRyYW5zZm9ybTogcm90YXRlWigtMTgwZGVnKTtcbiAgcG9zaXRpb246cmVsYXRpdmU7XG4gIG1hcmdpbi1sZWZ0OiAwLjI1ZW07XG4gIG1hcmdpbi10b3A6IDAuMTg3NWVtO1xuICB3aWR0aDogMC43NWVtO1xuICBoZWlnaHQ6IDAuNzVlbTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBib3JkZXItdG9wOiBzb2xpZCAwLjA2MjVlbSBjdXJyZW50Q29sb3I7XG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDAuMDYyNWVtIGN1cnJlbnRDb2xvcjtcbiAgYm9yZGVyLWxlZnQ6IHNvbGlkIDAuMDYyNWVtIHRyYW5zcGFyZW50O1xuICBib3JkZXItcmlnaHQ6IHNvbGlkIDAuMDYyNWVtIGN1cnJlbnRDb2xvcjtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB0cmFuc2l0aW9uOiBjb2xvciAxMDBtcyBlYXNlLWluLW91dDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICAmOmhvdmVyIHtcbiAgICBjb2xvcjogIzY2OGVlOTtcbiAgfVxufVxuXG4udXBsb2FkLXJlZnJlc2gtaWNvbjpiZWZvcmUge1xuICBjb250ZW50OiAnJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwLjA2MjVlbTtcbiAgdG9wOiAwLjYyNWVtO1xuICB3aWR0aDogMC4xODc1ZW07XG4gIGhlaWdodDogMC4xODc1ZW07XG4gIGJvcmRlci10b3A6IHNvbGlkIDAuMDYyNWVtIGN1cnJlbnRDb2xvcjtcbiAgYm9yZGVyLWxlZnQ6IHNvbGlkIDAuMDYyNWVtIGN1cnJlbnRDb2xvcjtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtMjIuNWRlZyk7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTIyLjVkZWcpO1xufVxuXG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW4tcmlnaHQ6IDEycHg7XG4gIGZvbnQtc2l6ZTogMTlweDtcbn1cblxuLnVwbG9hZC1yZWZyZXNoLWljb24ge1xuICBkaXNwbGF5OiBibG9jaztcbiAgY29sb3I6IGdyZXk7XG4gIHRyYW5zZm9ybTogcm90YXRlWigtMTgwZGVnKTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW4tbGVmdDogMC4yNWVtO1xuICBtYXJnaW4tdG9wOiAwLjE4NzVlbTtcbiAgd2lkdGg6IDAuNzVlbTtcbiAgaGVpZ2h0OiAwLjc1ZW07XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYm9yZGVyLXRvcDogc29saWQgMC4wNjI1ZW0gY3VycmVudENvbG9yO1xuICBib3JkZXItYm90dG9tOiBzb2xpZCAwLjA2MjVlbSBjdXJyZW50Q29sb3I7XG4gIGJvcmRlci1sZWZ0OiBzb2xpZCAwLjA2MjVlbSB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJpZ2h0OiBzb2xpZCAwLjA2MjVlbSBjdXJyZW50Q29sb3I7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgdHJhbnNpdGlvbjogY29sb3IgMTAwbXMgZWFzZS1pbi1vdXQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi51cGxvYWQtcmVmcmVzaC1pY29uOmhvdmVyIHtcbiAgY29sb3I6ICM2NjhlZTk7XG59XG5cbi51cGxvYWQtcmVmcmVzaC1pY29uOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMC4wNjI1ZW07XG4gIHRvcDogMC42MjVlbTtcbiAgd2lkdGg6IDAuMTg3NWVtO1xuICBoZWlnaHQ6IDAuMTg3NWVtO1xuICBib3JkZXItdG9wOiBzb2xpZCAwLjA2MjVlbSBjdXJyZW50Q29sb3I7XG4gIGJvcmRlci1sZWZ0OiBzb2xpZCAwLjA2MjVlbSBjdXJyZW50Q29sb3I7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTIyLjVkZWcpO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgtMjIuNWRlZyk7XG59Il19 */"

/***/ }),

/***/ "./projects/file-picker/src/lib/file-preview-container/file-preview-item/refresh-icon/refresh-icon.component.ts":
/*!**********************************************************************************************************************!*\
  !*** ./projects/file-picker/src/lib/file-preview-container/file-preview-item/refresh-icon/refresh-icon.component.ts ***!
  \**********************************************************************************************************************/
/*! exports provided: RefreshIconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefreshIconComponent", function() { return RefreshIconComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RefreshIconComponent = /** @class */ (function () {
    function RefreshIconComponent() {
        this.retry = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    RefreshIconComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], RefreshIconComponent.prototype, "retry", void 0);
    RefreshIconComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'refresh-icon',
            template: __webpack_require__(/*! raw-loader!./refresh-icon.component.html */ "./node_modules/raw-loader/index.js!./projects/file-picker/src/lib/file-preview-container/file-preview-item/refresh-icon/refresh-icon.component.html"),
            styles: [__webpack_require__(/*! ./refresh-icon.component.scss */ "./projects/file-picker/src/lib/file-preview-container/file-preview-item/refresh-icon/refresh-icon.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], RefreshIconComponent);
    return RefreshIconComponent;
}());



/***/ }),

/***/ "./projects/file-picker/src/lib/file-preview-container/preview-lightbox/preview-lightbox.component.scss":
/*!**************************************************************************************************************!*\
  !*** ./projects/file-picker/src/lib/file-preview-container/preview-lightbox/preview-lightbox.component.scss ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  position: fixed;\n  /* Stay in place */\n  z-index: 1040;\n  /* Sit on top */\n  left: 0;\n  top: 0;\n  width: 100vw;\n  /* Full width */\n  height: 100vh;\n  /* Full height */\n  overflow: auto;\n  /* Enable scroll if needed */\n  overflow: hidden;\n}\n\n.ng-modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background: rgba(0, 0, 0, 0.288);\n}\n\n.ng-modal-content {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  color: rgba(0, 0, 0, 0.87);\n  z-index: 1041;\n}\n\n.ng-modal-content .close-icon-wrapper {\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  font-size: 20px;\n}\n\n.ng-modal-content .lightbox-item img {\n  max-width: calc(100vw - 30px);\n  max-height: calc(100vh - 30px);\n  width: 100%;\n  height: auto;\n  -o-object-fit: contain;\n     object-fit: contain;\n  -webkit-animation-name: zoomIn;\n          animation-name: zoomIn;\n  -webkit-animation-duration: 200ms;\n          animation-duration: 200ms;\n}\n\n@-webkit-keyframes zoomIn {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n            transform: scale3d(0.9, 0.9, 0.9);\n  }\n  50% {\n    opacity: 1;\n  }\n}\n\n@keyframes zoomIn {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n            transform: scale3d(0.9, 0.9, 0.9);\n  }\n  50% {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JlZGxvYnN0ZXIvcHJvamVjdHMvbmd4LWF3ZXNvbWUtdXBsb2FkZXIvcHJvamVjdHMvZmlsZS1waWNrZXIvc3JjL2xpYi9maWxlLXByZXZpZXctY29udGFpbmVyL3ByZXZpZXctbGlnaHRib3gvcHJldmlldy1saWdodGJveC5jb21wb25lbnQuc2NzcyIsInByb2plY3RzL2ZpbGUtcGlja2VyL3NyYy9saWIvZmlsZS1wcmV2aWV3LWNvbnRhaW5lci9wcmV2aWV3LWxpZ2h0Ym94L3ByZXZpZXctbGlnaHRib3guY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw0QkFBQTtFQUFBLDZCQUFBO1VBQUEsc0JBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLGVBQUE7RUFBaUIsa0JBQUE7RUFDakIsYUFBQTtFQUFlLGVBQUE7RUFDZixPQUFBO0VBQ0EsTUFBQTtFQUNBLFlBQUE7RUFBYyxlQUFBO0VBQ2QsYUFBQTtFQUFlLGdCQUFBO0VBQ2YsY0FBQTtFQUFnQiw0QkFBQTtFQUNoQixnQkFBQTtBQ01GOztBREpBO0VBQ0UsZUFBQTtFQUNBLE1BQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxhQUFBO0VBQ0EsZ0NBQUE7QUNPRjs7QURMQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsMEJBQUE7RUFDQSxhQUFBO0FDUUY7O0FEUEU7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ1NKOztBRE5JO0VBQ0UsNkJBQUE7RUFDQSw4QkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUE7S0FBQSxtQkFBQTtFQUNBLDhCQUFBO1VBQUEsc0JBQUE7RUFDQSxpQ0FBQTtVQUFBLHlCQUFBO0FDUU47O0FESkE7RUFDRTtJQUNFLFVBQUE7SUFDQSx5Q0FBQTtZQUFBLGlDQUFBO0VDT0Y7RURKQTtJQUNFLFVBQUE7RUNNRjtBQUNGOztBRGRBO0VBQ0U7SUFDRSxVQUFBO0lBQ0EseUNBQUE7WUFBQSxpQ0FBQTtFQ09GO0VESkE7SUFDRSxVQUFBO0VDTUY7QUFDRiIsImZpbGUiOiJwcm9qZWN0cy9maWxlLXBpY2tlci9zcmMvbGliL2ZpbGUtcHJldmlldy1jb250YWluZXIvcHJldmlldy1saWdodGJveC9wcmV2aWV3LWxpZ2h0Ym94LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcG9zaXRpb246IGZpeGVkOyAvKiBTdGF5IGluIHBsYWNlICovXG4gIHotaW5kZXg6IDEwNDA7IC8qIFNpdCBvbiB0b3AgKi9cbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICB3aWR0aDogMTAwdnc7IC8qIEZ1bGwgd2lkdGggKi9cbiAgaGVpZ2h0OiAxMDB2aDsgLyogRnVsbCBoZWlnaHQgKi9cbiAgb3ZlcmZsb3c6IGF1dG87IC8qIEVuYWJsZSBzY3JvbGwgaWYgbmVlZGVkICovXG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4ubmctbW9kYWwtYmFja2Ryb3Age1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgei1pbmRleDogMTA0MDtcbiAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwuMjg4KTtcbn1cbi5uZy1tb2RhbC1jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGNvbG9yOiByZ2JhKDAsMCwwLC44Nyk7XG4gIHotaW5kZXg6IDEwNDE7XG4gIC5jbG9zZS1pY29uLXdyYXBwZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDIwcHg7XG4gICAgcmlnaHQ6IDIwcHg7XG4gICAgZm9udC1zaXplOiAyMHB4O1xuICB9XG4gIC5saWdodGJveC1pdGVtIHtcbiAgICBpbWcge1xuICAgICAgbWF4LXdpZHRoOiBjYWxjKDEwMHZ3IC0gMzBweCk7XG4gICAgICBtYXgtaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMzBweCk7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGhlaWdodDogYXV0bztcbiAgICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gICAgICBhbmltYXRpb24tbmFtZTogem9vbUluO1xuICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAyMDBtcztcbiAgICB9XG4gIH1cbn1cbkBrZXlmcmFtZXMgem9vbUluIHtcbiAgZnJvbSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHNjYWxlM2QoMC45LCAwLjksIDAuOSk7XG4gIH1cblxuICA1MCUge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cbiIsIjpob3N0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgLyogU3RheSBpbiBwbGFjZSAqL1xuICB6LWluZGV4OiAxMDQwO1xuICAvKiBTaXQgb24gdG9wICovXG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgd2lkdGg6IDEwMHZ3O1xuICAvKiBGdWxsIHdpZHRoICovXG4gIGhlaWdodDogMTAwdmg7XG4gIC8qIEZ1bGwgaGVpZ2h0ICovXG4gIG92ZXJmbG93OiBhdXRvO1xuICAvKiBFbmFibGUgc2Nyb2xsIGlmIG5lZWRlZCAqL1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4ubmctbW9kYWwtYmFja2Ryb3Age1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgei1pbmRleDogMTA0MDtcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjI4OCk7XG59XG5cbi5uZy1tb2RhbC1jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuODcpO1xuICB6LWluZGV4OiAxMDQxO1xufVxuLm5nLW1vZGFsLWNvbnRlbnQgLmNsb3NlLWljb24td3JhcHBlciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAyMHB4O1xuICByaWdodDogMjBweDtcbiAgZm9udC1zaXplOiAyMHB4O1xufVxuLm5nLW1vZGFsLWNvbnRlbnQgLmxpZ2h0Ym94LWl0ZW0gaW1nIHtcbiAgbWF4LXdpZHRoOiBjYWxjKDEwMHZ3IC0gMzBweCk7XG4gIG1heC1oZWlnaHQ6IGNhbGMoMTAwdmggLSAzMHB4KTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgYW5pbWF0aW9uLW5hbWU6IHpvb21JbjtcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAyMDBtcztcbn1cblxuQGtleWZyYW1lcyB6b29tSW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogc2NhbGUzZCgwLjksIDAuOSwgMC45KTtcbiAgfVxuICA1MCUge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn0iXX0= */"

/***/ }),

/***/ "./projects/file-picker/src/lib/file-preview-container/preview-lightbox/preview-lightbox.component.ts":
/*!************************************************************************************************************!*\
  !*** ./projects/file-picker/src/lib/file-preview-container/preview-lightbox/preview-lightbox.component.ts ***!
  \************************************************************************************************************/
/*! exports provided: PreviewLightboxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreviewLightboxComponent", function() { return PreviewLightboxComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PreviewLightboxComponent = /** @class */ (function () {
    function PreviewLightboxComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.close = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    PreviewLightboxComponent.prototype.ngOnInit = function () {
        this.getSafeUrl(this.file.file);
    };
    PreviewLightboxComponent.prototype.getSafeUrl = function (file) {
        var url = window.URL.createObjectURL(file);
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    PreviewLightboxComponent.prototype.onClose = function (event) {
        this.close.next();
    };
    PreviewLightboxComponent.ctorParameters = function () { return [
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], PreviewLightboxComponent.prototype, "file", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], PreviewLightboxComponent.prototype, "close", void 0);
    PreviewLightboxComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'preview-lightbox',
            template: __webpack_require__(/*! raw-loader!./preview-lightbox.component.html */ "./node_modules/raw-loader/index.js!./projects/file-picker/src/lib/file-preview-container/preview-lightbox/preview-lightbox.component.html"),
            styles: [__webpack_require__(/*! ./preview-lightbox.component.scss */ "./projects/file-picker/src/lib/file-preview-container/preview-lightbox/preview-lightbox.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"]])
    ], PreviewLightboxComponent);
    return PreviewLightboxComponent;
}());



/***/ }),

/***/ "./projects/file-picker/src/lib/file-upload.utils.ts":
/*!***********************************************************!*\
  !*** ./projects/file-picker/src/lib/file-upload.utils.ts ***!
  \***********************************************************/
/*! exports provided: getFileType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFileType", function() { return getFileType; });
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


/***/ }),

/***/ "./projects/file-picker/src/lib/icons/close-icon/close-icon.component.scss":
/*!*********************************************************************************!*\
  !*** ./projects/file-picker/src/lib/icons/close-icon/close-icon.component.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  cursor: pointer;\n}\n\n.ngx-close-icon {\n  color: #ffffff;\n  position: relative;\n  margin-top: 0;\n  margin-left: 0;\n  width: 1.3125em;\n  height: 1.3125em;\n}\n\n.ngx-close-icon:before {\n  content: \"\";\n  position: absolute;\n  top: 0.625em;\n  width: 1.3125em;\n  height: 0.2em;\n  background-color: currentColor;\n  -webkit-transform: rotate(-45deg);\n  transform: rotate(-45deg);\n}\n\n.ngx-close-icon:after {\n  content: \"\";\n  position: absolute;\n  top: 0.625em;\n  width: 1.3125em;\n  height: 0.2em;\n  background-color: currentColor;\n  -webkit-transform: rotate(45deg);\n  transform: rotate(45deg);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JlZGxvYnN0ZXIvcHJvamVjdHMvbmd4LWF3ZXNvbWUtdXBsb2FkZXIvcHJvamVjdHMvZmlsZS1waWNrZXIvc3JjL2xpYi9pY29ucy9jbG9zZS1pY29uL2Nsb3NlLWljb24uY29tcG9uZW50LnNjc3MiLCJwcm9qZWN0cy9maWxlLXBpY2tlci9zcmMvbGliL2ljb25zL2Nsb3NlLWljb24vY2xvc2UtaWNvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0FDQ0Y7O0FEQ0E7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQ0VGOztBRENBO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxpQ0FBQTtFQUNBLHlCQUFBO0FDRUY7O0FEQ0E7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7RUFDQSw4QkFBQTtFQUNBLGdDQUFBO0VBQ0Esd0JBQUE7QUNFRiIsImZpbGUiOiJwcm9qZWN0cy9maWxlLXBpY2tlci9zcmMvbGliL2ljb25zL2Nsb3NlLWljb24vY2xvc2UtaWNvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5uZ3gtY2xvc2UtaWNvbiB7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1hcmdpbi10b3A6IDA7XG4gIG1hcmdpbi1sZWZ0OiAwO1xuICB3aWR0aDogMS4zMTI1ZW07XG4gIGhlaWdodDogMS4zMTI1ZW07XG59XG5cbi5uZ3gtY2xvc2UtaWNvbjpiZWZvcmUge1xuICBjb250ZW50OiAnJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDAuNjI1ZW07XG4gIHdpZHRoOiAxLjMxMjVlbTtcbiAgaGVpZ2h0OiAwLjJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogY3VycmVudENvbG9yO1xuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG4gIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG59XG5cbi5uZ3gtY2xvc2UtaWNvbjphZnRlciB7XG4gIGNvbnRlbnQ6ICcnO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMC42MjVlbTtcbiAgd2lkdGg6IDEuMzEyNWVtO1xuICBoZWlnaHQ6IDAuMmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBjdXJyZW50Q29sb3I7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5uZ3gtY2xvc2UtaWNvbiB7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1hcmdpbi10b3A6IDA7XG4gIG1hcmdpbi1sZWZ0OiAwO1xuICB3aWR0aDogMS4zMTI1ZW07XG4gIGhlaWdodDogMS4zMTI1ZW07XG59XG5cbi5uZ3gtY2xvc2UtaWNvbjpiZWZvcmUge1xuICBjb250ZW50OiBcIlwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMC42MjVlbTtcbiAgd2lkdGg6IDEuMzEyNWVtO1xuICBoZWlnaHQ6IDAuMmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBjdXJyZW50Q29sb3I7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbiAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbn1cblxuLm5neC1jbG9zZS1pY29uOmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDAuNjI1ZW07XG4gIHdpZHRoOiAxLjMxMjVlbTtcbiAgaGVpZ2h0OiAwLjJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogY3VycmVudENvbG9yO1xuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xufSJdfQ== */"

/***/ }),

/***/ "./projects/file-picker/src/lib/icons/close-icon/close-icon.component.ts":
/*!*******************************************************************************!*\
  !*** ./projects/file-picker/src/lib/icons/close-icon/close-icon.component.ts ***!
  \*******************************************************************************/
/*! exports provided: CloseIconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloseIconComponent", function() { return CloseIconComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CloseIconComponent = /** @class */ (function () {
    function CloseIconComponent() {
    }
    CloseIconComponent.prototype.ngOnInit = function () {
    };
    CloseIconComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'close-icon',
            template: __webpack_require__(/*! raw-loader!./close-icon.component.html */ "./node_modules/raw-loader/index.js!./projects/file-picker/src/lib/icons/close-icon/close-icon.component.html"),
            styles: [__webpack_require__(/*! ./close-icon.component.scss */ "./projects/file-picker/src/lib/icons/close-icon/close-icon.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], CloseIconComponent);
    return CloseIconComponent;
}());



/***/ }),

/***/ "./projects/file-picker/src/lib/icons/cloud-icon/cloud-icon.component.scss":
/*!*********************************************************************************!*\
  !*** ./projects/file-picker/src/lib/icons/cloud-icon/cloud-icon.component.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  font-size: 48px;\n  margin-bottom: 0.4em;\n  height: 1.36em;\n  width: 1.36em;\n  position: relative;\n}\n\n.cloud-upload-icon {\n  color: #000;\n  position: absolute;\n  margin-left: 0.0625em;\n  margin-top: 0.5625em;\n  width: 0.3725em;\n  height: 0.49em;\n  border-radius: 0.25em 0 0 0.25em;\n  border-left: solid 0.0625em #673ab7;\n  border-top: solid 0.0625em #673ab7;\n  border-bottom: solid 0.0625em #673ab7;\n}\n\n.cloud-upload-icon:before {\n  content: \"\";\n  position: absolute;\n  top: -0.4375em;\n  left: 0.25em;\n  width: 0.75em;\n  height: 0.75em;\n  border-radius: 50%;\n  -webkit-transform: rotate(-45deg);\n  transform: rotate(-45deg);\n  border-left: solid 0.0625em transparent;\n  border-right: solid 0.0625em #673ab7;\n  border-top: solid 0.0625em #673ab7;\n  border-bottom: solid 0.0625em #673ab7;\n}\n\n.cloud-upload-icon:after {\n  content: \"\";\n  position: absolute;\n  top: 0.3125em;\n  left: 0.3125em;\n  width: 0.5625em;\n  height: 0.125em;\n  color: #fff;\n  background-color: #673ab7;\n}\n\n.cloud-upload-icon i {\n  position: absolute;\n  left: 0.3125em;\n  top: -0.25em;\n  z-index: 2;\n}\n\n.cloud-upload-icon i:before {\n  content: \"\";\n  position: absolute;\n  top: 0.25em;\n  left: 0.0625em;\n  width: 0.0625em;\n  height: 0.4375em;\n  background-color: #673ab7;\n  border-left: solid 0.25em #fff;\n  border-right: solid 0.25em #fff;\n}\n\n.cloud-upload-icon i:after {\n  content: \"\";\n  position: absolute;\n  left: 0.1875em;\n  top: 0.25em;\n  width: 0.25em;\n  height: 0.25em;\n  border-top: solid 0.0625em #673ab7;\n  border-right: solid 0.0625em #673ab7;\n  -webkit-transform: rotate(-45deg);\n  transform: rotate(-45deg);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JlZGxvYnN0ZXIvcHJvamVjdHMvbmd4LWF3ZXNvbWUtdXBsb2FkZXIvcHJvamVjdHMvZmlsZS1waWNrZXIvc3JjL2xpYi9pY29ucy9jbG91ZC1pY29uL2Nsb3VkLWljb24uY29tcG9uZW50LnNjc3MiLCJwcm9qZWN0cy9maWxlLXBpY2tlci9zcmMvbGliL2ljb25zL2Nsb3VkLWljb24vY2xvdWQtaWNvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0Esb0JBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0FDQ0Y7O0FER0E7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLG9CQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSxnQ0FBQTtFQUNBLG1DQUFBO0VBQ0Esa0NBQUE7RUFDQSxxQ0FBQTtBQ0FGOztBREVBO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsaUNBQUE7RUFDQSx5QkFBQTtFQUNBLHVDQUFBO0VBQ0Esb0NBQUE7RUFDQSxrQ0FBQTtFQUNBLHFDQUFBO0FDQ0Y7O0FEQ0E7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtFQUNBLHlCQXJDTTtBQ3VDUjs7QURBQTtFQUNFLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0FDR0Y7O0FEREE7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQXBETTtFQXFETiw4QkFBQTtFQUNBLCtCQUFBO0FDSUY7O0FERkE7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0Esa0NBQUE7RUFDQSxvQ0FBQTtFQUNBLGlDQUFBO0VBQ0EseUJBQUE7QUNLRiIsImZpbGUiOiJwcm9qZWN0cy9maWxlLXBpY2tlci9zcmMvbGliL2ljb25zL2Nsb3VkLWljb24vY2xvdWQtaWNvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZvbnQtc2l6ZTogNDhweDtcbiAgbWFyZ2luLWJvdHRvbTogMC40ZW07XG4gIGhlaWdodDogMS4zNmVtO1xuICB3aWR0aDogMS4zNmVtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4kY29sb3I6ICM2NzNhYjc7XG4vLyAkY29sb3I6ICM3ODlCRUM7XG4uY2xvdWQtdXBsb2FkLWljb24ge1xuICBjb2xvcjogIzAwMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBtYXJnaW4tbGVmdDogMC4wNjI1ZW07XG4gIG1hcmdpbi10b3A6IDAuNTYyNWVtO1xuICB3aWR0aDogMC4zNzI1ZW07XG4gIGhlaWdodDogMC40OWVtO1xuICBib3JkZXItcmFkaXVzOiAwLjI1ZW0gMCAwIDAuMjVlbTtcbiAgYm9yZGVyLWxlZnQ6IHNvbGlkIDAuMDYyNWVtICRjb2xvcjtcbiAgYm9yZGVyLXRvcDogc29saWQgMC4wNjI1ZW0gJGNvbG9yO1xuICBib3JkZXItYm90dG9tOiBzb2xpZCAwLjA2MjVlbSAkY29sb3I7XG59XG4uY2xvdWQtdXBsb2FkLWljb246YmVmb3JlIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAtMC40Mzc1ZW07XG4gIGxlZnQ6IDAuMjVlbTtcbiAgd2lkdGg6IDAuNzVlbTtcbiAgaGVpZ2h0OiAwLjc1ZW07XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xuICBib3JkZXItbGVmdDogc29saWQgMC4wNjI1ZW0gdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1yaWdodDogc29saWQgMC4wNjI1ZW0gJGNvbG9yO1xuICBib3JkZXItdG9wOiBzb2xpZCAwLjA2MjVlbSAkY29sb3I7XG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDAuMDYyNWVtICRjb2xvcjtcbn1cbi5jbG91ZC11cGxvYWQtaWNvbjphZnRlciB7XG4gIGNvbnRlbnQ6ICcnO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMC4zMTI1ZW07XG4gIGxlZnQ6IDAuMzEyNWVtO1xuICB3aWR0aDogMC41NjI1ZW07XG4gIGhlaWdodDogMC4xMjVlbTtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcjtcbn1cbi5jbG91ZC11cGxvYWQtaWNvbiBpIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwLjMxMjVlbTtcbiAgdG9wOiAtMC4yNWVtO1xuICB6LWluZGV4OiAyO1xufVxuLmNsb3VkLXVwbG9hZC1pY29uIGk6YmVmb3JlIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwLjI1ZW07XG4gIGxlZnQ6IDAuMDYyNWVtO1xuICB3aWR0aDogMC4wNjI1ZW07XG4gIGhlaWdodDogMC40Mzc1ZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcjtcbiAgYm9yZGVyLWxlZnQ6IHNvbGlkIDAuMjVlbSAjZmZmO1xuICBib3JkZXItcmlnaHQ6IHNvbGlkIDAuMjVlbSAjZmZmO1xufVxuLmNsb3VkLXVwbG9hZC1pY29uIGk6YWZ0ZXIge1xuICBjb250ZW50OiAnJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwLjE4NzVlbTtcbiAgdG9wOiAwLjI1ZW07XG4gIHdpZHRoOiAwLjI1ZW07XG4gIGhlaWdodDogMC4yNWVtO1xuICBib3JkZXItdG9wOiBzb2xpZCAwLjA2MjVlbSAkY29sb3I7XG4gIGJvcmRlci1yaWdodDogc29saWQgMC4wNjI1ZW0gJGNvbG9yO1xuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG4gIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXNpemU6IDQ4cHg7XG4gIG1hcmdpbi1ib3R0b206IDAuNGVtO1xuICBoZWlnaHQ6IDEuMzZlbTtcbiAgd2lkdGg6IDEuMzZlbTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uY2xvdWQtdXBsb2FkLWljb24ge1xuICBjb2xvcjogIzAwMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBtYXJnaW4tbGVmdDogMC4wNjI1ZW07XG4gIG1hcmdpbi10b3A6IDAuNTYyNWVtO1xuICB3aWR0aDogMC4zNzI1ZW07XG4gIGhlaWdodDogMC40OWVtO1xuICBib3JkZXItcmFkaXVzOiAwLjI1ZW0gMCAwIDAuMjVlbTtcbiAgYm9yZGVyLWxlZnQ6IHNvbGlkIDAuMDYyNWVtICM2NzNhYjc7XG4gIGJvcmRlci10b3A6IHNvbGlkIDAuMDYyNWVtICM2NzNhYjc7XG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDAuMDYyNWVtICM2NzNhYjc7XG59XG5cbi5jbG91ZC11cGxvYWQtaWNvbjpiZWZvcmUge1xuICBjb250ZW50OiBcIlwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogLTAuNDM3NWVtO1xuICBsZWZ0OiAwLjI1ZW07XG4gIHdpZHRoOiAwLjc1ZW07XG4gIGhlaWdodDogMC43NWVtO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbiAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbiAgYm9yZGVyLWxlZnQ6IHNvbGlkIDAuMDYyNWVtIHRyYW5zcGFyZW50O1xuICBib3JkZXItcmlnaHQ6IHNvbGlkIDAuMDYyNWVtICM2NzNhYjc7XG4gIGJvcmRlci10b3A6IHNvbGlkIDAuMDYyNWVtICM2NzNhYjc7XG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDAuMDYyNWVtICM2NzNhYjc7XG59XG5cbi5jbG91ZC11cGxvYWQtaWNvbjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwLjMxMjVlbTtcbiAgbGVmdDogMC4zMTI1ZW07XG4gIHdpZHRoOiAwLjU2MjVlbTtcbiAgaGVpZ2h0OiAwLjEyNWVtO1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzY3M2FiNztcbn1cblxuLmNsb3VkLXVwbG9hZC1pY29uIGkge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDAuMzEyNWVtO1xuICB0b3A6IC0wLjI1ZW07XG4gIHotaW5kZXg6IDI7XG59XG5cbi5jbG91ZC11cGxvYWQtaWNvbiBpOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwLjI1ZW07XG4gIGxlZnQ6IDAuMDYyNWVtO1xuICB3aWR0aDogMC4wNjI1ZW07XG4gIGhlaWdodDogMC40Mzc1ZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICM2NzNhYjc7XG4gIGJvcmRlci1sZWZ0OiBzb2xpZCAwLjI1ZW0gI2ZmZjtcbiAgYm9yZGVyLXJpZ2h0OiBzb2xpZCAwLjI1ZW0gI2ZmZjtcbn1cblxuLmNsb3VkLXVwbG9hZC1pY29uIGk6YWZ0ZXIge1xuICBjb250ZW50OiBcIlwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDAuMTg3NWVtO1xuICB0b3A6IDAuMjVlbTtcbiAgd2lkdGg6IDAuMjVlbTtcbiAgaGVpZ2h0OiAwLjI1ZW07XG4gIGJvcmRlci10b3A6IHNvbGlkIDAuMDYyNWVtICM2NzNhYjc7XG4gIGJvcmRlci1yaWdodDogc29saWQgMC4wNjI1ZW0gIzY3M2FiNztcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xufSJdfQ== */"

/***/ }),

/***/ "./projects/file-picker/src/lib/icons/cloud-icon/cloud-icon.component.ts":
/*!*******************************************************************************!*\
  !*** ./projects/file-picker/src/lib/icons/cloud-icon/cloud-icon.component.ts ***!
  \*******************************************************************************/
/*! exports provided: CloudIconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloudIconComponent", function() { return CloudIconComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CloudIconComponent = /** @class */ (function () {
    function CloudIconComponent() {
    }
    CloudIconComponent.prototype.ngOnInit = function () {
    };
    CloudIconComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'cloud-icon',
            template: __webpack_require__(/*! raw-loader!./cloud-icon.component.html */ "./node_modules/raw-loader/index.js!./projects/file-picker/src/lib/icons/cloud-icon/cloud-icon.component.html"),
            styles: [__webpack_require__(/*! ./cloud-icon.component.scss */ "./projects/file-picker/src/lib/icons/cloud-icon/cloud-icon.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], CloudIconComponent);
    return CloudIconComponent;
}());



/***/ }),

/***/ "./projects/file-picker/src/lib/validation-error.model.ts":
/*!****************************************************************!*\
  !*** ./projects/file-picker/src/lib/validation-error.model.ts ***!
  \****************************************************************/
/*! exports provided: FileValidationTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileValidationTypes", function() { return FileValidationTypes; });
var FileValidationTypes;
(function (FileValidationTypes) {
    FileValidationTypes["fileMaxSize"] = "FILE_MAX_SIZE";
    FileValidationTypes["fileMaxCount"] = "FILE_MAX_COUNT";
    FileValidationTypes["totalMaxSize"] = "TOTAL_MAX_SIZE";
    FileValidationTypes["extensions"] = "EXTENSIONS";
    FileValidationTypes["uploadType"] = "UPLOAD_TYPE";
    FileValidationTypes["customValidator"] = "CUSTOM_VALIDATOR";
})(FileValidationTypes || (FileValidationTypes = {}));


/***/ }),

/***/ "./projects/file-picker/src/public_api.ts":
/*!************************************************!*\
  !*** ./projects/file-picker/src/public_api.ts ***!
  \************************************************/
/*! exports provided: FilePickerService, FilePickerComponent, FilePickerModule, FilePickerAdapter, FileValidationTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_file_picker_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/file-picker.service */ "./projects/file-picker/src/lib/file-picker.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FilePickerService", function() { return _lib_file_picker_service__WEBPACK_IMPORTED_MODULE_0__["FilePickerService"]; });

/* harmony import */ var _lib_file_picker_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/file-picker.component */ "./projects/file-picker/src/lib/file-picker.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FilePickerComponent", function() { return _lib_file_picker_component__WEBPACK_IMPORTED_MODULE_1__["FilePickerComponent"]; });

/* harmony import */ var _lib_file_picker_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/file-picker.module */ "./projects/file-picker/src/lib/file-picker.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FilePickerModule", function() { return _lib_file_picker_module__WEBPACK_IMPORTED_MODULE_2__["FilePickerModule"]; });

/* harmony import */ var _lib_file_picker_adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/file-picker.adapter */ "./projects/file-picker/src/lib/file-picker.adapter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FilePickerAdapter", function() { return _lib_file_picker_adapter__WEBPACK_IMPORTED_MODULE_3__["FilePickerAdapter"]; });

/* harmony import */ var _lib_validation_error_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/validation-error.model */ "./projects/file-picker/src/lib/validation-error.model.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FileValidationTypes", function() { return _lib_validation_error_model__WEBPACK_IMPORTED_MODULE_4__["FileValidationTypes"]; });

/*
 * Public API Surface of file-picker
 */







/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var routes = [];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'ngx-awesome-uploader';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _demo_file_picker_demo_file_picker_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./demo-file-picker/demo-file-picker.component */ "./src/app/demo-file-picker/demo-file-picker.component.ts");
/* harmony import */ var projects_file_picker_src_public_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! projects/file-picker/src/public_api */ "./projects/file-picker/src/public_api.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _demo_file_picker_demo_file_picker_component__WEBPACK_IMPORTED_MODULE_4__["DemoFilePickerComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                projects_file_picker_src_public_api__WEBPACK_IMPORTED_MODULE_5__["FilePickerModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/demo-file-picker/demo-file-picker.adapter.ts":
/*!**************************************************************!*\
  !*** ./src/app/demo-file-picker/demo-file-picker.adapter.ts ***!
  \**************************************************************/
/*! exports provided: DemoFilePickerAdapter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemoFilePickerAdapter", function() { return DemoFilePickerAdapter; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var projects_file_picker_src_lib_file_picker_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! projects/file-picker/src/lib/file-picker.adapter */ "./projects/file-picker/src/lib/file-picker.adapter.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var DemoFilePickerAdapter = /** @class */ (function (_super) {
    __extends(DemoFilePickerAdapter, _super);
    function DemoFilePickerAdapter(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    DemoFilePickerAdapter.prototype.uploadFile = function (fileItem) {
        var form = new FormData();
        form.append('file', fileItem.file);
        var api = 'https://file-picker-demo.free.beeceptor.co';
        var req = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpRequest"]('POST', api, form, { reportProgress: true });
        return this.http.request(req)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (res) {
            if (res.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpEventType"].Response) {
                return res.body.id.toString();
            }
            else if (res.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpEventType"].UploadProgress) {
                // Compute and show the % done:
                var UploadProgress = +Math.round((100 * res.loaded) / res.total);
                return UploadProgress;
            }
        }));
    };
    DemoFilePickerAdapter.prototype.removeFile = function (fileItem) {
        console.log(fileItem.fileId);
        var removeApi = 'https://file-remove-demo.free.beeceptor.com';
        return this.http.post(removeApi, { id: fileItem.fileId });
    };
    DemoFilePickerAdapter.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"] }
    ]; };
    return DemoFilePickerAdapter;
}(projects_file_picker_src_lib_file_picker_adapter__WEBPACK_IMPORTED_MODULE_2__["FilePickerAdapter"]));



/***/ }),

/***/ "./src/app/demo-file-picker/demo-file-picker.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/demo-file-picker/demo-file-picker.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RlbW8tZmlsZS1waWNrZXIvZGVtby1maWxlLXBpY2tlci5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/demo-file-picker/demo-file-picker.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/demo-file-picker/demo-file-picker.component.ts ***!
  \****************************************************************/
/*! exports provided: DemoFilePickerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemoFilePickerComponent", function() { return DemoFilePickerComponent; });
/* harmony import */ var _projects_file_picker_src_lib_file_picker_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../projects/file-picker/src/lib/file-picker.component */ "./projects/file-picker/src/lib/file-picker.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _demo_file_picker_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./demo-file-picker.adapter */ "./src/app/demo-file-picker/demo-file-picker.adapter.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DemoFilePickerComponent = /** @class */ (function () {
    function DemoFilePickerComponent(http) {
        this.http = http;
        this.adapter = new _demo_file_picker_adapter__WEBPACK_IMPORTED_MODULE_2__["DemoFilePickerAdapter"](this.http);
        this.myFiles = [];
        this.captions = {
            dropzone: {
                title: "Fayllari bura ata bilersiz",
                or: "və yaxud",
                browse: "Fayl seçin"
            },
            cropper: {
                crop: "Kəs",
                cancel: "Imtina"
            },
            previewCard: {
                remove: "Sil",
                uploadError: "Fayl yüklənmədi"
            }
        };
    }
    DemoFilePickerComponent.prototype.ngOnInit = function () {
    };
    DemoFilePickerComponent.prototype.onValidationError = function (e) {
        console.log(e);
    };
    DemoFilePickerComponent.prototype.onUploadSuccess = function (e) {
        // console.log(e);
        // console.log(this.myFiles)
    };
    DemoFilePickerComponent.prototype.onUploadFail = function (e) {
        console.log(e);
    };
    DemoFilePickerComponent.prototype.onRemoveSuccess = function (e) {
        console.log(e);
    };
    DemoFilePickerComponent.prototype.onFileAdded = function (file) {
        this.myFiles.push(file);
    };
    DemoFilePickerComponent.prototype.removeFile = function () {
        this.uploader.removeFileFromList(this.myFiles[0]);
    };
    DemoFilePickerComponent.prototype.myCustomValidator = function (file) {
        console.log(file.name.length);
        if (!file.name.includes('uploader')) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(true).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["delay"])(2000));
        }
        if (file.size > 50) {
            return this.http.get('https://vugar.free.beeceptor.com').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (res) { return res === 'OK'; }));
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(false).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["delay"])(2000));
    };
    DemoFilePickerComponent.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"])('uploader', { static: true }),
        __metadata("design:type", _projects_file_picker_src_lib_file_picker_component__WEBPACK_IMPORTED_MODULE_0__["FilePickerComponent"])
    ], DemoFilePickerComponent.prototype, "uploader", void 0);
    DemoFilePickerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'demo-file-picker',
            template: __webpack_require__(/*! raw-loader!./demo-file-picker.component.html */ "./node_modules/raw-loader/index.js!./src/app/demo-file-picker/demo-file-picker.component.html"),
            styles: [__webpack_require__(/*! ./demo-file-picker.component.scss */ "./src/app/demo-file-picker/demo-file-picker.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], DemoFilePickerComponent);
    return DemoFilePickerComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/redlobster/projects/ngx-awesome-uploader/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es5.js.map