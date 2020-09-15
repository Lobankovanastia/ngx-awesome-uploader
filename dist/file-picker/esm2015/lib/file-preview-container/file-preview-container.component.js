/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FilePickerAdapter } from '../file-picker.adapter';
export class FilePreviewContainerComponent {
    constructor() {
        this.removeFile = new EventEmitter();
        this.uploadSuccess = new EventEmitter();
        this.uploadFail = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} file
     * @return {?}
     */
    openLightbox(file) {
        this.lightboxFile = file;
    }
    /**
     * @return {?}
     */
    closeLightbox() {
        this.lightboxFile = undefined;
    }
}
FilePreviewContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'file-preview-container',
                template: "<preview-lightbox *ngIf=\"lightboxFile\" [file]=\"lightboxFile\" (close)=\"closeLightbox()\"></preview-lightbox>\n<file-preview-item\n*ngFor=\"let file of previewFiles\"\n[fileItem]=\"file\"\n(removeFile)=\"removeFile.next($event)\"\n(uploadSuccess)=\"uploadSuccess.next($event)\"\n(uploadFail)=\"uploadFail.next($event)\"\n(imageClicked)=\"openLightbox($event)\"\n[itemTemplate]=\"itemTemplate\"\n[adapter]=\"adapter\"\n[captions]=\"captions\"\n></file-preview-item>\n",
                styles: [":host{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:start;justify-content:flex-start;width:100%;background:#fafbfd}"]
            }] }
];
/** @nocollapse */
FilePreviewContainerComponent.ctorParameters = () => [];
FilePreviewContainerComponent.propDecorators = {
    previewFiles: [{ type: Input }],
    itemTemplate: [{ type: Input }],
    removeFile: [{ type: Output }],
    uploadSuccess: [{ type: Output }],
    uploadFail: [{ type: Output }],
    adapter: [{ type: Input }],
    captions: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1wcmV2aWV3LWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYXdlc29tZS11cGxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9maWxlLXByZXZpZXctY29udGFpbmVyL2ZpbGUtcHJldmlldy1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVMzRCxNQUFNLE9BQU8sNkJBQTZCO0lBU3hDO1FBTmlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUNsRCxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFvQixDQUFDO1FBQ3JELGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztJQUlwRCxDQUFDOzs7O0lBRWpCLFFBQVE7SUFDUixDQUFDOzs7OztJQUNELFlBQVksQ0FBQyxJQUFzQjtRQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDOzs7O0lBQ0QsYUFBYTtRQUNYLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO0lBQ2hDLENBQUM7OztZQXZCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsaWVBQXNEOzthQUV2RDs7Ozs7MkJBRUUsS0FBSzsyQkFDTCxLQUFLO3lCQUNMLE1BQU07NEJBQ04sTUFBTTt5QkFDTixNQUFNO3NCQUVOLEtBQUs7dUJBQ0wsS0FBSzs7OztJQVBOLHFEQUEwQzs7SUFDMUMscURBQXdDOztJQUN4QyxtREFBbUU7O0lBQ25FLHNEQUFzRTs7SUFDdEUsbURBQW9FOztJQUNwRSxxREFBK0I7O0lBQy9CLGdEQUFvQzs7SUFDcEMsaURBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpbGVQcmV2aWV3TW9kZWwgfSBmcm9tICcuLi9maWxlLXByZXZpZXcubW9kZWwnO1xuaW1wb3J0IHsgRmlsZVBpY2tlckFkYXB0ZXIgfSBmcm9tICcuLi9maWxlLXBpY2tlci5hZGFwdGVyJztcbmltcG9ydCB7IFVwbG9hZGVyQ2FwdGlvbnMgfSBmcm9tICcuLi91cGxvYWRlci1jYXB0aW9ucyc7XG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmlsZS1wcmV2aWV3LWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWxlLXByZXZpZXctY29udGFpbmVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmlsZS1wcmV2aWV3LWNvbnRhaW5lci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZpbGVQcmV2aWV3Q29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgcHJldmlld0ZpbGVzOiBGaWxlUHJldmlld01vZGVsW107XG4gIEBJbnB1dCgpIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQE91dHB1dCgpIHB1YmxpYyByZW1vdmVGaWxlID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlUHJldmlld01vZGVsPigpO1xuICBAT3V0cHV0KCkgcHVibGljIHVwbG9hZFN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVQcmV2aWV3TW9kZWw+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgdXBsb2FkRmFpbCA9IG5ldyBFdmVudEVtaXR0ZXI8SHR0cEVycm9yUmVzcG9uc2U+KCk7XG4gIGxpZ2h0Ym94RmlsZTogRmlsZVByZXZpZXdNb2RlbDtcbiAgQElucHV0KCkgYWRhcHRlcjogRmlsZVBpY2tlckFkYXB0ZXI7XG4gIEBJbnB1dCgpIGNhcHRpb25zOiBVcGxvYWRlckNhcHRpb25zO1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG4gIG9wZW5MaWdodGJveChmaWxlOiBGaWxlUHJldmlld01vZGVsKSB7XG4gICB0aGlzLmxpZ2h0Ym94RmlsZSA9IGZpbGU7XG4gIH1cbiAgY2xvc2VMaWdodGJveCgpIHtcbiAgICB0aGlzLmxpZ2h0Ym94RmlsZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG59XG4iXX0=