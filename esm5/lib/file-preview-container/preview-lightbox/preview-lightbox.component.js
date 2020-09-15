/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
export { PreviewLightboxComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy1saWdodGJveC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYXdlc29tZS11cGxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9maWxlLXByZXZpZXctY29udGFpbmVyL3ByZXZpZXctbGlnaHRib3gvcHJldmlldy1saWdodGJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0UsT0FBTyxFQUFFLFlBQVksRUFBbUIsTUFBTSwyQkFBMkIsQ0FBQztBQUUxRTtJQVVFLGtDQUFvQixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBSGpDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBR0ksQ0FBQzs7OztJQUVoRCwyQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFDRCw2Q0FBVTs7OztJQUFWLFVBQVcsSUFBaUI7O1lBQ3BCLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Ozs7O0lBQ0QsMENBQU87Ozs7SUFBUCxVQUFRLEtBQUs7UUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25CLENBQUM7O2dCQXJCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsOFlBQWdEOztpQkFFakQ7Ozs7Z0JBTlEsWUFBWTs7O3VCQVFsQixLQUFLO3dCQUNMLE1BQU07O0lBZ0JULCtCQUFDO0NBQUEsQUF2QkQsSUF1QkM7U0FsQlksd0JBQXdCOzs7SUFDbkMsd0NBQWdDOztJQUNoQyx5Q0FBMkM7O0lBQzNDLDBDQUFnQjs7SUFDaEIsMkNBQXlCOzs7OztJQUNiLDZDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpbGVQcmV2aWV3TW9kZWwgfSBmcm9tICcuLi8uLi9maWxlLXByZXZpZXcubW9kZWwnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHJldmlldy1saWdodGJveCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcmV2aWV3LWxpZ2h0Ym94LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHJldmlldy1saWdodGJveC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFByZXZpZXdMaWdodGJveENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGZpbGU6IEZpbGVQcmV2aWV3TW9kZWw7XG4gIEBPdXRwdXQoKSBjbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgbG9hZGVkOiBib29sZWFuO1xuICBzYWZlVXJsOiBTYWZlUmVzb3VyY2VVcmw7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZ2V0U2FmZVVybCh0aGlzLmZpbGUuZmlsZSk7XG4gIH1cbiAgZ2V0U2FmZVVybChmaWxlOiBGaWxlIHwgQmxvYik6IHZvaWQge1xuICAgIGNvbnN0IHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xuICAgIHRoaXMuc2FmZVVybCA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh1cmwpO1xuICB9XG4gIG9uQ2xvc2UoZXZlbnQpOiB2b2lkIHtcbiAgIHRoaXMuY2xvc2UubmV4dCgpO1xuICB9XG5cbn1cbiJdfQ==