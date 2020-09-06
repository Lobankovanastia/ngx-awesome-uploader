/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FilePickerService } from './../../file-picker.service';
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { getFileType } from '../../file-upload.utils';
import { FilePickerAdapter } from '../../file-picker.adapter';
export class FilePreviewItemComponent {
    /**
     * @param {?} fileService
     */
    constructor(fileService) {
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
    ngOnInit() {
        this.uploadFile(this.fileItem);
        this.fileType = getFileType(this.fileItem.file.type);
        this.safeUrl = this.getSafeUrl(this.fileItem.file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    getSafeUrl(file) {
        return this.fileService.createSafeUrl(file);
    }
    /**
     * Converts bytes to nice size
     * @param {?} x
     * @return {?}
     */
    niceBytes(x) {
        /** @type {?} */
        const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        /** @type {?} */
        let l = 0;
        /** @type {?} */
        let n = parseInt(x, 10) || 0;
        while (n >= 1024 && ++l) {
            n = n / 1024;
        }
        // include a decimal point and a tenths-place digit if presenting
        // less than ten of KB or greater units
        return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
    }
    /**
     * Retry file upload when upload was unsuccessfull
     * @return {?}
     */
    onRetry() {
        this.uploadFile(this.fileItem);
    }
    /**
     * @return {?}
     */
    onCheckMarkClick() {
        this.icon = 'error';
    }
    /**
     * @param {?} fileItem
     * @return {?}
     */
    uploadFile(fileItem) {
        if (this.adapter) {
            this.uploadSubscription =
                this.adapter.uploadFile(fileItem)
                    .subscribe((/**
                 * @param {?} res
                 * @return {?}
                 */
                (res) => {
                    if (typeof res === 'string') {
                        this.onUploadSuccess(res, fileItem);
                        this.uploadProgress = undefined;
                    }
                    if (typeof res === 'number') {
                        this.uploadProgress = res;
                        //  this.handleProgressResponse(<HttpEvent<any>>res, fileItem);
                    }
                }), (/**
                 * @param {?} er
                 * @return {?}
                 */
                (er) => {
                    this.uploadError = true;
                    this.uploadFail.next(er);
                    this.uploadProgress = undefined;
                }));
        }
        else {
            console.warn('no adapter was provided');
        }
    }
    /**
     * Emits event when file upload api returns success
     * @param {?} id
     * @param {?} fileItem
     * @return {?}
     */
    onUploadSuccess(id, fileItem) {
        this.fileId = id;
        this.fileItem.fileId = id;
        this.uploadSuccess.next(Object.assign({}, fileItem, { fileId: id }));
    }
    /**
     * @param {?} event
     * @param {?} fileName
     * @return {?}
     */
    handleProgressResponse(event, fileName) {
        switch (event.type) {
            case HttpEventType.Sent:
                return;
            case HttpEventType.UploadProgress:
                // Compute and show the % done:
                this.uploadProgress = Math.round((100 * event.loaded) / event.total);
                return;
            case HttpEventType.Response:
                /** @type {?} */
                const body = event.body;
                if (body && body.data) {
                    // this.uploaded.next(res.data.toString());
                }
                this.uploadProgress = undefined;
                return;
            default:
                this.uploadProgress = undefined;
                return `File "${fileName}" surprising upload event: ${event.type}.`;
        }
    }
    /**
     * @param {?} fileItem
     * @return {?}
     */
    onRemove(fileItem) {
        this.uploadUnsubscribe();
        this.removeFile.next(fileItem);
    }
    /**
     * Cancel upload. Cancels request
     * @return {?}
     */
    uploadUnsubscribe() {
        if (this.uploadSubscription) {
            this.uploadSubscription.unsubscribe();
        }
    }
}
FilePreviewItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'file-preview-item',
                template: "    <div class=\"file-preview-wrapper\" *ngIf=\"fileItem\" [ngClass] = \"{'visually-hidden': itemTemplate}\">\n\n\n        <div class=\"file-preview-thumbnail\">\n          <div class=\"img-preview-thumbnail\" *ngIf=\"fileType === 'image'\" >\n            <img [src]=\"safeUrl\" (click)=\"imageClicked.next(fileItem)\">\n          </div>\n          <div class=\"other-preview-thumbnail\"\n            *ngIf=\"fileType !== 'image'\"\n            [ngClass]=\"fileItem.fileName.split('.').pop()\"\n            >\n            {{fileItem.fileName.split('.').pop()}}\n          </div>\n          <div class=\"thumbnail-backdrop\">\n\n          </div>\n        </div>\n        <div class=\"file-preview-description\" >\n          <a class=\"file-preview-title\" [title]=\"fileItem.fileName\" href=\"javascript:void(0)\"><p>{{fileItem.fileName}}</p></a>\n          <div class=\"file-preview-size\">{{niceBytes(fileItem.file.size)}}</div>\n        </div>\n        <div class=\"file-preview-actions\" >\n            <div class=\"ngx-checkmark-wrapper\" (click)=\"onCheckMarkClick()\" *ngIf=\"(icon === 'checkmark') && !uploadError && !uploadProgress\" (mouseenter)=\"icon = 'close'\">\n              <span class=\"ngx-checkmark\"></span>\n            </div>\n            <refresh-icon *ngIf=\"uploadError\" (retry)=\"onRetry()\"></refresh-icon>\n            <a class=\"ngx-close-icon-wrapper\"\n            *ngIf= \"(icon === 'close') ||  uploadError || uploadProgress\"\n            (click)=\"onRemove(fileItem)\"\n             (mouseleave)=\"icon = 'checkmark'\"\n             title=\"{{captions?.previewCard?.remove}}\"\n             >\n              <close-icon></close-icon>\n            </a>\n        </div>\n        <!-- *ngIf=\"uploadProgress !== 100\"-->\n          <a class=\"file-upload-error-wrapper\" *ngIf=\"uploadError && !uploadProgress\" href=\"javascipt:void(0)\"\n          title=\"{{captions?.previewCard?.uploadError}}\">\n          </a>\n\n        <ng-container *ngIf=\"uploadProgress\">\n        <div class=\"file-upload-progress-bar-wrapper\"  >\n          <div class=\"file-upload-progress-bar\"  [ngStyle]=\"{ 'width': uploadProgress + '%' }\">\n          </div>\n        </div>\n\n        <div class=\"file-upload-percentage-wrapper\" >\n          <div class=\"file-upload-percentage\">{{uploadProgress}} %</div>\n          </div>\n        </ng-container>\n\n      </div>\n\n<ng-container *ngTemplateOutlet=\"itemTemplate;context: {fileItem: fileItem, uploadProgress: uploadProgress}\" > </ng-container>\n",
                styles: [":host{display:block;padding:20px 16px;border-bottom:1px solid #ebeef1;max-width:440px;position:relative}.visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}.file-preview-wrapper{display:-webkit-box;display:flex;width:100%}.file-preview-wrapper .file-preview-thumbnail{position:relative;z-index:2;cursor:pointer}.file-preview-wrapper .file-preview-thumbnail .img-preview-thumbnail{width:36px;height:36px}.file-preview-wrapper .file-preview-thumbnail .img-preview-thumbnail img{width:100%;height:100%;-o-object-fit:cover;object-fit:cover;border-radius:6px}.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail{width:36px;height:36px;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;background:#706fd3;border-radius:4px;color:#fff;font-size:12px;font-weight:700;white-space:nowrap;overflow:hidden}.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.pdf{background:#e4394e}.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.doc,.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.docx{background:#2196f3}.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.xls,.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.xlsx{background:#4caf50}.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.ppt,.file-preview-wrapper .file-preview-thumbnail .other-preview-thumbnail.txt{background:#ff9800}.file-preview-wrapper .file-preview-thumbnail .thumbnail-backdrop{visibility:hidden;position:absolute;left:0;top:0;width:100%;height:100%;border-radius:6px;-webkit-transition:.1s ease-in-out;transition:.1s ease-in-out;pointer-events:none;background:rgba(43,56,71,.2)}.file-preview-wrapper .file-preview-thumbnail:hover .thumbnail-backdrop{visibility:visible}.file-preview-wrapper .file-preview-thumbnail:active .thumbnail-backdrop{visibility:visible;background:rgba(43,56,71,.4)}.file-preview-wrapper .file-preview-description{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:start;align-items:flex-start;padding-left:16px;padding-right:16px;color:#74809d;overflow:hidden;-webkit-box-flex:1;flex:1;z-index:2;position:relative}.file-preview-wrapper .file-preview-description .file-preview-title{font-weight:700;width:90%;text-decoration:none;color:#74809d;cursor:default}.file-preview-wrapper .file-preview-description .file-preview-title p{text-overflow:ellipsis;max-width:100%;overflow:hidden;white-space:nowrap;margin:0}.file-preview-wrapper .file-preview-description .file-preview-size{font-size:12px;color:#979fb8}.file-preview-wrapper .file-preview-actions{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;font-size:10px;z-index:3;position:relative}.file-preview-wrapper .file-preview-actions .ngx-checkmark-wrapper{position:relative;cursor:pointer;font-size:22px;height:20px;width:20px;border-radius:50%;background:#43d084;box-shadow:-1px 1px 6px rgba(67,208,132,.8)}.file-preview-wrapper .file-preview-actions .ngx-checkmark-wrapper .ngx-checkmark{position:absolute;top:0;left:0;height:19px;width:19px}.file-preview-wrapper .file-preview-actions .ngx-checkmark-wrapper .ngx-checkmark:after{content:\"\";position:absolute;display:block;left:7px;top:4px;width:3px;height:7px;border:1px solid #fff;border-width:0 3px 3px 0;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.file-preview-wrapper .file-preview-actions .ngx-close-icon-wrapper{border-radius:50%;background:#fe7676;padding:3px;box-shadow:-1px 1px 6px rgba(254,118,118,.8);cursor:pointer}.file-preview-wrapper .file-upload-percentage-wrapper,.file-preview-wrapper .file-upload-progress-bar-wrapper{position:absolute;z-index:1;width:100%;height:95%;left:0;top:0;bottom:0;margin:auto}.file-preview-wrapper .file-upload-progress-bar{background:#eef1fa;border-radius:6px;width:0%;height:95%;-webkit-transition:width .3s ease-in;transition:width .3s ease-in}.file-preview-wrapper .file-upload-percentage{padding-right:10%;color:#c2cdda;padding-top:5%;font-size:19px;text-align:right}.file-preview-wrapper .file-upload-error-wrapper{position:absolute;z-index:1;width:100%;height:95%;left:0;top:0;bottom:0;margin:auto;background:rgba(254,84,111,.06)}"]
            }] }
];
/** @nocollapse */
FilePreviewItemComponent.ctorParameters = () => [
    { type: FilePickerService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1wcmV2aWV3LWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF3ZXNvbWUtdXBsb2FkZXIvIiwic291cmNlcyI6WyJsaWIvZmlsZS1wcmV2aWV3LWNvbnRhaW5lci9maWxlLXByZXZpZXctaXRlbS9maWxlLXByZXZpZXctaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRWhFLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVGLE9BQU8sRUFBYSxhQUFhLEVBQXFCLE1BQU0sc0JBQXNCLENBQUM7QUFDbkYsT0FBTyxFQUFFLFdBQVcsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRXJELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBUTlELE1BQU0sT0FBTyx3QkFBd0I7Ozs7SUFnQm5DLFlBQ1UsV0FBOEI7UUFBOUIsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBaEJ2QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7UUFDbEQsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUNyRCxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFDbkQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUtyRSxTQUFJLEdBQUcsV0FBVyxDQUFDO0lBU2hCLENBQUM7Ozs7SUFFSixRQUFRO1FBQ1IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJ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cEMsd0NBQW1COztJQUNuQixrREFBdUI7O0lBQ3ZCLDRDQUFpQjs7SUFDakIsMkNBQXlCOztJQUN6QiwrQ0FBcUI7O0lBQ3JCLHNEQUFpQzs7SUFDakMsMENBQWU7Ozs7O0lBRWIsK0NBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmlsZVBpY2tlclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL2ZpbGUtcGlja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmlsZVByZXZpZXdNb2RlbCB9IGZyb20gJy4vLi4vLi4vZmlsZS1wcmV2aWV3Lm1vZGVsJztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTYWZlUmVzb3VyY2VVcmwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEh0dHBFdmVudCwgSHR0cEV2ZW50VHlwZSwgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBnZXRGaWxlVHlwZX0gZnJvbSAnLi4vLi4vZmlsZS11cGxvYWQudXRpbHMnO1xuaW1wb3J0IHsgIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmlsZVBpY2tlckFkYXB0ZXIgfSBmcm9tICcuLi8uLi9maWxlLXBpY2tlci5hZGFwdGVyJztcbmltcG9ydCB7IFVwbG9hZGVyQ2FwdGlvbnMgfSBmcm9tICcuLi8uLi91cGxvYWRlci1jYXB0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZpbGUtcHJldmlldy1pdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbGUtcHJldmlldy1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmlsZS1wcmV2aWV3LWl0ZW0uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGaWxlUHJldmlld0l0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAT3V0cHV0KCkgcHVibGljIHJlbW92ZUZpbGUgPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVQcmV2aWV3TW9kZWw+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgdXBsb2FkU3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVByZXZpZXdNb2RlbD4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyB1cGxvYWRGYWlsID0gbmV3IEV2ZW50RW1pdHRlcjxIdHRwRXJyb3JSZXNwb25zZT4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBpbWFnZUNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVQcmV2aWV3TW9kZWw+KCk7XG4gIEBJbnB1dCgpIHB1YmxpYyBmaWxlSXRlbTogRmlsZVByZXZpZXdNb2RlbDtcbiAgQElucHV0KCkgYWRhcHRlcjogRmlsZVBpY2tlckFkYXB0ZXI7XG4gIEBJbnB1dCgpIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgY2FwdGlvbnM6IFVwbG9hZGVyQ2FwdGlvbnM7XG4gIGljb24gPSAnY2hlY2ttYXJrJztcbiAgdXBsb2FkUHJvZ3Jlc3M6IG51bWJlcjtcbiAgZmlsZVR5cGU6IHN0cmluZztcbiAgc2FmZVVybDogU2FmZVJlc291cmNlVXJsO1xuICB1cGxvYWRFcnJvcjogYm9vbGVhbjtcbiAgdXBsb2FkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIGZpbGVJZDogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZpbGVTZXJ2aWNlOiBGaWxlUGlja2VyU2VydmljZSxcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICB0aGlzLnVwbG9hZEZpbGUodGhpcy5maWxlSXRlbSk7XG4gICAgdGhpcy5maWxlVHlwZSA9IGdldEZpbGVUeXBlKHRoaXMuZmlsZUl0ZW0uZmlsZS50eXBlKTtcbiAgICB0aGlzLnNhZmVVcmwgPSB0aGlzLmdldFNhZmVVcmwodGhpcy5maWxlSXRlbS5maWxlKTtcbiAgfVxuICBnZXRTYWZlVXJsKGZpbGU6IEZpbGUgfCBCbG9iKTogU2FmZVJlc291cmNlVXJsIHtcbiAgICByZXR1cm4gdGhpcy5maWxlU2VydmljZS5jcmVhdGVTYWZlVXJsKGZpbGUpO1xuICB9XG4gIC8qKiBDb252ZXJ0cyBieXRlcyB0byBuaWNlIHNpemUgKi9cbiAgbmljZUJ5dGVzKHgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHVuaXRzID0gWydieXRlcycsICdLQicsICdNQicsICdHQicsICdUQicsICdQQicsICdFQicsICdaQicsICdZQiddO1xuICAgIGxldCBsID0gMCxcbiAgICAgIG4gPSBwYXJzZUludCh4LCAxMCkgfHwgMDtcbiAgICB3aGlsZSAobiA+PSAxMDI0ICYmICsrbCkge1xuICAgICAgbiA9IG4gLyAxMDI0O1xuICAgIH1cbiAgICAvLyBpbmNsdWRlIGEgZGVjaW1hbCBwb2ludCBhbmQgYSB0ZW50aHMtcGxhY2UgZGlnaXQgaWYgcHJlc2VudGluZ1xuICAgIC8vIGxlc3MgdGhhbiB0ZW4gb2YgS0Igb3IgZ3JlYXRlciB1bml0c1xuICAgIHJldHVybiBuLnRvRml4ZWQobiA8IDEwICYmIGwgPiAwID8gMSA6IDApICsgJyAnICsgdW5pdHNbbF07XG4gIH1cbiAgLyoqIFJldHJ5IGZpbGUgdXBsb2FkIHdoZW4gdXBsb2FkIHdhcyB1bnN1Y2Nlc3NmdWxsICovXG4gIG9uUmV0cnkoKTogdm9pZCB7XG4gICAgdGhpcy51cGxvYWRGaWxlKHRoaXMuZmlsZUl0ZW0pO1xuICB9XG4gIG9uQ2hlY2tNYXJrQ2xpY2soKSB7XG4gICAgdGhpcy5pY29uID0gJ2Vycm9yJztcbiAgfVxuICB1cGxvYWRGaWxlKGZpbGVJdGVtOiBGaWxlUHJldmlld01vZGVsKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcikge1xuICAgICAgdGhpcy51cGxvYWRTdWJzY3JpcHRpb24gPVxuICAgICAgdGhpcy5hZGFwdGVyLnVwbG9hZEZpbGUoZmlsZUl0ZW0pXG4gICAgICAuc3Vic2NyaWJlKChyZXM6IG51bWJlciB8IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHJlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLm9uVXBsb2FkU3VjY2VzcyhyZXMsIGZpbGVJdGVtKTtcbiAgICAgICAgICB0aGlzLnVwbG9hZFByb2dyZXNzID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcmVzID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIHRoaXMudXBsb2FkUHJvZ3Jlc3MgPSByZXM7XG4gICAgICAgIC8vICB0aGlzLmhhbmRsZVByb2dyZXNzUmVzcG9uc2UoPEh0dHBFdmVudDxhbnk+PnJlcywgZmlsZUl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9LCAoZXI6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHRoaXMudXBsb2FkRXJyb3IgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwbG9hZEZhaWwubmV4dChlcik7XG4gICAgICAgIHRoaXMudXBsb2FkUHJvZ3Jlc3MgPSB1bmRlZmluZWQ7XG4gIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oJ25vIGFkYXB0ZXIgd2FzIHByb3ZpZGVkJyk7XG4gICAgfVxuICB9XG4gIC8qKiBFbWl0cyBldmVudCB3aGVuIGZpbGUgdXBsb2FkIGFwaSByZXR1cm5zIHN1Y2Nlc3MgICovXG4gIG9uVXBsb2FkU3VjY2VzcyhpZDogc3RyaW5nLCBmaWxlSXRlbTogRmlsZVByZXZpZXdNb2RlbCk6IHZvaWQge1xuICAgIHRoaXMuZmlsZUlkID0gaWQ7XG4gICAgdGhpcy5maWxlSXRlbS5maWxlSWQgPSBpZDtcbiAgICB0aGlzLnVwbG9hZFN1Y2Nlc3MubmV4dCh7Li4uZmlsZUl0ZW0sIGZpbGVJZDogaWR9KTtcbiAgfVxuICBoYW5kbGVQcm9ncmVzc1Jlc3BvbnNlKGV2ZW50OiBIdHRwRXZlbnQ8YW55PiAsIGZpbGVOYW1lKSB7XG4gICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICBjYXNlIEh0dHBFdmVudFR5cGUuU2VudDpcbiAgICAgICAgcmV0dXJuIDtcblxuICAgICAgY2FzZSBIdHRwRXZlbnRUeXBlLlVwbG9hZFByb2dyZXNzOlxuICAgICAgICAvLyBDb21wdXRlIGFuZCBzaG93IHRoZSAlIGRvbmU6XG4gICAgICAgIHRoaXMudXBsb2FkUHJvZ3Jlc3MgPSBNYXRoLnJvdW5kKCgxMDAgKiBldmVudC5sb2FkZWQpIC8gZXZlbnQudG90YWwpO1xuICAgICAgIHJldHVybjtcblxuICAgICAgY2FzZSBIdHRwRXZlbnRUeXBlLlJlc3BvbnNlOlxuICAgICAgICBjb25zdCBib2R5OiBhbnkgPSBldmVudC5ib2R5O1xuICAgICAgICBpZiAoYm9keSAmJiBib2R5LmRhdGEpIHtcbiAgICAgICAgIC8vIHRoaXMudXBsb2FkZWQubmV4dChyZXMuZGF0YS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwbG9hZFByb2dyZXNzID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm47XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnVwbG9hZFByb2dyZXNzID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gYEZpbGUgXCIke2ZpbGVOYW1lfVwiIHN1cnByaXNpbmcgdXBsb2FkIGV2ZW50OiAke2V2ZW50LnR5cGV9LmA7XG4gICAgfVxuICB9XG4gb25SZW1vdmUoZmlsZUl0ZW06IEZpbGVQcmV2aWV3TW9kZWwpOiB2b2lkIHtcbiAgdGhpcy51cGxvYWRVbnN1YnNjcmliZSgpO1xuICB0aGlzLnJlbW92ZUZpbGUubmV4dChmaWxlSXRlbSk7XG4gfVxuIC8qKiBDYW5jZWwgdXBsb2FkLiBDYW5jZWxzIHJlcXVlc3QgICovXG4gdXBsb2FkVW5zdWJzY3JpYmUoKTogdm9pZCB7XG4gIGlmICh0aGlzLnVwbG9hZFN1YnNjcmlwdGlvbikge1xuICAgIHRoaXMudXBsb2FkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICB9XG4gfVxuXG59XG4iXX0=