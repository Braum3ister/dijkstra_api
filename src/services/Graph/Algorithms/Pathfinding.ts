import {Destination, Vertex} from "../GraphAddons";


export class ResultOfPathfinding {
    private parentMap: Map<Vertex, Vertex>;
    private readonly distanceMap: Map<string, number>;
    private readonly startVertex: Vertex;
    private readonly endVertex: Vertex;
    private readonly _finalDistance: number;

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

    toJSON() {
        return {
            start: this.startVertex,
            end: this.endVertex,
            distance: this.finalDistance,
            distanceMap: Object.fromEntries(this.distanceMap)
        }
    }
}


export interface Pathfinding {
    findPath(graphMap: Map<string, Set<Destination>>, startVertex: Vertex, endVertex: Vertex): ResultOfPathfinding;
}
