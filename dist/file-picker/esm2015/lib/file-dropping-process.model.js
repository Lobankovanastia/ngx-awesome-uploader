/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class FileDroppingProcessModel {
    /**
     * @param {?} expectedLength
     * @param {?=} timerCounter
     */
    constructor(expectedLength, timerCounter = 20) {
        this.filesForUpload = [];
        this.timerCounter = 0;
        this.expectedLength = 0;
        this.checkTimeIntervalMS = 100;
        this.expectedLength = expectedLength;
        this.timerCounter = timerCounter;
    }
    /**
     * @param {?} file
     * @return {?}
     */
    addFileForUpload(file) {
        this.filesForUpload.push(file);
    }
    /**
     * @return {?}
     */
    diminishCounter() {
        this.timerCounter--;
    }
    /**
     * @return {?}
     */
    isProcessingFinished() {
        return this.timerCounter === 0 || this.filesForUpload.length === this.expectedLength;
    }
    /**
     * @param {?} length
     * @return {?}
     */
    setExpectedLength(length) {
        this.expectedLength = length;
    }
    /**
     * @return {?}
     */
    getFiles() {
        return this.filesForUpload;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    FileDroppingProcessModel.prototype.filesForUpload;
    /**
     * @type {?}
     * @private
     */
    FileDroppingProcessModel.prototype.timerCounter;
    /**
     * @type {?}
     * @private
     */
    FileDroppingProcessModel.prototype.expectedLength;
    /** @type {?} */
    FileDroppingProcessModel.prototype.checkTimeIntervalMS;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1kcm9wcGluZy1wcm9jZXNzLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF3ZXNvbWUtdXBsb2FkZXIvIiwic291cmNlcyI6WyJsaWIvZmlsZS1kcm9wcGluZy1wcm9jZXNzLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxNQUFNLE9BQU8sd0JBQXdCOzs7OztJQU1uQyxZQUFZLGNBQXNCLEVBQUUsZUFBdUIsRUFBRTtRQUxyRCxtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUM1QixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUNsQix3QkFBbUIsR0FBRyxHQUFHLENBQUM7UUFHakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxJQUFVO1FBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Ozs7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFFRCxvQkFBb0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQ3ZGLENBQUM7Ozs7O0lBRUQsaUJBQWlCLENBQUMsTUFBYztRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztJQUMvQixDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDO0NBQ0Y7Ozs7OztJQTdCQyxrREFBb0M7Ozs7O0lBQ3BDLGdEQUF5Qjs7Ozs7SUFDekIsa0RBQTJCOztJQUMzQix1REFBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBjbGFzcyBGaWxlRHJvcHBpbmdQcm9jZXNzTW9kZWwge1xuICBwcml2YXRlIGZpbGVzRm9yVXBsb2FkOiBGaWxlW10gPSBbXTtcbiAgcHJpdmF0ZSB0aW1lckNvdW50ZXIgPSAwO1xuICBwcml2YXRlIGV4cGVjdGVkTGVuZ3RoID0gMDtcbiAgcmVhZG9ubHkgY2hlY2tUaW1lSW50ZXJ2YWxNUyA9IDEwMDtcblxuICBjb25zdHJ1Y3RvcihleHBlY3RlZExlbmd0aDogbnVtYmVyLCB0aW1lckNvdW50ZXI6IG51bWJlciA9IDIwKSB7XG4gICAgdGhpcy5leHBlY3RlZExlbmd0aCA9IGV4cGVjdGVkTGVuZ3RoO1xuICAgIHRoaXMudGltZXJDb3VudGVyID0gdGltZXJDb3VudGVyO1xuICB9XG5cbiAgYWRkRmlsZUZvclVwbG9hZChmaWxlOiBGaWxlKTogdm9pZCB7XG4gICAgdGhpcy5maWxlc0ZvclVwbG9hZC5wdXNoKGZpbGUpO1xuICB9XG5cbiAgZGltaW5pc2hDb3VudGVyKCk6IHZvaWQge1xuICAgIHRoaXMudGltZXJDb3VudGVyLS07XG4gIH1cblxuICBpc1Byb2Nlc3NpbmdGaW5pc2hlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy50aW1lckNvdW50ZXIgPT09IDAgfHwgdGhpcy5maWxlc0ZvclVwbG9hZC5sZW5ndGggPT09IHRoaXMuZXhwZWN0ZWRMZW5ndGg7XG4gIH1cblxuICBzZXRFeHBlY3RlZExlbmd0aChsZW5ndGg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZXhwZWN0ZWRMZW5ndGggPSBsZW5ndGg7XG4gIH1cblxuICBnZXRGaWxlcygpOiBGaWxlW10ge1xuICAgIHJldHVybiB0aGlzLmZpbGVzRm9yVXBsb2FkO1xuICB9XG59XG4iXX0=