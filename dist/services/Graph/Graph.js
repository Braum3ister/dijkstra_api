"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToWeightedGraph = exports.WeightedUndirectedGraph = exports.WeightedDirectedGraph = void 0;
const GraphAddons_1 = require("./GraphAddons");
const Postion_1 = require("../utils/Postion");
class WeightedDirectedGraph {
    constructor() {
        this.graphMap = new Map();
    }
    addVertex(vertex) {
        this.graphMap.set(vertex.toIdString(), new Set());
    }
    addEdge(startVertex, endVertex, weight) {
        //Check if start and endPoints exist
        //IMPORTANT EQUALS METHOD NOT BE WORKING
        let possibleStartPoint = this.graphMap.get(startVertex.toIdString());
        let possibleEndPoint = this.graphMap.get(endVertex.toIdString());
        if (possibleStartPoint === undefined) {
            this.addVertex(startVertex);
        }
        if (possibleEndPoint === undefined) {
            this.addVertex(endVertex);
        }
        this.graphMap.get(startVertex.toIdString()).add(new GraphAddons_1.Destination(endVertex, weight));
    }
    findPath(algorithm, startVertex, endVertex) {
        return (algorithm.findPath(this.graphMap, startVertex, endVertex));
    }
}
exports.WeightedDirectedGraph = WeightedDirectedGraph;
class WeightedUndirectedGraph extends WeightedDirectedGraph {
    addEdge(vertex1, vertex2, weight) {
        super.addEdge(vertex1, vertex2, weight);
        super.addEdge(vertex2, vertex1, weight);
    }
}
exports.WeightedUndirectedGraph = WeightedUndirectedGraph;
function convertToWeightedGraph(height, width, blockedPos) {
    let weightedGraph = new WeightedDirectedGraph();
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let currentPos = new Postion_1.Position(i, j);
            let posAsString = currentPos.toIdString();
            if (blockedPos.has(posAsString))
                continue;
            let currentVertex = new GraphAddons_1.Vertex(posAsString);
            getNeighboursOfPosition(blockedPos, currentPos, height, width).forEach((endVertex) => {
                weightedGraph.addEdge(currentVertex, endVertex, 1);
            });
            //Add all valid edges to weighted Graph
        }
    }
    return weightedGraph;
}
exports.convertToWeightedGraph = convertToWeightedGraph;
function getNeighboursOfPosition(blockedPos, currentPosition, height, width) {
    let output = [];
    //Create Vertices
    let neighboursPosition = currentPosition.getValidNeighbours(height, width);
    neighboursPosition.forEach((position) => {
        let vertexToAdd = new GraphAddons_1.Vertex(position.toIdString());
        if (!blockedPos.has(position.toIdString())) {
            output.push(vertexToAdd);
        }
    });
    return output;
}
