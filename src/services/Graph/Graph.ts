import {Destination, Vertex} from "./GraphAddons";
import {Pathfinding} from "./Algorithms/Pathfinding";


class WeightedGraph {
    private graphMap: Map<Vertex, Set<Destination>>;

    constructor() {
        this.graphMap = new Map();
    }

    addVertex(vertex: Vertex): void {
        this.graphMap.set(vertex, new Set())
    }

    addEdge(startVertex: Vertex, endVertex: Vertex, weight: number): void {
        //Check if start and endPoints exist
        let possibleStartPoint = this.graphMap.get(startVertex)
        let possibleEndPoint = this.graphMap.get(endVertex)
        //TODO: Maybe throw an exception
        if (possibleStartPoint === undefined || possibleEndPoint === undefined) return;
        possibleStartPoint.add(new Destination(endVertex, weight));
    }

    findPath(algorithm: Pathfinding, startVertex: Vertex, endVertex: Vertex): string {
        return JSON.stringify(algorithm.findPath(this.graphMap, startVertex, endVertex))
    }
}