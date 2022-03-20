"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultOfPathfinding = void 0;
class ResultOfPathfinding {
    constructor(parentMap, distanceMap, startVertex, endVertex) {
        this.distanceMap = distanceMap;
        this.startVertex = startVertex;
        this.endVertex = endVertex.toIdString();
        this._finalDistance = distanceMap.get(endVertex.toIdString());
        this.parentMap = this.parseParentMap(parentMap);
    }
    get finalDistance() {
        return this._finalDistance;
    }
    parseParentMap(parentMap) {
        let output = new Map();
        let current = this.endVertex;
        while (current != undefined) {
            output.set(current, null);
            current = parentMap.get(current);
        }
        return output;
    }
    toJSON() {
        return {
            distance: this.finalDistance,
            distanceMap: Object.fromEntries(this.distanceMap),
            path: Object.fromEntries(this.parentMap)
        };
    }
}
exports.ResultOfPathfinding = ResultOfPathfinding;
