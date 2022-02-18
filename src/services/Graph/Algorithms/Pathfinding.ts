import {Destination, Vertex} from "../GraphAddons";

export class ResultOfPathfinding {
    private parentMap: Map<Vertex, Vertex>;
    private distanceMap: Map<string, number>;
    private startVertex: Vertex;
    private endVertex: Vertex;
    private _finalDistance: number;

    constructor(parentMap: Map<Vertex, Vertex>, distanceMap: Map<string, number>, startVertex: Vertex, endVertex: Vertex) {
        this.parentMap = parentMap;
        this.distanceMap = distanceMap;
        this.startVertex = startVertex;
        this.endVertex = endVertex;
        this._finalDistance = distanceMap.get(endVertex.toIdString())!
    }


    get finalDistance(): number {
        return this._finalDistance;
    }
}


export interface Pathfinding {
    findPath(graphMap: Map<string, Set<Destination>>, startVertex: Vertex, endVertex: Vertex): ResultOfPathfinding;
}