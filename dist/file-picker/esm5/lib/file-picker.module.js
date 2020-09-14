/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CloseIconComponent } from './icons/close-icon/close-icon.component';
import { FilePreviewItemComponent } from './file-preview-container/file-preview-item/file-preview-item.component';
import { FilePreviewContainerComponent } from './file-preview-container/file-preview-container.component';
import { NgModule } from '@angular/core';
import { FilePickerComponent } from './file-picker.component';
import { CommonModule } from '@angular/common';
import { FilePickerService } from './file-picker.service';
import { FileDropModule } from './file-drop/file-drop.module';
import { PreviewLightboxComponent } from './file-preview-container/preview-lightbox/preview-lightbox.component';
import { RefreshIconComponent } from './file-preview-container/file-preview-item/refresh-icon/refresh-icon.component';
import { ImageCropperModule } from 'ngx-image-cropper';
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
export { FilePickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1waWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF3ZXNvbWUtdXBsb2FkZXIvIiwic291cmNlcyI6WyJsaWIvZmlsZS1waWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3RUFBd0UsQ0FBQztBQUNsSCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUMxRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sc0VBQXNFLENBQUM7QUFDaEgsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0ZBQWdGLENBQUM7QUFDdEgsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFdkQ7SUFBQTtJQWlCK0IsQ0FBQzs7Z0JBakIvQixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osY0FBYzt3QkFDZCxrQkFBa0I7cUJBQ25CO29CQUNELFlBQVksRUFBRTt3QkFDWixtQkFBbUI7d0JBQ25CLDZCQUE2Qjt3QkFDN0Isd0JBQXdCO3dCQUN4Qix3QkFBd0I7d0JBQ3hCLG9CQUFvQjt3QkFDcEIsa0JBQWtCO3FCQUNuQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztvQkFDOUIsU0FBUyxFQUFFLENBQUMsaUJBQWlCLENBQUM7aUJBQy9COztJQUM4Qix1QkFBQztDQUFBLEFBakJoQyxJQWlCZ0M7U0FBbkIsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2xvc2VJY29uQ29tcG9uZW50IH0gZnJvbSAnLi9pY29ucy9jbG9zZS1pY29uL2Nsb3NlLWljb24uY29tcG9uZW50JztcbmltcG9ydCB7IEZpbGVQcmV2aWV3SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vZmlsZS1wcmV2aWV3LWNvbnRhaW5lci9maWxlLXByZXZpZXctaXRlbS9maWxlLXByZXZpZXctaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmlsZVByZXZpZXdDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2ZpbGUtcHJldmlldy1jb250YWluZXIvZmlsZS1wcmV2aWV3LWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpbGVQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2ZpbGUtcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRmlsZVBpY2tlclNlcnZpY2UgfSBmcm9tICcuL2ZpbGUtcGlja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmlsZURyb3BNb2R1bGUgfSBmcm9tICcuL2ZpbGUtZHJvcC9maWxlLWRyb3AubW9kdWxlJztcbmltcG9ydCB7IFByZXZpZXdMaWdodGJveENvbXBvbmVudCB9IGZyb20gJy4vZmlsZS1wcmV2aWV3LWNvbnRhaW5lci9wcmV2aWV3LWxpZ2h0Ym94L3ByZXZpZXctbGlnaHRib3guY29tcG9uZW50JztcbmltcG9ydCB7IFJlZnJlc2hJY29uQ29tcG9uZW50IH0gZnJvbSAnLi9maWxlLXByZXZpZXctY29udGFpbmVyL2ZpbGUtcHJldmlldy1pdGVtL3JlZnJlc2gtaWNvbi9yZWZyZXNoLWljb24uY29tcG9uZW50JztcbmltcG9ydCB7IEltYWdlQ3JvcHBlck1vZHVsZSB9IGZyb20gJ25neC1pbWFnZS1jcm9wcGVyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGaWxlRHJvcE1vZHVsZSxcbiAgICBJbWFnZUNyb3BwZXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRmlsZVBpY2tlckNvbXBvbmVudCxcbiAgICBGaWxlUHJldmlld0NvbnRhaW5lckNvbXBvbmVudCxcbiAgICBGaWxlUHJldmlld0l0ZW1Db21wb25lbnQsXG4gICAgUHJldmlld0xpZ2h0Ym94Q29tcG9uZW50LFxuICAgIFJlZnJlc2hJY29uQ29tcG9uZW50LFxuICAgIENsb3NlSWNvbkNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbRmlsZVBpY2tlckNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW0ZpbGVQaWNrZXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBGaWxlUGlja2VyTW9kdWxlIHt9XG4iXX0=