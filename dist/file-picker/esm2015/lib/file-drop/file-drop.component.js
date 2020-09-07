/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, NgZone, Renderer2 } from '@angular/core';
import { timer } from 'rxjs';
import { UploadFile } from './upload-file.model';
import { UploadEvent } from './upload-event.model';
export class FileComponent {
    /**
     * @param {?} zone
     * @param {?} renderer
     */
    constructor(zone, renderer) {
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
        evt => {
            this.globalDisable = true;
        }));
        this.globalEnd = this.renderer.listen('document', 'dragend', (/**
         * @param {?} evt
         * @return {?}
         */
        evt => {
            this.globalDisable = false;
        }));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDragOver(event) {
        if (!this.globalDisable && !this.disableIf) {
            if (!this.dragoverflag) {
                this.dragoverflag = true;
                this.onFileOver.emit(event);
            }
            this.preventAndStop(event);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDragLeave(event) {
        if (!this.globalDisable && !this.disableIf) {
            if (this.dragoverflag) {
                this.dragoverflag = false;
                this.onFileLeave.emit(event);
            }
            this.preventAndStop(event);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dropFiles(event) {
        if (!this.globalDisable && !this.disableIf) {
            this.dragoverflag = false;
            event.dataTransfer.dropEffect = 'copy';
            /** @type {?} */
            let length;
            if (event.dataTransfer.items) {
                length = event.dataTransfer.items.length;
            }
            else {
                length = event.dataTransfer.files.length;
            }
            for (let i = 0; i < length; i++) {
                /** @type {?} */
                let entry;
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
                    const file = event.dataTransfer.files[i];
                    if (file) {
                        /** @type {?} */
                        const fakeFileEntry = {
                            name: file.name,
                            isDirectory: false,
                            isFile: true,
                            file: (/**
                             * @param {?} callback
                             * @return {?}
                             */
                            (callback) => {
                                callback(file);
                            })
                        };
                        /** @type {?} */
                        const toUpload = new UploadFile(fakeFileEntry.name, fakeFileEntry);
                        this.addToQueue(toUpload);
                    }
                }
                else {
                    if (entry.isFile) {
                        /** @type {?} */
                        const toUpload = new UploadFile(entry.name, entry);
                        this.addToQueue(toUpload);
                    }
                    else if (entry.isDirectory) {
                        this.traverseFileTree(entry, entry.name);
                    }
                }
            }
            this.preventAndStop(event);
            /** @type {?} */
            const timerObservable = timer(200, 200);
            this.subscription = timerObservable.subscribe((/**
             * @param {?} t
             * @return {?}
             */
            t => {
                if (this.files.length > 0 && this.numOfActiveReadEntries === 0) {
                    this.onFileDrop.emit(new UploadEvent(this.files));
                    this.files = [];
                }
            }));
        }
    }
    /**
     * @private
     * @param {?} item
     * @param {?} path
     * @return {?}
     */
    traverseFileTree(item, path) {
        if (item.isFile) {
            /** @type {?} */
            const toUpload = new UploadFile(path, item);
            this.files.push(toUpload);
            this.zone.run((/**
             * @return {?}
             */
            () => {
                this.popToStack();
            }));
        }
        else {
            this.pushToStack(path);
            path = path + '/';
            /** @type {?} */
            const dirReader = ((/** @type {?} */ (item))).createReader();
            /** @type {?} */
            let entries = [];
            /** @type {?} */
            const thisObj = this;
            /** @type {?} */
            const readEntries = (/**
             * @return {?}
             */
            function () {
                thisObj.numOfActiveReadEntries++;
                dirReader.readEntries((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    if (!res.length) {
                        // add empty folders
                        if (entries.length === 0) {
                            /** @type {?} */
                            const toUpload = new UploadFile(path, item);
                            thisObj.zone.run((/**
                             * @return {?}
                             */
                            () => {
                                thisObj.addToQueue(toUpload);
                            }));
                        }
                        else {
                            for (let i = 0; i < entries.length; i++) {
                                thisObj.zone.run((/**
                                 * @return {?}
                                 */
                                () => {
                                    thisObj.traverseFileTree(entries[i], path + entries[i].name);
                                }));
                            }
                        }
                        thisObj.zone.run((/**
                         * @return {?}
                         */
                        () => {
                            thisObj.popToStack();
                        }));
                    }
                    else {
                        // continue with the reading
                        entries = entries.concat(res);
                        readEntries();
                    }
                    thisObj.numOfActiveReadEntries--;
                }));
            });
            readEntries();
        }
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    addToQueue(item) {
        this.files.push(item);
    }
    /**
     * @param {?} str
     * @return {?}
     */
    pushToStack(str) {
        this.stack.push(str);
    }
    /**
     * @return {?}
     */
    popToStack() {
        /** @type {?} */
        const value = this.stack.pop();
    }
    /**
     * @private
     * @return {?}
     */
    clearQueue() {
        this.files = [];
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    preventAndStop(event) {
        event.stopPropagation();
        event.preventDefault();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.globalStart();
        this.globalEnd();
    }
}
FileComponent.decorators = [
    { type: Component, args: [{
                selector: 'file-drop',
                template: "<div id=\"dropZone\"  [className]=\"customstyle\" [class.over]=\"dragoverflag\"\n    (drop)=\"dropFiles($event)\"\n    (dragover)=\"onDragOver($event)\" (dragleave)=\"onDragLeave($event)\">\n\n    <div #ref class=\"custom-dropzone\" >\n      <ng-content></ng-content>\n      </div>\n\n    <div class=\"content\" *ngIf=\"ref.children?.length == 0\">\n             <cloud-icon></cloud-icon>\n              <div class=\"content-top-text\">\n                {{captions?.dropzone?.title}}\n              </div>\n              <div class=\"content-center-text\">\n                {{captions?.dropzone?.or}}\n              </div>\n              <button class=\"file-browse-button\">\n                {{captions?.dropzone?.browse}}\n              </button>\n    </div>\n</div>\n",
                styles: [":host{display:block;width:100%;padding:0 16px}#dropZone{max-width:440px;margin:auto;border:2px dashed #e8e0f5;border-radius:6px;padding:56px 0;background:#fff}.file-browse-button{padding:12px 18px;background:#673ab7;border:0;outline:0;font-size:14px;color:#fff;font-weight:700;border-radius:6px;cursor:pointer}.content{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center}.over{background-color:rgba(147,147,147,.5)}.content-top-text{font-size:18px;font-weight:700;color:#5b5b7b}.content-center-text{color:#90a0bc;margin:12px 0;font-size:14px}"]
            }] }
];
/** @nocollapse */
FileComponent.ctorParameters = () => [
    { type: NgZone },
    { type: Renderer2 }
];
FileComponent.propDecorators = {
    captions: [{ type: Input }],
    customstyle: [{ type: Input }],
    disableIf: [{ type: Input }],
    onFileDrop: [{ type: Output }],
    onFileOver: [{ type: Output }],
    onFileLeave: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1kcm9wLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hd2Vzb21lLXVwbG9hZGVyLyIsInNvdXJjZXMiOlsibGliL2ZpbGUtZHJvcC9maWxlLWRyb3AuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLE1BQU0sRUFFTixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQWFuRCxNQUFNLE9BQU8sYUFBYTs7Ozs7SUEyQnhCLFlBQW9CLElBQVksRUFBVSxRQUFtQjtRQUF6QyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXZCN0QsZ0JBQVcsR0FBVyxJQUFJLENBQUM7UUFFM0IsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUdYLGVBQVUsR0FBOEIsSUFBSSxZQUFZLEVBRTVELENBQUM7UUFFRyxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFeEQsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUVoRSxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsVUFBSyxHQUFpQixFQUFFLENBQUM7UUFFekIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFFckIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFJdEIsMkJBQXNCLEdBQUcsQ0FBQyxDQUFDO1FBRXpCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMs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Ozs7O0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7WUF0TUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQiw4d0JBQXlDOzthQUUxQzs7OztZQW5CQyxNQUFNO1lBRU4sU0FBUzs7O3VCQW1CUixLQUFLOzBCQUVMLEtBQUs7d0JBRUwsS0FBSzt5QkFHTCxNQUFNO3lCQUlOLE1BQU07MEJBRU4sTUFBTTs7OztJQWJQLGlDQUMyQjs7SUFDM0Isb0NBQzJCOztJQUMzQixrQ0FDa0I7O0lBRWxCLG1DQUdJOztJQUNKLG1DQUMrRDs7SUFDL0Qsb0NBQ2dFOztJQUVoRSw4QkFBVzs7SUFDWCw4QkFBeUI7O0lBQ3pCLHFDQUEyQjs7SUFDM0IscUNBQXFCOztJQUVyQixzQ0FBc0I7O0lBQ3RCLG9DQUFzQjs7SUFDdEIsa0NBQW9COztJQUVwQiwrQ0FBMkI7Ozs7O0lBQ2YsNkJBQW9COzs7OztJQUFFLGlDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGltZXIsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBVcGxvYWRGaWxlIH0gZnJvbSAnLi91cGxvYWQtZmlsZS5tb2RlbCc7XG5pbXBvcnQgeyBVcGxvYWRFdmVudCB9IGZyb20gJy4vdXBsb2FkLWV2ZW50Lm1vZGVsJztcbmltcG9ydCB7XG4gIEZpbGVTeXN0ZW1GaWxlRW50cnksXG4gIEZpbGVTeXN0ZW1FbnRyeSxcbiAgRmlsZVN5c3RlbURpcmVjdG9yeUVudHJ5XG59IGZyb20gJy4vZG9tLnR5cGVzJztcbmltcG9ydCB7IFVwbG9hZGVyQ2FwdGlvbnMgfSBmcm9tICcuLi91cGxvYWRlci1jYXB0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZpbGUtZHJvcCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWxlLWRyb3AuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9maWxlLWRyb3AuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGaWxlQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KClcbiAgY2FwdGlvbnM6IFVwbG9hZGVyQ2FwdGlvbnM7XG4gIEBJbnB1dCgpXG4gIGN1c3RvbXN0eWxlOiBzdHJpbmcgPSBudWxsO1xuICBASW5wdXQoKVxuICBkaXNhYmxlSWYgPSBmYWxzZTtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uRmlsZURyb3A6IEV2ZW50RW1pdHRlcjxVcGxvYWRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIFVwbG9hZEV2ZW50XG4gID4oKTtcbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvbkZpbGVPdmVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KClcbiAgcHVibGljIG9uRmlsZUxlYXZlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHN0YWNrID0gW107XG4gIGZpbGVzOiBVcGxvYWRGaWxlW10gPSBbXTtcbiAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIGRyYWdvdmVyZmxhZyA9IGZhbHNlO1xuXG4gIGdsb2JhbERpc2FibGUgPSBmYWxzZTtcbiAgZ2xvYmFsU3RhcnQ6IEZ1bmN0aW9uO1xuICBnbG9iYWxFbmQ6IEZ1bmN0aW9uO1xuXG4gIG51bU9mQWN0aXZlUmVhZEVudHJpZXMgPSAwO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgaWYgKCF0aGlzLmN1c3RvbXN0eWxlKSB7XG4gICAgICB0aGlzLmN1c3RvbXN0eWxlID0gJ2Ryb3Atem9uZSc7XG4gICAgfVxuICAgIHRoaXMuZ2xvYmFsU3RhcnQgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnZHJhZ3N0YXJ0JywgZXZ0ID0+IHtcbiAgICAgIHRoaXMuZ2xvYmFsRGlzYWJsZSA9IHRydWU7XG4gICAgfSk7XG4gICAgdGhpcy5nbG9iYWxFbmQgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnZHJhZ2VuZCcsIGV2dCA9PiB7XG4gICAgICB0aGlzLmdsb2JhbERpc2FibGUgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuICBwdWJsaWMgb25EcmFnT3ZlcihldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZ2xvYmFsRGlzYWJsZSAmJiAhdGhpcy5kaXNhYmxlSWYpIHtcbiAgICAgIGlmICghdGhpcy5kcmFnb3ZlcmZsYWcpIHtcbiAgICAgICAgdGhpcy5kcmFnb3ZlcmZsYWcgPSB0cnVlO1xuICAgICAgICB0aGlzLm9uRmlsZU92ZXIuZW1pdChldmVudCk7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXZlbnRBbmRTdG9wKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25EcmFnTGVhdmUoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmdsb2JhbERpc2FibGUgJiYgIXRoaXMuZGlzYWJsZUlmKSB7XG4gICAgICBpZiAodGhpcy5kcmFnb3ZlcmZsYWcpIHtcbiAgICAgICAgdGhpcy5kcmFnb3ZlcmZsYWcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkZpbGVMZWF2ZS5lbWl0KGV2ZW50KTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJldmVudEFuZFN0b3AoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGRyb3BGaWxlcyhldmVudDogYW55KSB7XG4gICAgaWYgKCF0aGlzLmdsb2JhbERpc2FibGUgJiYgIXRoaXMuZGlzYWJsZUlmKSB7XG4gICAgICB0aGlzLmRyYWdvdmVyZmxhZyA9IGZhbHNlO1xuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSc7XG4gICAgICBsZXQgbGVuZ3RoO1xuICAgICAgaWYgKGV2ZW50LmRhdGFUcmFuc2Zlci5pdGVtcykge1xuICAgICAgICBsZW5ndGggPSBldmVudC5kYXRhVHJhbnNmZXIuaXRlbXMubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGVuZ3RoID0gZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgZW50cnk6IEZpbGVTeXN0ZW1FbnRyeTtcbiAgICAgICAgaWYgKGV2ZW50LmRhdGFUcmFuc2Zlci5pdGVtcykge1xuICAgICAgICAgIGlmIChldmVudC5kYXRhVHJhbnNmZXIuaXRlbXNbaV0ud2Via2l0R2V0QXNFbnRyeSkge1xuICAgICAgICAgICAgZW50cnkgPSBldmVudC5kYXRhVHJhbnNmZXIuaXRlbXNbaV0ud2Via2l0R2V0QXNFbnRyeSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzW2ldLndlYmtpdEdldEFzRW50cnkpIHtcbiAgICAgICAgICAgIGVudHJ5ID0gZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzW2ldLndlYmtpdEdldEFzRW50cnkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlbnRyeSkge1xuICAgICAgICAgIGNvbnN0IGZpbGU6IEZpbGUgPSBldmVudC5kYXRhVHJhbnNmZXIuZmlsZXNbaV07XG4gICAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGZha2VGaWxlRW50cnk6IEZpbGVTeXN0ZW1GaWxlRW50cnkgPSB7XG4gICAgICAgICAgICAgIG5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgICAgICAgaXNEaXJlY3Rvcnk6IGZhbHNlLFxuICAgICAgICAgICAgICBpc0ZpbGU6IHRydWUsXG4gICAgICAgICAgICAgIGZpbGU6IChjYWxsYmFjazogKGZpbGVhOiBGaWxlKSA9PiB2b2lkKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZmlsZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCB0b1VwbG9hZDogVXBsb2FkRmlsZSA9IG5ldyBVcGxvYWRGaWxlKFxuICAgICAgICAgICAgICBmYWtlRmlsZUVudHJ5Lm5hbWUsXG4gICAgICAgICAgICAgIGZha2VGaWxlRW50cnlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLmFkZFRvUXVldWUodG9VcGxvYWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoZW50cnkuaXNGaWxlKSB7XG4gICAgICAgICAgICBjb25zdCB0b1VwbG9hZDogVXBsb2FkRmlsZSA9IG5ldyBVcGxvYWRGaWxlKGVudHJ5Lm5hbWUsIGVudHJ5KTtcbiAgICAgICAgICAgIHRoaXMuYWRkVG9RdWV1ZSh0b1VwbG9hZCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChlbnRyeS5pc0RpcmVjdG9yeSkge1xuICAgICAgICAgICAgdGhpcy50cmF2ZXJzZUZpbGVUcmVlKGVudHJ5LCBlbnRyeS5uYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5wcmV2ZW50QW5kU3RvcChldmVudCk7XG5cbiAgICAgIGNvbnN0IHRpbWVyT2JzZXJ2YWJsZSA9IHRpbWVyKDIwMCwgMjAwKTtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGltZXJPYnNlcnZhYmxlLnN1YnNjcmliZSh0ID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZmlsZXMubGVuZ3RoID4gMCAmJiB0aGlzLm51bU9mQWN0aXZlUmVhZEVudHJpZXMgPT09IDApIHtcbiAgICAgICAgICB0aGlzLm9uRmlsZURyb3AuZW1pdChuZXcgVXBsb2FkRXZlbnQodGhpcy5maWxlcykpO1xuICAgICAgICAgIHRoaXMuZmlsZXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0cmF2ZXJzZUZpbGVUcmVlKGl0ZW06IEZpbGVTeXN0ZW1FbnRyeSwgcGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKGl0ZW0uaXNGaWxlKSB7XG4gICAgICBjb25zdCB0b1VwbG9hZDogVXBsb2FkRmlsZSA9IG5ldyBVcGxvYWRGaWxlKHBhdGgsIGl0ZW0pO1xuICAgICAgdGhpcy5maWxlcy5wdXNoKHRvVXBsb2FkKTtcbiAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnBvcFRvU3RhY2soKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnB1c2hUb1N0YWNrKHBhdGgpO1xuICAgICAgcGF0aCA9IHBhdGggKyAnLyc7XG4gICAgICBjb25zdCBkaXJSZWFkZXIgPSAoaXRlbSBhcyBGaWxlU3lzdGVtRGlyZWN0b3J5RW50cnkpLmNyZWF0ZVJlYWRlcigpO1xuICAgICAgbGV0IGVudHJpZXMgPSBbXTtcbiAgICAgIGNvbnN0IHRoaXNPYmogPSB0aGlzO1xuXG4gICAgICBjb25zdCByZWFkRW50cmllcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzT2JqLm51bU9mQWN0aXZlUmVhZEVudHJpZXMrKztcbiAgICAgICAgZGlyUmVhZGVyLnJlYWRFbnRyaWVzKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIGlmICghcmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gYWRkIGVtcHR5IGZvbGRlcnNcbiAgICAgICAgICAgIGlmIChlbnRyaWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICBjb25zdCB0b1VwbG9hZDogVXBsb2FkRmlsZSA9IG5ldyBVcGxvYWRGaWxlKHBhdGgsIGl0ZW0pO1xuICAgICAgICAgICAgICB0aGlzT2JqLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzT2JqLmFkZFRvUXVldWUodG9VcGxvYWQpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW50cmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXNPYmouem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpc09iai50cmF2ZXJzZUZpbGVUcmVlKGVudHJpZXNbaV0sIHBhdGggKyBlbnRyaWVzW2ldLm5hbWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzT2JqLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpc09iai5wb3BUb1N0YWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29udGludWUgd2l0aCB0aGUgcmVhZGluZ1xuICAgICAgICAgICAgZW50cmllcyA9IGVudHJpZXMuY29uY2F0KHJlcyk7XG4gICAgICAgICAgICByZWFkRW50cmllcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzT2JqLm51bU9mQWN0aXZlUmVhZEVudHJpZXMtLTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICByZWFkRW50cmllcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkVG9RdWV1ZShpdGVtOiBVcGxvYWRGaWxlKSB7XG4gICAgdGhpcy5maWxlcy5wdXNoKGl0ZW0pO1xuICB9XG5cbiAgcHVzaFRvU3RhY2soc3RyKSB7XG4gICAgdGhpcy5zdGFjay5wdXNoKHN0cik7XG4gIH1cblxuICBwb3BUb1N0YWNrKCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zdGFjay5wb3AoKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJRdWV1ZSgpIHtcbiAgICB0aGlzLmZpbGVzID0gW107XG4gIH1cblxuICBwcml2YXRlIHByZXZlbnRBbmRTdG9wKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgdGhpcy5nbG9iYWxTdGFydCgpO1xuICAgIHRoaXMuZ2xvYmFsRW5kKCk7XG4gIH1cbn1cbiJdfQ==