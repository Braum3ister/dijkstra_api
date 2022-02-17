import {Destination, Vertex} from "./GraphAddons";
import {Pathfinding} from "./Algorithms/Pathfinding";


export class WeightedDirectedGraph {
    private readonly graphMap: Map<Vertex, Set<Destination>>;

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