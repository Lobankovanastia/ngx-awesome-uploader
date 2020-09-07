import { FilePickerService } from './../../file-picker.service';
import { FilePreviewModel } from './../../file-preview.model';
import { OnInit, EventEmitter, TemplateRef } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FilePickerAdapter } from '../../file-picker.adapter';
import { UploaderCaptions } from '../../uploader-captions';
export declare class FilePreviewItemComponent implements OnInit {
    private fileService;
    removeFile: EventEmitter<FilePreviewModel>;
    uploadSuccess: EventEmitter<FilePreviewModel>;
    uploadFail: EventEmitter<HttpErrorResponse>;
    imageClicked: EventEmitter<FilePreviewModel>;
    fileItem: FilePreviewModel;
    adapter: FilePickerAdapter;
    itemTemplate: TemplateRef<any>;
    captions: UploaderCaptions;
    icon: string;
    uploadProgress: number;
    fileType: string;
    safeUrl: SafeResourceUrl;
    uploadError: boolean;
    uploadSubscription: Subscription;
    fileId: string;
    constructor(fileService: FilePickerService);
    ngOnInit(): void;
    getSafeUrl(file: File | Blob): SafeResourceUrl;
    /** Converts bytes to nice size */
    niceBytes(x: any): string;
    /** Retry file upload when upload was unsuccessfull */
    onRetry(): void;
    onCheckMarkClick(): void;
    uploadFile(fileItem: FilePreviewModel): void;
    /** Emits event when file upload api returns success  */
    onUploadSuccess(id: string, fileItem: FilePreviewModel): void;
    handleProgressResponse(event: HttpEvent<any>, fileName: any): string;
    onRemove(fileItem: FilePreviewModel): void;
    /** Cancel upload. Cancels request  */
    uploadUnsubscribe(): void;
}
