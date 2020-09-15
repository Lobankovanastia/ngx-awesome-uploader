/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, NgZone, Renderer2 } from '@angular/core';
import { timer } from 'rxjs';
import { UploadFile } from './upload-file.model';
import { UploadEvent } from './upload-event.model';
var FileComponent = /** @class */ (function () {
    function FileComponent(zone, renderer) {
        var _this = this;
        this.zone = zone;
        this.renderer = renderer;
        this.customstyle = null;
        this.disableIf = false;
        this.onFileDrop = new EventEmitter();
        this.onFileOver = new EventEmitter();
        this.onFileLeave = new EventEmitter();
        this.stack = [];
        this.files = [];
        this.dragoverflag = false;
        this.globalDisable = false;
        this.numOfActiveReadEntries = 0;
        if (!this.customstyle) {
            this.customstyle = 'drop-zone';
        }
        this.globalStart = this.renderer.listen('document', 'dragstart', (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            _this.globalDisable = true;
        }));
        this.globalEnd = this.renderer.listen('document', 'dragend', (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            _this.globalDisable = false;
        }));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    FileComponent.prototype.onDragOver = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.globalDisable && !this.disableIf) {
            if (!this.dragoverflag) {
                this.dragoverflag = true;
                this.onFileOver.emit(event);
            }
            this.preventAndStop(event);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FileComponent.prototype.onDragLeave = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.globalDisable && !this.disableIf) {
            if (this.dragoverflag) {
                this.dragoverflag = false;
                this.onFileLeave.emit(event);
            }
            this.preventAndStop(event);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FileComponent.prototype.dropFiles = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (!this.globalDisable && !this.disableIf) {
            this.dragoverflag = false;
            event.dataTransfer.dropEffect = 'copy';
            /** @type {?} */
            var length_1;
            if (event.dataTransfer.items) {
                length_1 = event.dataTransfer.items.length;
            }
            else {
                length_1 = event.dataTransfer.files.length;
            }
            var _loop_1 = function (i) {
                /** @type {?} */
                var entry = void 0;
                if (event.dataTransfer.items) {
                    if (event.dataTransfer.items[i].webkitGetAsEntry) {
                        entry = event.dataTransfer.items[i].webkitGetAsEntry();
                    }
                }
                else {
                    if (event.dataTransfer.files[i].webkitGetAsEntry) {
                        entry = event.dataTransfer.files[i].webkitGetAsEntry();
                    }
                }
                if (!entry) {
                    /** @type {?} */
                    var file_1 = event.dataTransfer.files[i];
                    if (file_1) {
                        /** @type {?} */
                        var fakeFileEntry = {
                            name: file_1.name,
                            isDirectory: false,
                            isFile: true,
                            file: (/**
                             * @param {?} callback
                             * @return {?}
                             */
                            function (callback) {
                                callback(file_1);
                            })
                        };
                        /** @type {?} */
                        var toUpload = new UploadFile(fakeFileEntry.name, fakeFileEntry);
                        this_1.addToQueue(toUpload);
                    }
                }
                else {
                    if (entry.isFile) {
                        /** @type {?} */
                        var toUpload = new UploadFile(entry.name, entry);
                        this_1.addToQueue(toUpload);
                    }
                    else if (entry.isDirectory) {
                        this_1.traverseFileTree(entry, entry.name);
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < length_1; i++) {
                _loop_1(i);
            }
            this.preventAndStop(event);
            /** @type {?} */
            var timerObservable = timer(200, 200);
            this.subscription = timerObservable.subscribe((/**
             * @param {?} t
             * @return {?}
             */
            function (t) {
                if (_this.files.length > 0 && _this.numOfActiveReadEntries === 0) {
                    _this.onFileDrop.emit(new UploadEvent(_this.files));
                    _this.files = [];
                }
            }));
        }
    };
    /**
     * @private
     * @param {?} item
     * @param {?} path
     * @return {?}
     */
    FileComponent.prototype.traverseFileTree = /**
     * @private
     * @param {?} item
     * @param {?} path
     * @return {?}
     */
    function (item, path) {
        var _this = this;
        if (item.isFile) {
            /** @type {?} */
            var toUpload = new UploadFile(path, item);
            this.files.push(toUpload);
            this.zone.run((/**
             * @return {?}
             */
            function () {
                _this.popToStack();
            }));
        }
        else {
            this.pushToStack(path);
            path = path + '/';
            /** @type {?} */
            var dirReader_1 = ((/** @type {?} */ (item))).createReader();
            /** @type {?} */
            var entries_1 = [];
            /** @type {?} */
            var thisObj_1 = this;
            /** @type {?} */
            var readEntries_1 = (/**
             * @return {?}
             */
            function () {
                thisObj_1.numOfActiveReadEntries++;
                dirReader_1.readEntries((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    if (!res.length) {
                        // add empty folders
                        if (entries_1.length === 0) {
                            /** @type {?} */
                            var toUpload_1 = new UploadFile(path, item);
                            thisObj_1.zone.run((/**
                             * @return {?}
                             */
                            function () {
                                thisObj_1.addToQueue(toUpload_1);
                            }));
                        }
                        else {
                            var _loop_2 = function (i) {
                                thisObj_1.zone.run((/**
                                 * @return {?}
                                 */
                                function () {
                                    thisObj_1.traverseFileTree(entries_1[i], path + entries_1[i].name);
                                }));
                            };
                            for (var i = 0; i < entries_1.length; i++) {
                                _loop_2(i);
                            }
                        }
                        thisObj_1.zone.run((/**
                         * @return {?}
                         */
                        function () {
                            thisObj_1.popToStack();
                        }));
                    }
                    else {
                        // continue with the reading
                        entries_1 = entries_1.concat(res);
                        readEntries_1();
                    }
                    thisObj_1.numOfActiveReadEntries--;
                }));
            });
            readEntries_1();
        }
    };
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    FileComponent.prototype.addToQueue = /**
     * @private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.files.push(item);
    };
    /**
     * @param {?} str
     * @return {?}
     */
    FileComponent.prototype.pushToStack = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        this.stack.push(str);
    };
    /**
     * @return {?}
     */
    FileComponent.prototype.popToStack = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value = this.stack.pop();
    };
    /**
     * @private
     * @return {?}
     */
    FileComponent.prototype.clearQueue = /**
     * @private
     * @return {?}
     */
    function () {
        this.files = [];
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    FileComponent.prototype.preventAndStop = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        event.preventDefault();
    };
    /**
     * @return {?}
     */
    FileComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.globalStart();
        this.globalEnd();
    };
    FileComponent.decorators = [
        { type: Component, args: [{
                    selector: 'file-drop',
                    template: "<div id=\"dropZone\"  [className]=\"customstyle\" [class.over]=\"dragoverflag\"\n    (drop)=\"dropFiles($event)\"\n    (dragover)=\"onDragOver($event)\" (dragleave)=\"onDragLeave($event)\">\n\n    <div #ref class=\"custom-dropzone\" >\n      <ng-content></ng-content>\n      </div>\n\n    <div class=\"content\" *ngIf=\"ref.children?.length == 0\">\n             <cloud-icon></cloud-icon>\n              <div class=\"content-top-text\">\n                {{captions?.dropzone?.title}}\n              </div>\n              <div class=\"content-center-text\">\n                {{captions?.dropzone?.or}}\n              </div>\n              <button class=\"file-browse-button\">\n                {{captions?.dropzone?.browse}}\n              </button>\n    </div>\n</div>\n",
                    styles: [":host{display:block;width:100%;padding:0 16px}#dropZone{max-width:440px;margin:auto;border:2px dashed #e8e0f5;border-radius:6px;padding:56px 0;background:#fff}.file-browse-button{padding:12px 18px;background:#673ab7;border:0;outline:0;font-size:14px;color:#fff;font-weight:700;border-radius:6px;cursor:pointer}.content{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center}.over{background-color:rgba(147,147,147,.5)}.content-top-text{font-size:18px;font-weight:700;color:#5b5b7b}.content-center-text{color:#90a0bc;margin:12px 0;font-size:14px}"]
                }] }
    ];
    /** @nocollapse */
    FileComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: Renderer2 }
    ]; };
    FileComponent.propDecorators = {
        captions: [{ type: Input }],
        customstyle: [{ type: Input }],
        disableIf: [{ type: Input }],
        onFileDrop: [{ type: Output }],
        onFileOver: [{ type: Output }],
        onFileLeave: [{ type: Output }]
    };
    return FileComponent;
}());
export { FileComponent };
if (false) {
    /** @type {?} */
    FileComponent.prototype.captions;
    /** @type {?} */
    FileComponent.prototype.customstyle;
    /** @type {?} */
    FileComponent.prototype.disableIf;
    /** @type {?} */
    FileComponent.prototype.onFileDrop;
    /** @type {?} */
    FileComponent.prototype.onFileOver;
    /** @type {?} */
    FileComponent.prototype.onFileLeave;
    /** @type {?} */
    FileComponent.prototype.stack;
    /** @type {?} */
    FileComponent.prototype.files;
    /** @type {?} */
    FileComponent.prototype.subscription;
    /** @type {?} */
    FileComponent.prototype.dragoverflag;
    /** @type {?} */
    FileComponent.prototype.globalDisable;
    /** @type {?} */
    FileComponent.prototype.globalStart;
    /** @type {?} */
    FileComponent.prototype.globalEnd;
    /** @type {?} */
    FileComponent.prototype.numOfActiveReadEntries;
    /**
     * @type {?}
     * @private
     */
    FileComponent.prototype.zone;
    /**
     * @type {?}
     * @private
     */
    FileComponent.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1kcm9wLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hd2Vzb21lLXVwbG9hZGVyLyIsInNvdXJjZXMiOlsibGliL2ZpbGUtZHJvcC9maWxlLWRyb3AuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLE1BQU0sRUFFTixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQVFuRDtJQWdDRSx1QkFBb0IsSUFBWSxFQUFVLFFBQW1CO1FBQTdELGlCQVVDO1FBVm1CLFNBQUksR0FBSixJQUFJLENBQVE7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBdkI3RCxnQkFBVyxHQUFXLElBQUksQ0FBQztRQUUzQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBR1gsZUFBVSxHQUE4QixJQUFJLFlBQVksRUFFNUQsQ0FBQztRQUVHLGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUV4RCxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRWhFLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxVQUFLLEdBQWlCLEVBQUUsQ0FBQztRQUV6QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUVyQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUl0QiwyQkFBc0IsR0FBRyxDQUFDLENBQUM7UUFFekIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7U0FDaEM7UUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENB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UUFDMUIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsbUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDakM7UUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7O2dCQXRNRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLDh3QkFBeUM7O2lCQUUxQzs7OztnQkFuQkMsTUFBTTtnQkFFTixTQUFTOzs7MkJBbUJSLEtBQUs7OEJBRUwsS0FBSzs0QkFFTCxLQUFLOzZCQUdMLE1BQU07NkJBSU4sTUFBTTs4QkFFTixNQUFNOztJQW9MVCxvQkFBQztDQUFBLEFBdk1ELElBdU1DO1NBbE1ZLGFBQWE7OztJQUN4QixpQ0FDMkI7O0lBQzNCLG9DQUMyQjs7SUFDM0Isa0NBQ2tCOztJQUVsQixtQ0FHSTs7SUFDSixtQ0FDK0Q7O0lBQy9ELG9DQUNnRTs7SUFFaEUsOEJBQVc7O0lBQ1gsOEJBQXlCOztJQUN6QixxQ0FBMkI7O0lBQzNCLHFDQUFxQjs7SUFFckIsc0NBQXNCOztJQUN0QixvQ0FBc0I7O0lBQ3RCLGtDQUFvQjs7SUFFcEIsK0NBQTJCOzs7OztJQUNmLDZCQUFvQjs7Ozs7SUFBRSxpQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRpbWVyLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgVXBsb2FkRmlsZSB9IGZyb20gJy4vdXBsb2FkLWZpbGUubW9kZWwnO1xuaW1wb3J0IHsgVXBsb2FkRXZlbnQgfSBmcm9tICcuL3VwbG9hZC1ldmVudC5tb2RlbCc7XG5pbXBvcnQge1xuICBGaWxlU3lzdGVtRmlsZUVudHJ5LFxuICBGaWxlU3lzdGVtRW50cnksXG4gIEZpbGVTeXN0ZW1EaXJlY3RvcnlFbnRyeVxufSBmcm9tICcuL2RvbS50eXBlcyc7XG5pbXBvcnQgeyBVcGxvYWRlckNhcHRpb25zIH0gZnJvbSAnLi4vdXBsb2FkZXItY2FwdGlvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmaWxlLWRyb3AnLFxuICB0ZW1wbGF0ZVVybDogJy4vZmlsZS1kcm9wLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmlsZS1kcm9wLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRmlsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpXG4gIGNhcHRpb25zOiBVcGxvYWRlckNhcHRpb25zO1xuICBASW5wdXQoKVxuICBjdXN0b21zdHlsZTogc3RyaW5nID0gbnVsbDtcbiAgQElucHV0KClcbiAgZGlzYWJsZUlmID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvbkZpbGVEcm9wOiBFdmVudEVtaXR0ZXI8VXBsb2FkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBVcGxvYWRFdmVudFxuICA+KCk7XG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb25GaWxlT3ZlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvbkZpbGVMZWF2ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBzdGFjayA9IFtdO1xuICBmaWxlczogVXBsb2FkRmlsZVtdID0gW107XG4gIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBkcmFnb3ZlcmZsYWcgPSBmYWxzZTtcblxuICBnbG9iYWxEaXNhYmxlID0gZmFsc2U7XG4gIGdsb2JhbFN0YXJ0OiBGdW5jdGlvbjtcbiAgZ2xvYmFsRW5kOiBGdW5jdGlvbjtcblxuICBudW1PZkFjdGl2ZVJlYWRFbnRyaWVzID0gMDtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIGlmICghdGhpcy5jdXN0b21zdHlsZSkge1xuICAgICAgdGhpcy5jdXN0b21zdHlsZSA9ICdkcm9wLXpvbmUnO1xuICAgIH1cbiAgICB0aGlzLmdsb2JhbFN0YXJ0ID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ2RyYWdzdGFydCcsIGV2dCA9PiB7XG4gICAgICB0aGlzLmdsb2JhbERpc2FibGUgPSB0cnVlO1xuICAgIH0pO1xuICAgIHRoaXMuZ2xvYmFsRW5kID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ2RyYWdlbmQnLCBldnQgPT4ge1xuICAgICAgdGhpcy5nbG9iYWxEaXNhYmxlID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cbiAgcHVibGljIG9uRHJhZ092ZXIoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmdsb2JhbERpc2FibGUgJiYgIXRoaXMuZGlzYWJsZUlmKSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ292ZXJmbGFnKSB7XG4gICAgICAgIHRoaXMuZHJhZ292ZXJmbGFnID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vbkZpbGVPdmVyLmVtaXQoZXZlbnQpO1xuICAgICAgfVxuICAgICAgdGhpcy5wcmV2ZW50QW5kU3RvcChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uRHJhZ0xlYXZlKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5nbG9iYWxEaXNhYmxlICYmICF0aGlzLmRpc2FibGVJZikge1xuICAgICAgaWYgKHRoaXMuZHJhZ292ZXJmbGFnKSB7XG4gICAgICAgIHRoaXMuZHJhZ292ZXJmbGFnID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25GaWxlTGVhdmUuZW1pdChldmVudCk7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXZlbnRBbmRTdG9wKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBkcm9wRmlsZXMoZXZlbnQ6IGFueSkge1xuICAgIGlmICghdGhpcy5nbG9iYWxEaXNhYmxlICYmICF0aGlzLmRpc2FibGVJZikge1xuICAgICAgdGhpcy5kcmFnb3ZlcmZsYWcgPSBmYWxzZTtcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknO1xuICAgICAgbGV0IGxlbmd0aDtcbiAgICAgIGlmIChldmVudC5kYXRhVHJhbnNmZXIuaXRlbXMpIHtcbiAgICAgICAgbGVuZ3RoID0gZXZlbnQuZGF0YVRyYW5zZmVyLml0ZW1zLmxlbmd0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxlbmd0aCA9IGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcy5sZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGVudHJ5OiBGaWxlU3lzdGVtRW50cnk7XG4gICAgICAgIGlmIChldmVudC5kYXRhVHJhbnNmZXIuaXRlbXMpIHtcbiAgICAgICAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyLml0ZW1zW2ldLndlYmtpdEdldEFzRW50cnkpIHtcbiAgICAgICAgICAgIGVudHJ5ID0gZXZlbnQuZGF0YVRyYW5zZmVyLml0ZW1zW2ldLndlYmtpdEdldEFzRW50cnkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1tpXS53ZWJraXRHZXRBc0VudHJ5KSB7XG4gICAgICAgICAgICBlbnRyeSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1tpXS53ZWJraXRHZXRBc0VudHJ5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghZW50cnkpIHtcbiAgICAgICAgICBjb25zdCBmaWxlOiBGaWxlID0gZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzW2ldO1xuICAgICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICBjb25zdCBmYWtlRmlsZUVudHJ5OiBGaWxlU3lzdGVtRmlsZUVudHJ5ID0ge1xuICAgICAgICAgICAgICBuYW1lOiBmaWxlLm5hbWUsXG4gICAgICAgICAgICAgIGlzRGlyZWN0b3J5OiBmYWxzZSxcbiAgICAgICAgICAgICAgaXNGaWxlOiB0cnVlLFxuICAgICAgICAgICAgICBmaWxlOiAoY2FsbGJhY2s6IChmaWxlYTogRmlsZSkgPT4gdm9pZCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZpbGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgdG9VcGxvYWQ6IFVwbG9hZEZpbGUgPSBuZXcgVXBsb2FkRmlsZShcbiAgICAgICAgICAgICAgZmFrZUZpbGVFbnRyeS5uYW1lLFxuICAgICAgICAgICAgICBmYWtlRmlsZUVudHJ5XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5hZGRUb1F1ZXVlKHRvVXBsb2FkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGVudHJ5LmlzRmlsZSkge1xuICAgICAgICAgICAgY29uc3QgdG9VcGxvYWQ6IFVwbG9hZEZpbGUgPSBuZXcgVXBsb2FkRmlsZShlbnRyeS5uYW1lLCBlbnRyeSk7XG4gICAgICAgICAgICB0aGlzLmFkZFRvUXVldWUodG9VcGxvYWQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZW50cnkuaXNEaXJlY3RvcnkpIHtcbiAgICAgICAgICAgIHRoaXMudHJhdmVyc2VGaWxlVHJlZShlbnRyeSwgZW50cnkubmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMucHJldmVudEFuZFN0b3AoZXZlbnQpO1xuXG4gICAgICBjb25zdCB0aW1lck9ic2VydmFibGUgPSB0aW1lcigyMDAsIDIwMCk7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRpbWVyT2JzZXJ2YWJsZS5zdWJzY3JpYmUodCA9PiB7XG4gICAgICAgIGlmICh0aGlzLmZpbGVzLmxlbmd0aCA+IDAgJiYgdGhpcy5udW1PZkFjdGl2ZVJlYWRFbnRyaWVzID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5vbkZpbGVEcm9wLmVtaXQobmV3IFVwbG9hZEV2ZW50KHRoaXMuZmlsZXMpKTtcbiAgICAgICAgICB0aGlzLmZpbGVzID0gW107XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJhdmVyc2VGaWxlVHJlZShpdGVtOiBGaWxlU3lzdGVtRW50cnksIHBhdGg6IHN0cmluZykge1xuICAgIGlmIChpdGVtLmlzRmlsZSkge1xuICAgICAgY29uc3QgdG9VcGxvYWQ6IFVwbG9hZEZpbGUgPSBuZXcgVXBsb2FkRmlsZShwYXRoLCBpdGVtKTtcbiAgICAgIHRoaXMuZmlsZXMucHVzaCh0b1VwbG9hZCk7XG4gICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5wb3BUb1N0YWNrKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wdXNoVG9TdGFjayhwYXRoKTtcbiAgICAgIHBhdGggPSBwYXRoICsgJy8nO1xuICAgICAgY29uc3QgZGlyUmVhZGVyID0gKGl0ZW0gYXMgRmlsZVN5c3RlbURpcmVjdG9yeUVudHJ5KS5jcmVhdGVSZWFkZXIoKTtcbiAgICAgIGxldCBlbnRyaWVzID0gW107XG4gICAgICBjb25zdCB0aGlzT2JqID0gdGhpcztcblxuICAgICAgY29uc3QgcmVhZEVudHJpZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpc09iai5udW1PZkFjdGl2ZVJlYWRFbnRyaWVzKys7XG4gICAgICAgIGRpclJlYWRlci5yZWFkRW50cmllcyhmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICBpZiAoIXJlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIGFkZCBlbXB0eSBmb2xkZXJzXG4gICAgICAgICAgICBpZiAoZW50cmllcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgY29uc3QgdG9VcGxvYWQ6IFVwbG9hZEZpbGUgPSBuZXcgVXBsb2FkRmlsZShwYXRoLCBpdGVtKTtcbiAgICAgICAgICAgICAgdGhpc09iai56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpc09iai5hZGRUb1F1ZXVlKHRvVXBsb2FkKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzT2JqLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXNPYmoudHJhdmVyc2VGaWxlVHJlZShlbnRyaWVzW2ldLCBwYXRoICsgZW50cmllc1tpXS5uYW1lKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpc09iai56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXNPYmoucG9wVG9TdGFjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvbnRpbnVlIHdpdGggdGhlIHJlYWRpbmdcbiAgICAgICAgICAgIGVudHJpZXMgPSBlbnRyaWVzLmNvbmNhdChyZXMpO1xuICAgICAgICAgICAgcmVhZEVudHJpZXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpc09iai5udW1PZkFjdGl2ZVJlYWRFbnRyaWVzLS07XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgcmVhZEVudHJpZXMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZFRvUXVldWUoaXRlbTogVXBsb2FkRmlsZSkge1xuICAgIHRoaXMuZmlsZXMucHVzaChpdGVtKTtcbiAgfVxuXG4gIHB1c2hUb1N0YWNrKHN0cikge1xuICAgIHRoaXMuc3RhY2sucHVzaChzdHIpO1xuICB9XG5cbiAgcG9wVG9TdGFjaygpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuc3RhY2sucG9wKCk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyUXVldWUoKSB7XG4gICAgdGhpcy5maWxlcyA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmV2ZW50QW5kU3RvcChldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHRoaXMuZ2xvYmFsU3RhcnQoKTtcbiAgICB0aGlzLmdsb2JhbEVuZCgpO1xuICB9XG59XG4iXX0=