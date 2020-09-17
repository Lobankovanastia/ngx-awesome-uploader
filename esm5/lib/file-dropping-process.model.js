/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FileDroppingProcessModel = /** @class */ (function () {
    function FileDroppingProcessModel(expectedLength, timerCounter) {
        if (timerCounter === void 0) { timerCounter = 20; }
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
    FileDroppingProcessModel.prototype.addFileForUpload = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        this.filesForUpload.push(file);
    };
    /**
     * @return {?}
     */
    FileDroppingProcessModel.prototype.diminishCounter = /**
     * @return {?}
     */
    function () {
        this.timerCounter--;
    };
    /**
     * @return {?}
     */
    FileDroppingProcessModel.prototype.isProcessingFinished = /**
     * @return {?}
     */
    function () {
        return this.timerCounter === 0 || this.filesForUpload.length === this.expectedLength;
    };
    /**
     * @param {?} length
     * @return {?}
     */
    FileDroppingProcessModel.prototype.setExpectedLength = /**
     * @param {?} length
     * @return {?}
     */
    function (length) {
        this.expectedLength = length;
    };
    /**
     * @return {?}
     */
    FileDroppingProcessModel.prototype.getFiles = /**
     * @return {?}
     */
    function () {
        return this.filesForUpload;
    };
    return FileDroppingProcessModel;
}());
export { FileDroppingProcessModel };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1kcm9wcGluZy1wcm9jZXNzLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF3ZXNvbWUtdXBsb2FkZXIvIiwic291cmNlcyI6WyJsaWIvZmlsZS1kcm9wcGluZy1wcm9jZXNzLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQTtJQU1FLGtDQUFZLGNBQXNCLEVBQUUsWUFBeUI7UUFBekIsNkJBQUEsRUFBQSxpQkFBeUI7UUFMckQsbUJBQWMsR0FBVyxFQUFFLENBQUM7UUFDNUIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFDbEIsd0JBQW1CLEdBQUcsR0FBRyxDQUFDO1FBR2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ25DLENBQUM7Ozs7O0lBRUQsbURBQWdCOzs7O0lBQWhCLFVBQWlCLElBQVU7UUFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7OztJQUVELGtEQUFlOzs7SUFBZjtRQUNFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsdURBQW9COzs7SUFBcEI7UUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDdkYsQ0FBQzs7Ozs7SUFFRCxvREFBaUI7Ozs7SUFBakIsVUFBa0IsTUFBYztRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztJQUMvQixDQUFDOzs7O0lBRUQsMkNBQVE7OztJQUFSO1FBQ0UsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFDSCwrQkFBQztBQUFELENBQUMsQUE5QkQsSUE4QkM7Ozs7Ozs7SUE3QkMsa0RBQW9DOzs7OztJQUNwQyxnREFBeUI7Ozs7O0lBQ3pCLGtEQUEyQjs7SUFDM0IsdURBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgY2xhc3MgRmlsZURyb3BwaW5nUHJvY2Vzc01vZGVsIHtcbiAgcHJpdmF0ZSBmaWxlc0ZvclVwbG9hZDogRmlsZVtdID0gW107XG4gIHByaXZhdGUgdGltZXJDb3VudGVyID0gMDtcbiAgcHJpdmF0ZSBleHBlY3RlZExlbmd0aCA9IDA7XG4gIHJlYWRvbmx5IGNoZWNrVGltZUludGVydmFsTVMgPSAxMDA7XG5cbiAgY29uc3RydWN0b3IoZXhwZWN0ZWRMZW5ndGg6IG51bWJlciwgdGltZXJDb3VudGVyOiBudW1iZXIgPSAyMCkge1xuICAgIHRoaXMuZXhwZWN0ZWRMZW5ndGggPSBleHBlY3RlZExlbmd0aDtcbiAgICB0aGlzLnRpbWVyQ291bnRlciA9IHRpbWVyQ291bnRlcjtcbiAgfVxuXG4gIGFkZEZpbGVGb3JVcGxvYWQoZmlsZTogRmlsZSk6IHZvaWQge1xuICAgIHRoaXMuZmlsZXNGb3JVcGxvYWQucHVzaChmaWxlKTtcbiAgfVxuXG4gIGRpbWluaXNoQ291bnRlcigpOiB2b2lkIHtcbiAgICB0aGlzLnRpbWVyQ291bnRlci0tO1xuICB9XG5cbiAgaXNQcm9jZXNzaW5nRmluaXNoZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudGltZXJDb3VudGVyID09PSAwIHx8IHRoaXMuZmlsZXNGb3JVcGxvYWQubGVuZ3RoID09PSB0aGlzLmV4cGVjdGVkTGVuZ3RoO1xuICB9XG5cbiAgc2V0RXhwZWN0ZWRMZW5ndGgobGVuZ3RoOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmV4cGVjdGVkTGVuZ3RoID0gbGVuZ3RoO1xuICB9XG5cbiAgZ2V0RmlsZXMoKTogRmlsZVtdIHtcbiAgICByZXR1cm4gdGhpcy5maWxlc0ZvclVwbG9hZDtcbiAgfVxufVxuIl19