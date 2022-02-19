"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralSet = void 0;
class GeneralSet {
    constructor() {
        this.map = new Map();
    }
    add(item) {
        this.map.set(item.toIdString(), item);
    }
    values() {
        return this.map.values();
    }
    delete(item) {
        return this.map.delete(item.toIdString());
    }
    contains(item) {
        return this.map.get(item.toIdString()) !== undefined;
    }
}
exports.GeneralSet = GeneralSet;
