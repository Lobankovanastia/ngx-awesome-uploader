/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function FileSystemEntry() { }
if (false) {
    /** @type {?} */
    FileSystemEntry.prototype.name;
    /** @type {?} */
    FileSystemEntry.prototype.isDirectory;
    /** @type {?} */
    FileSystemEntry.prototype.isFile;
}
/**
 * @record
 */
export function FileSystemEntryMetadata() { }
if (false) {
    /** @type {?|undefined} */
    FileSystemEntryMetadata.prototype.modificationTime;
    /** @type {?|undefined} */
    FileSystemEntryMetadata.prototype.size;
}
/**
 * @record
 */
export function FileSystemDirectoryReader() { }
if (false) {
    /**
     * @param {?} successCallback
     * @param {?=} errorCallback
     * @return {?}
     */
    FileSystemDirectoryReader.prototype.readEntries = function (successCallback, errorCallback) { };
}
/**
 * @record
 */
export function FileSystemFlags() { }
if (false) {
    /** @type {?|undefined} */
    FileSystemFlags.prototype.create;
    /** @type {?|undefined} */
    FileSystemFlags.prototype.exclusive;
}
/**
 * @record
 */
export function FileSystemDirectoryEntry() { }
if (false) {
    /** @type {?} */
    FileSystemDirectoryEntry.prototype.isDirectory;
    /** @type {?} */
    FileSystemDirectoryEntry.prototype.isFile;
    /**
     * @return {?}
     */
    FileSystemDirectoryEntry.prototype.createReader = function () { };
    /**
     * @param {?=} path
     * @param {?=} options
     * @param {?=} successCallback
     * @param {?=} errorCallback
     * @return {?}
     */
    FileSystemDirectoryEntry.prototype.getFile = function (path, options, successCallback, errorCallback) { };
    /**
     * @param {?=} path
     * @param {?=} options
     * @param {?=} successCallback
     * @param {?=} errorCallback
     * @return {?}
     */
    FileSystemDirectoryEntry.prototype.getDirectory = function (path, options, successCallback, errorCallback) { };
}
/**
 * @record
 */
export function FileSystemFileEntry() { }
if (false) {
    /** @type {?} */
    FileSystemFileEntry.prototype.isDirectory;
    /** @type {?} */
    FileSystemFileEntry.prototype.isFile;
    /**
     * @param {?} callback
     * @return {?}
     */
    FileSystemFileEntry.prototype.file = function (callback) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLnR5cGVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF3ZXNvbWUtdXBsb2FkZXIvIiwic291cmNlcyI6WyJsaWIvZmlsZS1kcm9wL2RvbS50eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0EscUNBSUM7OztJQUhDLCtCQUFhOztJQUNiLHNDQUFxQjs7SUFDckIsaUNBQWdCOzs7OztBQUdsQiw2Q0FHQzs7O0lBRkMsbURBQXdCOztJQUN4Qix1Q0FBYzs7Ozs7QUFHaEIsK0NBS0M7Ozs7Ozs7SUFKQyxnR0FHUTs7Ozs7QUFHVixxQ0FHQzs7O0lBRkMsaUNBQWlCOztJQUNqQixvQ0FBb0I7Ozs7O0FBR3RCLDhDQWdCQzs7O0lBZkMsK0NBQWtCOztJQUNsQiwwQ0FBYzs7OztJQUNkLGtFQUEwQzs7Ozs7Ozs7SUFDMUMsMEdBS1E7Ozs7Ozs7O0lBQ1IsK0dBS1E7Ozs7O0FBR1YseUNBSUM7OztJQUhDLDBDQUFtQjs7SUFDbkIscUNBQWE7Ozs7O0lBQ2IsNkRBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVTeXN0ZW1FbnRyeSB7XG4gIG5hbWU6IHN0cmluZztcbiAgaXNEaXJlY3Rvcnk6IGJvb2xlYW47XG4gIGlzRmlsZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWxlU3lzdGVtRW50cnlNZXRhZGF0YSB7XG4gIG1vZGlmaWNhdGlvblRpbWU/OiBEYXRlO1xuICBzaXplPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVTeXN0ZW1EaXJlY3RvcnlSZWFkZXIge1xuICByZWFkRW50cmllcyhcbiAgICBzdWNjZXNzQ2FsbGJhY2s6IChyZXN1bHQ6IEZpbGVTeXN0ZW1FbnRyeVtdKSA9PiB2b2lkLFxuICAgIGVycm9yQ2FsbGJhY2s/OiAoZXJyb3I6IERPTUVycm9yKSA9PiB2b2lkLFxuICApOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVTeXN0ZW1GbGFncyB7XG4gIGNyZWF0ZT86IGJvb2xlYW47XG4gIGV4Y2x1c2l2ZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsZVN5c3RlbURpcmVjdG9yeUVudHJ5IGV4dGVuZHMgRmlsZVN5c3RlbUVudHJ5IHtcbiAgaXNEaXJlY3Rvcnk6IHRydWU7XG4gIGlzRmlsZTogZmFsc2U7XG4gIGNyZWF0ZVJlYWRlcigpOiBGaWxlU3lzdGVtRGlyZWN0b3J5UmVhZGVyO1xuICBnZXRGaWxlKFxuICAgIHBhdGg/OiBzdHJpbmcsXG4gICAgb3B0aW9ucz86IEZpbGVTeXN0ZW1GbGFncyxcbiAgICBzdWNjZXNzQ2FsbGJhY2s/OiAocmVzdWx0OiBGaWxlU3lzdGVtRmlsZUVudHJ5KSA9PiB2b2lkLFxuICAgIGVycm9yQ2FsbGJhY2s/OiAoZXJyb3I6IERPTUVycm9yKSA9PiB2b2lkLFxuICApOiB2b2lkO1xuICBnZXREaXJlY3RvcnkoXG4gICAgcGF0aD86IHN0cmluZyxcbiAgICBvcHRpb25zPzogRmlsZVN5c3RlbUZsYWdzLFxuICAgIHN1Y2Nlc3NDYWxsYmFjaz86IChyZXN1bHQ6IEZpbGVTeXN0ZW1EaXJlY3RvcnlFbnRyeSkgPT4gdm9pZCxcbiAgICBlcnJvckNhbGxiYWNrPzogKGVycm9yOiBET01FcnJvcikgPT4gdm9pZCxcbiAgKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWxlU3lzdGVtRmlsZUVudHJ5IGV4dGVuZHMgRmlsZVN5c3RlbUVudHJ5IHtcbiAgaXNEaXJlY3Rvcnk6IGZhbHNlO1xuICBpc0ZpbGU6IHRydWU7XG4gIGZpbGUoY2FsbGJhY2s6IChmaWxlOiBGaWxlKSA9PiB2b2lkKTogdm9pZDtcbn1cbiJdfQ==