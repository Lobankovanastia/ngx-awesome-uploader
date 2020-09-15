import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
export declare class FilePickerService {
    private sanitizer;
    constructor(sanitizer: DomSanitizer);
    mockUploadFile(formData: any): Observable<any>;
    createSafeUrl(file: any): SafeResourceUrl;
}
