import {Destination, Vertex} from "./graph-addons.model";

import {Position} from "../utils/position.utils";
import {BiPathfindingFunction} from "./algorithms/bi-directional/bi-pathfiding.algorithm";
import {Pathfinding} from "./algorithms/uni-direcional/pathfiding.algorithm";



export class WeightedDirectedGraph {
    protected readonly graphMap: Map<string, Set<Destination>>;
    protected readonly reverseGraphMap: Map<string, Set<Destination>>

    constructor() {
        this.graphMap = new Map();
        this.reverseGraphMap = new Map();
    }

    addVertex(vertex: Vertex): void {
        this.graphMap.set(vertex.toIdString(), new Set())
        this.reverseGraphMap.set(vertex.toIdString(), new Set())
    }

    addEdge(startVertex: Vertex, endVertex: Vertex, weight: number): void {
        //Check if start and endPoints exist
        //IMPORTANT EQUALS METHOD DOES NOT SEEM TO BE WORKING
        let possibleStartPoint = this.graphMap.get(startVertex.toIdString())
        let possibleEndPoint = this.graphMap.get(endVertex.toIdString())
        if (possibleStartPoint === undefined) {
            this.addVertex(startVertex)
        }

        if (possibleEndPoint === undefined) {
            this.addVertex(endVertex)
        }

        this.graphMap.get(startVertex.toIdString())!.add(new Destination(endVertex, weight));
        this.reverseGraphMap.get(endVertex.toIdString())!.add(new Destination(startVertex, weight))
    }

    findPath(algorithm: Pathfinding, startVertex: Vertex, endVertex: Vertex) {
        return (algorithm.findPath(this.graphMap, startVertex, endVertex))
    }

    findBiPath(startVertex: Vertex, endVertex: Vertex, {biPathfinding}: BiPathfindingFunction) {
        return biPathfinding(this.graphMap, this.reverseGraphMap, startVertex, endVertex)

    }

}


export function convertToWeightedGraph(height: number, width: number, blockedPos: Set<string>) {
    let weightedGraph = new WeightedDirectedGraph()
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let currentPos = new Position(i, j)
            let posAsString = currentPos.toIdString()
            if (blockedPos.has(posAsString)) continue;
            let currentVertex = new Vertex(posAsString)
            getNeighboursOfPosition(blockedPos, currentPos, height, width).forEach((endVertex) => {
                weightedGraph.addEdge(currentVertex, endVertex, 1)
            })
            //Add all valid edges to weighted Graph
        }
    }
    return weightedGraph;
}

function getNeighboursOfPosition(blockedPos: Set<string>, currentPosition: Position, height: number, width: number): Vertex[] {
    let output: Vertex[] = []
    //Create Vertices
    let neighboursPosition: Position[] = currentPosition.getValidNeighbours(height, width)

    neighboursPosition.forEach((position) => {
        let vertexToAdd = new Vertex(position.toIdString())
        if (!blockedPos.has(position.toIdString())) {
            output.push(vertexToAdd)
        }
    })
    return output
}