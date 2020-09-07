import { OnInit, EventEmitter, TemplateRef } from '@angular/core';
import { FilePreviewModel } from '../file-preview.model';
import { FilePickerAdapter } from '../file-picker.adapter';
import { UploaderCaptions } from '../uploader-captions';
import { HttpErrorResponse } from '@angular/common/http';
export declare class FilePreviewContainerComponent implements OnInit {
    previewFiles: FilePreviewModel[];
    itemTemplate: TemplateRef<any>;
    removeFile: EventEmitter<FilePreviewModel>;
    uploadSuccess: EventEmitter<FilePreviewModel>;
    uploadFail: EventEmitter<HttpErrorResponse>;
    lightboxFile: FilePreviewModel;
    adapter: FilePickerAdapter;
    captions: UploaderCaptions;
    constructor();
    ngOnInit(): void;
    openLightbox(file: FilePreviewModel): void;
    closeLightbox(): void;
}
