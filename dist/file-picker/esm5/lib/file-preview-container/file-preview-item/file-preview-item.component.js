/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FilePickerService } from './../../file-picker.service';
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { getFileType } from '../../file-upload.utils';
import { FilePickerAdapter } from '../../file-picker.adapter';
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
        this.uploadSuccess.next(tslib_1.__assign({}, fileItem, { fileId: id }));
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
export { FilePreviewItemComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1wcmV2aWV3LWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF3ZXNvbWUtdXBsb2FkZXIvIiwic291cmNlcyI6WyJsaWIvZmlsZS1wcmV2aWV3LWNvbnRhaW5lci9maWxlLXByZXZpZXctaXRlbS9maWxlLXByZXZpZXctaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RixPQUFPLEVBQWEsYUFBYSxFQUFxQixNQUFNLHNCQUFzQixDQUFDO0FBQ25GLE9BQU8sRUFBRSxXQUFXLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUc5RDtJQXFCRSxrQ0FDVSxXQUE4QjtRQUE5QixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFoQnZCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUNsRCxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFvQixDQUFDO1FBQ3JELGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUNuRCxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFvQixDQUFDO1FBS3JFLFNBQUksR0FBRyxXQUFXLENBQUM7SUFTaEIsQ0FBQzs7OztJQUVKLDJDQUFROzs7SUFBUjtRQUNBLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVB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QUFLOztJQW9HUiwrQkFBQztDQUFBLEFBakhELElBaUhDO1NBNUdZLHdCQUF3Qjs7O0lBQ25DLDhDQUFtRTs7SUFDbkUsaURBQXNFOztJQUN0RSw4Q0FBb0U7O0lBQ3BFLGdEQUFxRTs7SUFDckUsNENBQTJDOztJQUMzQywyQ0FBb0M7O0lBQ3BDLGdEQUF3Qzs7SUFDeEMsNENBQW9DOztJQUNwQyx3Q0FBbUI7O0lBQ25CLGtEQUF1Qjs7SUFDdkIsNENBQWlCOztJQUNqQiwyQ0FBeUI7O0lBQ3pCLCtDQUFxQjs7SUFDckIsc0RBQWlDOztJQUNqQywwQ0FBZTs7Ozs7SUFFYiwrQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWxlUGlja2VyU2VydmljZSB9IGZyb20gJy4vLi4vLi4vZmlsZS1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBGaWxlUHJldmlld01vZGVsIH0gZnJvbSAnLi8uLi8uLi9maWxlLXByZXZpZXcubW9kZWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNhZmVSZXNvdXJjZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwRXZlbnRUeXBlLCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IGdldEZpbGVUeXBlfSBmcm9tICcuLi8uLi9maWxlLXVwbG9hZC51dGlscyc7XG5pbXBvcnQgeyAgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGaWxlUGlja2VyQWRhcHRlciB9IGZyb20gJy4uLy4uL2ZpbGUtcGlja2VyLmFkYXB0ZXInO1xuaW1wb3J0IHsgVXBsb2FkZXJDYXB0aW9ucyB9IGZyb20gJy4uLy4uL3VwbG9hZGVyLWNhcHRpb25zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmlsZS1wcmV2aWV3LWl0ZW0nLFxuICB0ZW1wbGF0ZVVybDogJy4vZmlsZS1wcmV2aWV3LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9maWxlLXByZXZpZXctaXRlbS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZpbGVQcmV2aWV3SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBPdXRwdXQoKSBwdWJsaWMgcmVtb3ZlRmlsZSA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVByZXZpZXdNb2RlbD4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyB1cGxvYWRTdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlUHJldmlld01vZGVsPigpO1xuICBAT3V0cHV0KCkgcHVibGljIHVwbG9hZEZhaWwgPSBuZXcgRXZlbnRFbWl0dGVyPEh0dHBFcnJvclJlc3BvbnNlPigpO1xuICBAT3V0cHV0KCkgcHVibGljIGltYWdlQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVByZXZpZXdNb2RlbD4oKTtcbiAgQElucHV0KCkgcHVibGljIGZpbGVJdGVtOiBGaWxlUHJldmlld01vZGVsO1xuICBASW5wdXQoKSBhZGFwdGVyOiBGaWxlUGlja2VyQWRhcHRlcjtcbiAgQElucHV0KCkgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBASW5wdXQoKSBjYXB0aW9uczogVXBsb2FkZXJDYXB0aW9ucztcbiAgaWNvbiA9ICdjaGVja21hcmsnO1xuICB1cGxvYWRQcm9ncmVzczogbnVtYmVyO1xuICBmaWxlVHlwZTogc3RyaW5nO1xuICBzYWZlVXJsOiBTYWZlUmVzb3VyY2VVcmw7XG4gIHVwbG9hZEVycm9yOiBib29sZWFuO1xuICB1cGxvYWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgZmlsZUlkOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVQaWNrZXJTZXJ2aWNlLFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gIHRoaXMudXBsb2FkRmlsZSh0aGlzLmZpbGVJdGVtKTtcbiAgICB0aGlzLmZpbGVUeXBlID0gZ2V0RmlsZVR5cGUodGhpcy5maWxlSXRlbS5maWxlLnR5cGUpO1xuICAgIHRoaXMuc2FmZVVybCA9IHRoaXMuZ2V0U2FmZVVybCh0aGlzLmZpbGVJdGVtLmZpbGUpO1xuICB9XG4gIGdldFNhZmVVcmwoZmlsZTogRmlsZSB8IEJsb2IpOiBTYWZlUmVzb3VyY2VVcmwge1xuICAgIHJldHVybiB0aGlzLmZpbGVTZXJ2aWNlLmNyZWF0ZVNhZmVVcmwoZmlsZSk7XG4gIH1cbiAgLyoqIENvbnZlcnRzIGJ5dGVzIHRvIG5pY2Ugc2l6ZSAqL1xuICBuaWNlQnl0ZXMoeCk6IHN0cmluZyB7XG4gICAgY29uc3QgdW5pdHMgPSBbJ2J5dGVzJywgJ0tCJywgJ01CJywgJ0dCJywgJ1RCJywgJ1BCJywgJ0VCJywgJ1pCJywgJ1lCJ107XG4gICAgbGV0IGwgPSAwLFxuICAgICAgbiA9IHBhcnNlSW50KHgsIDEwKSB8fCAwO1xuICAgIHdoaWxlIChuID49IDEwMjQgJiYgKytsKSB7XG4gICAgICBuID0gbiAvIDEwMjQ7XG4gICAgfVxuICAgIC8vIGluY2x1ZGUgYSBkZWNpbWFsIHBvaW50IGFuZCBhIHRlbnRocy1wbGFjZSBkaWdpdCBpZiBwcmVzZW50aW5nXG4gICAgLy8gbGVzcyB0aGFuIHRlbiBvZiBLQiBvciBncmVhdGVyIHVuaXRzXG4gICAgcmV0dXJuIG4udG9GaXhlZChuIDwgMTAgJiYgbCA+IDAgPyAxIDogMCkgKyAnICcgKyB1bml0c1tsXTtcbiAgfVxuICAvKiogUmV0cnkgZmlsZSB1cGxvYWQgd2hlbiB1cGxvYWQgd2FzIHVuc3VjY2Vzc2Z1bGwgKi9cbiAgb25SZXRyeSgpOiB2b2lkIHtcbiAgICB0aGlzLnVwbG9hZEZpbGUodGhpcy5maWxlSXRlbSk7XG4gIH1cbiAgb25DaGVja01hcmtDbGljaygpIHtcbiAgICB0aGlzLmljb24gPSAnZXJyb3InO1xuICB9XG4gIHVwbG9hZEZpbGUoZmlsZUl0ZW06IEZpbGVQcmV2aWV3TW9kZWwpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hZGFwdGVyKSB7XG4gICAgICB0aGlzLnVwbG9hZFN1YnNjcmlwdGlvbiA9XG4gICAgICB0aGlzLmFkYXB0ZXIudXBsb2FkRmlsZShmaWxlSXRlbSlcbiAgICAgIC5zdWJzY3JpYmUoKHJlczogbnVtYmVyIHwgc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRoaXMub25VcGxvYWRTdWNjZXNzKHJlcywgZmlsZUl0ZW0pO1xuICAgICAgICAgIHRoaXMudXBsb2FkUHJvZ3Jlc3MgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiByZXMgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgdGhpcy51cGxvYWRQcm9ncmVzcyA9IHJlcztcbiAgICAgICAgLy8gIHRoaXMuaGFuZGxlUHJvZ3Jlc3NSZXNwb25zZSg8SHR0cEV2ZW50PGFueT4+cmVzLCBmaWxlSXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH0sIChlcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgdGhpcy51cGxvYWRFcnJvciA9IHRydWU7XG4gICAgICAgIHRoaXMudXBsb2FkRmFpbC5uZXh0KGVyKTtcbiAgICAgICAgdGhpcy51cGxvYWRQcm9ncmVzcyA9IHVuZGVmaW5lZDtcbiAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2Fybignbm8gYWRhcHRlciB3YXMgcHJvdmlkZWQnKTtcbiAgICB9XG4gIH1cbiAgLyoqIEVtaXRzIGV2ZW50IHdoZW4gZmlsZSB1cGxvYWQgYXBpIHJldHVybnMgc3VjY2VzcyAgKi9cbiAgb25VcGxvYWRTdWNjZXNzKGlkOiBzdHJpbmcsIGZpbGVJdGVtOiBGaWxlUHJldmlld01vZGVsKTogdm9pZCB7XG4gICAgdGhpcy5maWxlSWQgPSBpZDtcbiAgICB0aGlzLmZpbGVJdGVtLmZpbGVJZCA9IGlkO1xuICAgIHRoaXMudXBsb2FkU3VjY2Vzcy5uZXh0KHsuLi5maWxlSXRlbSwgZmlsZUlkOiBpZH0pO1xuICB9XG4gIGhhbmRsZVByb2dyZXNzUmVzcG9uc2UoZXZlbnQ6IEh0dHBFdmVudDxhbnk+ICwgZmlsZU5hbWUpIHtcbiAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgIGNhc2UgSHR0cEV2ZW50VHlwZS5TZW50OlxuICAgICAgICByZXR1cm4gO1xuXG4gICAgICBjYXNlIEh0dHBFdmVudFR5cGUuVXBsb2FkUHJvZ3Jlc3M6XG4gICAgICAgIC8vIENvbXB1dGUgYW5kIHNob3cgdGhlICUgZG9uZTpcbiAgICAgICAgdGhpcy51cGxvYWRQcm9ncmVzcyA9IE1hdGgucm91bmQoKDEwMCAqIGV2ZW50LmxvYWRlZCkgLyBldmVudC50b3RhbCk7XG4gICAgICAgcmV0dXJuO1xuXG4gICAgICBjYXNlIEh0dHBFdmVudFR5cGUuUmVzcG9uc2U6XG4gICAgICAgIGNvbnN0IGJvZHk6IGFueSA9IGV2ZW50LmJvZHk7XG4gICAgICAgIGlmIChib2R5ICYmIGJvZHkuZGF0YSkge1xuICAgICAgICAgLy8gdGhpcy51cGxvYWRlZC5uZXh0KHJlcy5kYXRhLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBsb2FkUHJvZ3Jlc3MgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMudXBsb2FkUHJvZ3Jlc3MgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBgRmlsZSBcIiR7ZmlsZU5hbWV9XCIgc3VycHJpc2luZyB1cGxvYWQgZXZlbnQ6ICR7ZXZlbnQudHlwZX0uYDtcbiAgICB9XG4gIH1cbiBvblJlbW92ZShmaWxlSXRlbTogRmlsZVByZXZpZXdNb2RlbCk6IHZvaWQge1xuICB0aGlzLnVwbG9hZFVuc3Vic2NyaWJlKCk7XG4gIHRoaXMucmVtb3ZlRmlsZS5uZXh0KGZpbGVJdGVtKTtcbiB9XG4gLyoqIENhbmNlbCB1cGxvYWQuIENhbmNlbHMgcmVxdWVzdCAgKi9cbiB1cGxvYWRVbnN1YnNjcmliZSgpOiB2b2lkIHtcbiAgaWYgKHRoaXMudXBsb2FkU3Vic2NyaXB0aW9uKSB7XG4gICAgdGhpcy51cGxvYWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgIH1cbiB9XG5cbn1cbiJdfQ==