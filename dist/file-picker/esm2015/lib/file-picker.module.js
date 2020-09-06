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
export class FilePickerModule {
}
FilePickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FileDropModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1waWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF3ZXNvbWUtdXBsb2FkZXIvIiwic291cmNlcyI6WyJsaWIvZmlsZS1waWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3RUFBd0UsQ0FBQztBQUNsSCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUMxRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sc0VBQXNFLENBQUM7QUFDaEgsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0ZBQWdGLENBQUM7QUFpQnRILE1BQU0sT0FBTyxnQkFBZ0I7OztZQWhCNUIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGNBQWM7aUJBQ2Y7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLG1CQUFtQjtvQkFDbkIsNkJBQTZCO29CQUM3Qix3QkFBd0I7b0JBQ3hCLHdCQUF3QjtvQkFDeEIsb0JBQW9CO29CQUNwQixrQkFBa0I7aUJBQ25CO2dCQUNELE9BQU8sRUFBRSxDQUFDLG1CQUFtQixDQUFDO2dCQUM5QixTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzthQUMvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENsb3NlSWNvbkNvbXBvbmVudCB9IGZyb20gJy4vaWNvbnMvY2xvc2UtaWNvbi9jbG9zZS1pY29uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWxlUHJldmlld0l0ZW1Db21wb25lbnQgfSBmcm9tICcuL2ZpbGUtcHJldmlldy1jb250YWluZXIvZmlsZS1wcmV2aWV3LWl0ZW0vZmlsZS1wcmV2aWV3LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IEZpbGVQcmV2aWV3Q29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9maWxlLXByZXZpZXctY29udGFpbmVyL2ZpbGUtcHJldmlldy1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWxlUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9maWxlLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZpbGVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi9maWxlLXBpY2tlci5zZXJ2aWNlJztcbmltcG9ydCB7IEZpbGVEcm9wTW9kdWxlIH0gZnJvbSAnLi9maWxlLWRyb3AvZmlsZS1kcm9wLm1vZHVsZSc7XG5pbXBvcnQgeyBQcmV2aWV3TGlnaHRib3hDb21wb25lbnQgfSBmcm9tICcuL2ZpbGUtcHJldmlldy1jb250YWluZXIvcHJldmlldy1saWdodGJveC9wcmV2aWV3LWxpZ2h0Ym94LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWZyZXNoSWNvbkNvbXBvbmVudCB9IGZyb20gJy4vZmlsZS1wcmV2aWV3LWNvbnRhaW5lci9maWxlLXByZXZpZXctaXRlbS9yZWZyZXNoLWljb24vcmVmcmVzaC1pY29uLmNvbXBvbmVudCc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZpbGVEcm9wTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBGaWxlUGlja2VyQ29tcG9uZW50LFxuICAgIEZpbGVQcmV2aWV3Q29udGFpbmVyQ29tcG9uZW50LFxuICAgIEZpbGVQcmV2aWV3SXRlbUNvbXBvbmVudCxcbiAgICBQcmV2aWV3TGlnaHRib3hDb21wb25lbnQsXG4gICAgUmVmcmVzaEljb25Db21wb25lbnQsXG4gICAgQ2xvc2VJY29uQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtGaWxlUGlja2VyQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbRmlsZVBpY2tlclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEZpbGVQaWNrZXJNb2R1bGUge31cbiJdfQ==