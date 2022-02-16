import {Destination, Vertex} from "../GraphAddons";

export class ResultOfPathfinding {
    private parentMap: Map<Vertex, Vertex>;
    private distanceMap: Map<Vertex, number>;
    private startVertex: Vertex;
    private endVertex: Vertex;
    constructor(parentMap: Map<Vertex, Vertex>, distanceMap: Map<Vertex, number>, startVertex: Vertex, endVertex: Vertex) {
        this.parentMap = parentMap;
        this.distanceMap = distanceMap;
        this.startVertex = startVertex;
        this.endVertex = endVertex;
    }


    toJSON() {
        return {}
    }

}


export interface Pathfinding {
    findPath(graphMap: Map<Vertex, Set<Destination>>, startVertex: Vertex, endVertex: Vertex): ResultOfPathfinding;
}