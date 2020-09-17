export declare class FileDroppingProcessModel {
    private filesForUpload;
    private timerCounter;
    private expectedLength;
    readonly checkTimeIntervalMS = 100;
    constructor(expectedLength: number, timerCounter?: number);
    addFileForUpload(file: File): void;
    diminishCounter(): void;
    isProcessingFinished(): boolean;
    setExpectedLength(length: number): void;
    getFiles(): File[];
}
