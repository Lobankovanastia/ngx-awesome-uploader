/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
export class FilePickerService {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @param {?} formData
     * @return {?}
     */
    mockUploadFile(formData) {
        /** @type {?} */
        const event = new CustomEvent('customevent', {
            detail: {
                type: 'UploadProgreess'
            }
        });
        return of(event.detail);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    createSafeUrl(file) {
        if (((/** @type {?} */ (window))).UPLOADER_TEST_MODE) {
            return;
        }
        try {
            /** @type {?} */
            const url = window.URL.createObjectURL(file);
            /** @type {?} */
            const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            return safeUrl;
        }
        catch (er) {
            console.log(er);
        }
    }
}
FilePickerService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FilePickerService.ctorParameters = () => [
    { type: DomSanitizer }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    FilePickerService.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1waWNrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hd2Vzb21lLXVwbG9hZGVyLyIsInNvdXJjZXMiOlsibGliL2ZpbGUtcGlja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLEVBQUUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsWUFBWSxFQUFtQixNQUFNLDJCQUEyQixDQUFDO0FBRzFFLE1BQU0sT0FBTyxpQkFBaUI7Ozs7SUFDNUIsWUFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFJLENBQUM7Ozs7O0lBQ2hELGNBQWMsQ0FBQyxRQUFROztjQUNmLEtBQUssR0FBRyxJQUFJLFdBQVcsQ0FBQyxhQUFhLEVBQUU7WUFDM0MsTUFBTSxFQUFFO2dCQUNOLElBQUksRUFBRSxpQkFBaUI7YUFDeEI7U0FDRixDQUFDO1FBQ0YsT0FBTyxFQUFFLENBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBQ0QsYUFBYSxDQUFDLElBQUk7UUFDaEIsSUFBSSxDQUFDLG1CQUFNLE1BQU0sRUFBQSxDQUFDLENBQUMsa0JBQWtCLEVBQUU7WUFBQyxPQUFPO1NBQUM7UUFDaEQsSUFBSTs7a0JBQ0ksR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQzs7a0JBQ3hDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLEdBQUcsQ0FBQztZQUNsRSxPQUFPLE9BQU8sQ0FBQztTQUVkO1FBQUMsT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pCO0lBQ0gsQ0FBQzs7O1lBckJGLFVBQVU7Ozs7WUFGRixZQUFZOzs7Ozs7O0lBSVAsc0NBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgb2YsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGaWxlUGlja2VyU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHsgfVxuICBtb2NrVXBsb2FkRmlsZShmb3JtRGF0YSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2N1c3RvbWV2ZW50Jywge1xuICAgICAgZGV0YWlsOiB7XG4gICAgICAgIHR5cGU6ICdVcGxvYWRQcm9ncmVlc3MnXG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG9mIChldmVudC5kZXRhaWwpO1xuICB9XG4gIGNyZWF0ZVNhZmVVcmwoZmlsZSk6IFNhZmVSZXNvdXJjZVVybCB7XG4gICAgaWYgKCg8YW55PiB3aW5kb3cpLlVQTE9BREVSX1RFU1RfTU9ERSkge3JldHVybjt9XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xuICAgIGNvbnN0IHNhZmVVcmwgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodXJsKTtcbiAgICByZXR1cm4gc2FmZVVybDtcblxuICAgIH0gY2F0Y2ggKGVyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcik7XG4gICAgfVxuICB9XG59XG4iXX0=