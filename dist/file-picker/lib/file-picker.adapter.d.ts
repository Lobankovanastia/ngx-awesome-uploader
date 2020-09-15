import { FilePreviewModel } from './file-preview.model';
import { Observable } from 'rxjs';
export declare abstract class FilePickerAdapter {
    abstract uploadFile(fileItem: FilePreviewModel): Observable<number | string>;
    abstract removeFile(fileItem: FilePreviewModel): Observable<any>;
}
