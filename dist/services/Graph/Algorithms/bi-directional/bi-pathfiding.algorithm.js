"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultOfBiPathfinding = void 0;
class ResultOfBiPathfinding {
    constructor(parentMapForward, parentMapBackward, forwardDistanceMap, backwardDistanceMap, startVertex, endVertex, distance, halfWayPoint) {
        this._forwardDistanceMap = forwardDistanceMap;
        this._backwardDistanceMap = backwardDistanceMap;
        this._startVertex = startVertex;
        this._endVertex = endVertex;
        this._distance = distance;
        this._halfWayPoint = halfWayPoint;
        this._parentMap = this.parseParentMap(parentMapForward, parentMapBackward);
    }
    get forwardDistanceMap() {
        return this._forwardDistanceMap;
    }
    get backwardDistanceMap() {
        return this._backwardDistanceMap;
    }
    get startVertex() {
        return this._startVertex;
    }
    get endVertex() {
        return this._endVertex;
    }
    parseParentMap(parentMapForward, parentMapBackward) {
        let output = new Map();
        let currentForward = this._halfWayPoint.toIdString();
        while (currentForward != undefined) {
            output.set(currentForward, null);
            currentForward = parentMapForward.get(currentForward);
        }
        let currentBackward = this._halfWayPoint.toIdString();
        while (currentBackward != undefined) {
            output.set(currentBackward, null);
            currentBackward = parentMapBackward.get(currentBackward);
        }
        return output;
    }
    get distance() {
        return this._distance;
    }
    toJSON() {
        return {
            start: this._startVertex,
            end: this._endVertex,
            distance: this.distance,
            forwardDistanceMap: Object.fromEntries(this._forwardDistanceMap),
            backwardDistanceMap: Object.fromEntries(this._backwardDistanceMap),
            path: Object.fromEntries(this._parentMap)
        };
    }
}
exports.ResultOfBiPathfinding = ResultOfBiPathfinding;
