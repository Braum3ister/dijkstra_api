import {Destination, Vertex} from "./GraphAddons";
import {Pathfinding} from "./Algorithms/Pathfinding";


export class WeightedDirectedGraph {
    protected readonly graphMap: Map<Vertex, Set<Destination>>;

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
        if (possibleStartPoint === undefined) {
            this.addVertex(startVertex)
        }

        if (possibleEndPoint === undefined) {
            this.addVertex(endVertex)
        }

        this.graphMap.get(startVertex)!.add(new Destination(endVertex, weight));
    }

    findPath(algorithm: Pathfinding, startVertex: Vertex, endVertex: Vertex){
        return (algorithm.findPath(this.graphMap, startVertex, endVertex))
    }
}

export class WeightedUndirectedGraph extends WeightedDirectedGraph {
    addEdge(vertex1: Vertex, vertex2:Vertex, weight:number) {
        super.addEdge(vertex1, vertex2, weight)
        super.addEdge(vertex2, vertex1, weight)
    }

}