"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToWeightedGraph = exports.WeightedDirectedGraph = void 0;
const graph_addons_model_1 = require("./graph-addons.model");
const position_utils_1 = require("../utils/position.utils");
class WeightedDirectedGraph {
    constructor() {
        this.graphMap = new Map();
        this.reverseGraphMap = new Map();
    }
    addVertex(vertex) {
        this.graphMap.set(vertex.toIdString(), new Set());
        this.reverseGraphMap.set(vertex.toIdString(), new Set());
    }
    addEdge(startVertex, endVertex, weight) {
        //Check if start and endPoints exist
        //IMPORTANT EQUALS METHOD DOES NOT SEEM TO BE WORKING
        let possibleStartPoint = this.graphMap.get(startVertex.toIdString());
        let possibleEndPoint = this.graphMap.get(endVertex.toIdString());
        if (possibleStartPoint === undefined) {
            this.addVertex(startVertex);
        }
        if (possibleEndPoint === undefined) {
            this.addVertex(endVertex);
        }
        this.graphMap.get(startVertex.toIdString()).add(new graph_addons_model_1.Destination(endVertex, weight));
        this.reverseGraphMap.get(endVertex.toIdString()).add(new graph_addons_model_1.Destination(startVertex, weight));
    }
    findPath(algorithm, startVertex, endVertex) {
        return (algorithm.findPath(this.graphMap, startVertex, endVertex));
    }
    findBiPath(startVertex, endVertex, { biPathfinding }) {
        return biPathfinding(this.graphMap, this.reverseGraphMap, startVertex, endVertex);
    }
}
exports.WeightedDirectedGraph = WeightedDirectedGraph;
function convertToWeightedGraph(height, width, blockedPos) {
    let weightedGraph = new WeightedDirectedGraph();
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let currentPos = new position_utils_1.Position(i, j);
            let posAsString = currentPos.toIdString();
            if (blockedPos.has(posAsString))
                continue;
            let currentVertex = new graph_addons_model_1.Vertex(posAsString);
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
        let vertexToAdd = new graph_addons_model_1.Vertex(position.toIdString());
        if (!blockedPos.has(position.toIdString())) {
            output.push(vertexToAdd);
        }
    });
    return output;
}
