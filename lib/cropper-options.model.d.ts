import { ImageTransform } from 'ngx-image-cropper';
export interface CropperOptions {
    aspectRatio?: number;
    maintainAspectRatio?: boolean;
    resizeToWidth?: number;
    resizeToHeight?: number;
    cropperStaticWidth?: number;
    cropperStaticHeight?: number;
    cropperMinWidth?: number;
    cropperMinHeight?: number;
    initialStepSize?: number;
    onlyScaleDown?: boolean;
    roundCropper?: boolean;
    imageQuality?: number;
    alignImage?: 'left' | 'center';
    backgroundColor?: string;
    hideResizeSquares?: boolean;
    disabled?: boolean;
    canvasRotation?: number;
    transform?: ImageTransform;
    loadImageFailed?: Function;
}
export declare class CropperOptionsModel implements CropperOptions {
    readonly aspectRatio: number;
    readonly maintainAspectRatio: boolean;
    readonly resizeToWidth: number;
    readonly resizeToHeight: number;
    readonly cropperStaticWidth: number;
    readonly cropperStaticHeight: number;
    readonly cropperMinWidth: number;
    readonly cropperMinHeight: number;
    readonly initialStepSize: number;
    readonly onlyScaleDown: boolean;
    readonly roundCropper: boolean;
    readonly imageQuality: number;
    readonly alignImage: 'left' | 'center';
    readonly backgroundColor: string;
    readonly hideResizeSquares: boolean;
    readonly disabled: boolean;
    readonly canvasRotation: number;
    readonly transform: ImageTransform;
    readonly loadImageFailed: Function;
    constructor({ aspectRatio, maintainAspectRatio, resizeToWidth, resizeToHeight, cropperStaticWidth, cropperStaticHeight, cropperMinWidth, cropperMinHeight, initialStepSize, onlyScaleDown, roundCropper, imageQuality, alignImage, backgroundColor, hideResizeSquares, disabled, canvasRotation, transform, loadImageFailed }: CropperOptions);
}
