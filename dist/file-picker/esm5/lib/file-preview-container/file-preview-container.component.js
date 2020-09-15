/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FilePickerAdapter } from '../file-picker.adapter';
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
export { FilePreviewContainerComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1wcmV2aWV3LWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYXdlc29tZS11cGxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9maWxlLXByZXZpZXctY29udGFpbmVyL2ZpbGUtcHJldmlldy1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUkzRDtJQWNFO1FBTmlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUNsRCxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFvQixDQUFDO1FBQ3JELGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztJQUlwRCxDQUFDOzs7O0lBRWpCLGdEQUFROzs7SUFBUjtJQUNBLENBQUM7Ozs7O0lBQ0Qsb0RBQVk7Ozs7SUFBWixVQUFhLElBQXNCO1FBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7Ozs7SUFDRCxxREFBYTs7O0lBQWI7UUFDRSxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztJQUNoQyxDQUFDOztnQkF2QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLGllQUFzRDs7aUJBRXZEOzs7OzsrQkFFRSxLQUFLOytCQUNMLEtBQUs7NkJBQ0wsTUFBTTtnQ0FDTixNQUFNOzZCQUNOLE1BQU07MEJBRU4sS0FBSzsyQkFDTCxLQUFLOztJQVlSLG9DQUFDO0NBQUEsQUF6QkQsSUF5QkM7U0FwQlksNkJBQTZCOzs7SUFDeEMscURBQTBDOztJQUMxQyxxREFBd0M7O0lBQ3hDLG1EQUFtRTs7SUFDbkUsc0RBQXNFOztJQUN0RSxtREFBb0U7O0lBQ3BFLHFEQUErQjs7SUFDL0IsZ0RBQW9DOztJQUNwQyxpREFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlsZVByZXZpZXdNb2RlbCB9IGZyb20gJy4uL2ZpbGUtcHJldmlldy5tb2RlbCc7XG5pbXBvcnQgeyBGaWxlUGlja2VyQWRhcHRlciB9IGZyb20gJy4uL2ZpbGUtcGlja2VyLmFkYXB0ZXInO1xuaW1wb3J0IHsgVXBsb2FkZXJDYXB0aW9ucyB9IGZyb20gJy4uL3VwbG9hZGVyLWNhcHRpb25zJztcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmaWxlLXByZXZpZXctY29udGFpbmVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbGUtcHJldmlldy1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9maWxlLXByZXZpZXctY29udGFpbmVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRmlsZVByZXZpZXdDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBwcmV2aWV3RmlsZXM6IEZpbGVQcmV2aWV3TW9kZWxbXTtcbiAgQElucHV0KCkgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAT3V0cHV0KCkgcHVibGljIHJlbW92ZUZpbGUgPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVQcmV2aWV3TW9kZWw+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgdXBsb2FkU3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVByZXZpZXdNb2RlbD4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyB1cGxvYWRGYWlsID0gbmV3IEV2ZW50RW1pdHRlcjxIdHRwRXJyb3JSZXNwb25zZT4oKTtcbiAgbGlnaHRib3hGaWxlOiBGaWxlUHJldmlld01vZGVsO1xuICBASW5wdXQoKSBhZGFwdGVyOiBGaWxlUGlja2VyQWRhcHRlcjtcbiAgQElucHV0KCkgY2FwdGlvbnM6IFVwbG9hZGVyQ2FwdGlvbnM7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cbiAgb3BlbkxpZ2h0Ym94KGZpbGU6IEZpbGVQcmV2aWV3TW9kZWwpIHtcbiAgIHRoaXMubGlnaHRib3hGaWxlID0gZmlsZTtcbiAgfVxuICBjbG9zZUxpZ2h0Ym94KCkge1xuICAgIHRoaXMubGlnaHRib3hGaWxlID0gdW5kZWZpbmVkO1xuICB9XG5cbn1cbiJdfQ==