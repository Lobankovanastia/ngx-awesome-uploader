
export class FileDroppingProcessModel {
  private filesForUpload: File[] = [];
  private timerCounter = 0;
  private expectedLength = 0;
  readonly checkTimeIntervalMS = 100;

  constructor(expectedLength: number, timerCounter: number = 20) {
    this.expectedLength = expectedLength;
    this.timerCounter = timerCounter;
  }

  addFileForUpload(file: File): void {
    this.filesForUpload.push(file);
  }

  diminishCounter(): void {
    this.timerCounter--;
  }

  isProcessingFinished(): boolean {
    return this.timerCounter === 0 || this.filesForUpload.length === this.expectedLength;
  }

  setExpectedLength(length: number): void {
    this.expectedLength = length;
  }

  getFiles(): File[] {
    return this.filesForUpload;
  }
}
