"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotUsableException = exports.InvalidArgumentException = void 0;
class InvalidArgumentException extends Error {
    constructor(message) {
        super(message);
        this.name = InvalidArgumentException.NAME;
    }
}
exports.InvalidArgumentException = InvalidArgumentException;
InvalidArgumentException.NAME = "Invalid Argument Exception";
class NotUsableException extends Error {
    constructor(message = "Not all requirements are fulfilled") {
        super(message);
        this.name = NotUsableException.NAME;
    }
}
exports.NotUsableException = NotUsableException;
NotUsableException.NAME = "Not usable Exception";
