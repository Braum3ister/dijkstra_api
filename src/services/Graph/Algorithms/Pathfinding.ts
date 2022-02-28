import {Destination, Vertex} from "../GraphAddons";


export class ResultOfPathfinding {
    private readonly parentMap: Map<string, null>;
    private readonly distanceMap: Map<string, number>;
    private readonly startVertex: Vertex;
    private readonly endVertex: string;
    private readonly _finalDistance: number;

    constructor(parentMap: Map<string, string>, distanceMap: Map<string, number>, startVertex: Vertex, endVertex: Vertex) {
        this.distanceMap = distanceMap;
        this.startVertex = startVertex;
        this.endVertex = endVertex.toIdString();
        this._finalDistance = distanceMap.get(endVertex.toIdString())!
        this.parentMap = this.parseParentMap(parentMap)
    }


    get finalDistance(): number {
        return this._finalDistance;
    }

    parseParentMap(parentMap: Map<string, string>): Map<string, null> {
        let output: Map<string, null> = new Map()
        let current: string = this.endVertex;
        while (current != undefined) {
            output.set(current, null)
            current = parentMap.get(current)!
        }
        return output;
    }


    toJSON() {

        return {
            start: this.startVertex,
            end: this.endVertex,
            distance: this.finalDistance,
            distanceMap: Object.fromEntries(this.distanceMap),
            path: Object.fromEntries(this.parentMap)
        }
    }
}


export interface Pathfinding {
    findPath(graphMap: Map<string, Set<Destination>>, startVertex: Vertex, endVertex: Vertex): ResultOfPathfinding;
}
