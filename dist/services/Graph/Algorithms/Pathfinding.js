"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultOfPathfinding = void 0;
class ResultOfPathfinding {
    constructor(parentMap, distanceMap, startVertex, endVertex) {
        this.parentMap = parentMap;
        this.distanceMap = distanceMap;
        this.startVertex = startVertex;
        this.endVertex = endVertex;
        this._finalDistance = distanceMap.get(endVertex.toIdString());
    }
    get finalDistance() {
        return this._finalDistance;
    }
    toJSON() {
        return {
            start: this.startVertex,
            end: this.endVertex,
            distance: this.finalDistance,
            distanceMap: Object.fromEntries(this.distanceMap)
        };
    }
}
exports.ResultOfPathfinding = ResultOfPathfinding;
