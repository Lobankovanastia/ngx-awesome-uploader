import { OnInit, EventEmitter } from '@angular/core';
import { FilePreviewModel } from '../../file-preview.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
export declare class PreviewLightboxComponent implements OnInit {
    private sanitizer;
    file: FilePreviewModel;
    close: EventEmitter<void>;
    loaded: boolean;
    safeUrl: SafeResourceUrl;
    constructor(sanitizer: DomSanitizer);
    ngOnInit(): void;
    getSafeUrl(file: File | Blob): void;
    onClose(event: any): void;
}
