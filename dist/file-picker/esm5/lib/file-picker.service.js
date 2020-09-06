/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
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
export { FilePickerService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FilePickerService.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1waWNrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hd2Vzb21lLXVwbG9hZGVyLyIsInNvdXJjZXMiOlsibGliL2ZpbGUtcGlja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLEVBQUUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsWUFBWSxFQUFtQixNQUFNLDJCQUEyQixDQUFDO0FBRTFFO0lBRUUsMkJBQW9CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7SUFBSSxDQUFDOzs7OztJQUNoRCwwQ0FBYzs7OztJQUFkLFVBQWUsUUFBUTs7WUFDZixLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFO1lBQzNDLE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUsaUJBQWlCO2FBQ3hCO1NBQ0YsQ0FBQztRQUNGLE9BQU8sRUFBRSxDQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7OztJQUNELHlDQUFhOzs7O0lBQWIsVUFBYyxJQUFJO1FBQ2hCLElBQUksQ0FBQyxtQkFBTSxNQUFNLEVBQUEsQ0FBQyxDQUFDLGtCQUFrQixFQUFFO1lBQUMsT0FBTztTQUFDO1FBQ2hELElBQUk7O2dCQUNJLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7O2dCQUN4QyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxHQUFHLENBQUM7WUFDbEUsT0FBTyxPQUFPLENBQUM7U0FFZDtRQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNqQjtJQUNILENBQUM7O2dCQXJCRixVQUFVOzs7O2dCQUZGLFlBQVk7O0lBd0JyQix3QkFBQztDQUFBLEFBdEJELElBc0JDO1NBckJZLGlCQUFpQjs7Ozs7O0lBQ2hCLHNDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG9mLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmlsZVBpY2tlclNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7IH1cbiAgbW9ja1VwbG9hZEZpbGUoZm9ybURhdGEpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdjdXN0b21ldmVudCcsIHtcbiAgICAgIGRldGFpbDoge1xuICAgICAgICB0eXBlOiAnVXBsb2FkUHJvZ3JlZXNzJ1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvZiAoZXZlbnQuZGV0YWlsKTtcbiAgfVxuICBjcmVhdGVTYWZlVXJsKGZpbGUpOiBTYWZlUmVzb3VyY2VVcmwge1xuICAgIGlmICgoPGFueT4gd2luZG93KS5VUExPQURFUl9URVNUX01PREUpIHtyZXR1cm47fVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcbiAgICBjb25zdCBzYWZlVXJsID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHVybCk7XG4gICAgcmV0dXJuIHNhZmVVcmw7XG5cbiAgICB9IGNhdGNoIChlcikge1xuICAgICAgY29uc29sZS5sb2coZXIpO1xuICAgIH1cbiAgfVxufVxuIl19