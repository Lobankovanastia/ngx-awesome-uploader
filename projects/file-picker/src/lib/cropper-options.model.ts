import {ImageTransform} from 'ngx-image-cropper';

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


export class CropperOptionsModel implements CropperOptions {
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

  constructor({
      aspectRatio = 1,
      maintainAspectRatio = true,
      resizeToWidth = 0,
      resizeToHeight = 0,
      cropperStaticWidth = 0,
      cropperStaticHeight = 0,
      cropperMinWidth = 0,
      cropperMinHeight= 0,
      initialStepSize = 3,
      onlyScaleDown = false,
      roundCropper = false,
      imageQuality = 92,
      alignImage = 'center',
      backgroundColor = '',
      hideResizeSquares = false,
      disabled = false,
      canvasRotation = 0,
      transform = {},
      loadImageFailed = () => {}
  }: CropperOptions) {
      this.aspectRatio = aspectRatio;
      this.maintainAspectRatio = maintainAspectRatio;
      this.resizeToWidth = resizeToWidth;
      this.resizeToHeight = resizeToHeight;
      this.cropperStaticWidth = cropperStaticWidth;
      this.cropperStaticHeight = cropperStaticHeight;
      this.cropperMinWidth = cropperMinWidth;
      this.cropperMinHeight = cropperMinHeight;
      this.initialStepSize = initialStepSize;
      this.onlyScaleDown = onlyScaleDown;
      this.roundCropper = roundCropper;
      this.imageQuality = imageQuality;
      this.alignImage = alignImage;
      this.backgroundColor = backgroundColor;
      this.hideResizeSquares = hideResizeSquares;
      this.disabled = disabled;
      this.canvasRotation = canvasRotation;
      this.transform = transform;
      this.loadImageFailed = loadImageFailed;
  }
}
