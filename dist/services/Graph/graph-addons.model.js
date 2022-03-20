"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Destination = exports.Vertex = void 0;
class Vertex {
    constructor(name) {
        this.name = name;
    }
    toJSON() {
        return {
            name: this.name
        };
    }
    toIdString() {
        return this.name;
    }
}
exports.Vertex = Vertex;
class Destination {
    constructor(endVertex, weight) {
        this._endVertex = endVertex;
        this._weight = weight;
    }
    get endVertex() {
        return this._endVertex;
    }
    get weight() {
        return this._weight;
    }
}
exports.Destination = Destination;
