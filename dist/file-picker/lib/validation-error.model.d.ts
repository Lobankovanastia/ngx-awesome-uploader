export interface ValidationError {
    file: File;
    error: string;
}
export declare enum FileValidationTypes {
    fileMaxSize = "FILE_MAX_SIZE",
    fileMaxCount = "FILE_MAX_COUNT",
    totalMaxSize = "TOTAL_MAX_SIZE",
    extensions = "EXTENSIONS",
    uploadType = "UPLOAD_TYPE",
    customValidator = "CUSTOM_VALIDATOR"
}
