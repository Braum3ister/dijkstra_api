"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const graph_model_1 = require("../../services/graph/graph.model");
const graph_addons_model_1 = require("../../services/graph/graph-addons.model");
const dijkstra_algorithm_1 = require("../../services/graph/algorithms/uni-direcional/dijkstra.algorithm");
const bi_dijkstra_algorithm_1 = require("../../services/graph/algorithms/bi-directional/bi-dijkstra.algorithm");
describe("Dijkstra Test", () => {
    let startVertex = new graph_addons_model_1.Vertex("start");
    let endVertex = new graph_addons_model_1.Vertex("end");
    let A = new graph_addons_model_1.Vertex("A");
    let B = new graph_addons_model_1.Vertex("B");
    let C = new graph_addons_model_1.Vertex("C");
    let D = new graph_addons_model_1.Vertex("D");
    let E = new graph_addons_model_1.Vertex("E");
    let F = new graph_addons_model_1.Vertex("F");
    let weightedGraph = setUpBasicGraph();
    function setUpBasicGraph() {
        const weightedGraph = new graph_model_1.WeightedDirectedGraph();
        weightedGraph.addEdge(startVertex, endVertex, 10);
        return weightedGraph;
    }
    function setUpAdvancedGraph() {
        let weightedGraph = new graph_model_1.WeightedDirectedGraph();
        weightedGraph.addEdge(A, B, 2);
        weightedGraph.addEdge(A, C, 4);
        weightedGraph.addEdge(B, C, 1);
        weightedGraph.addEdge(B, E, 2);
        weightedGraph.addEdge(B, D, 4);
        weightedGraph.addEdge(C, E, 3);
        weightedGraph.addEdge(D, F, 2);
        weightedGraph.addEdge(E, F, 2);
        weightedGraph.addEdge(E, D, 3);
        return weightedGraph;
    }
    it("One Edge Graph Dijkstra", () => {
        (0, chai_1.expect)(weightedGraph.findPath(new dijkstra_algorithm_1.DijkstraAlgorithm(), startVertex, endVertex).finalDistance).to.equal(10);
    });
    it("BiDijkstraGraph BasicGraph", () => {
        (0, chai_1.expect)(weightedGraph.findBiPath(startVertex, endVertex, {
            biPathfinding: bi_dijkstra_algorithm_1.findBiDijkstraPath
        }).distance).to.equal(10);
    });
    it("Advanced Graph Dijkstra", () => {
        let advancedGraph = setUpAdvancedGraph();
        (0, chai_1.expect)(advancedGraph.findPath(new dijkstra_algorithm_1.DijkstraAlgorithm(), A, F).finalDistance).to.equal(6);
    });
    it("Advance Graph BiDijkstra", () => {
        let advancedGraph = setUpAdvancedGraph();
        let output = advancedGraph.findBiPath(A, F, {
            biPathfinding: bi_dijkstra_algorithm_1.findBiDijkstraPath
        });
        (0, chai_1.expect)(output.distance).to.equal(6);
    });
    it("Crate matrix Graph Dijkstra", () => {
        let newWeightedGraph = (0, graph_model_1.convertToWeightedGraph)(10, 10, new Set());
        let startVertex = new graph_addons_model_1.Vertex("0,0");
        let endVertex = new graph_addons_model_1.Vertex("0,9");
        (0, chai_1.expect)(newWeightedGraph.findPath(new dijkstra_algorithm_1.DijkstraAlgorithm(), startVertex, endVertex).finalDistance)
            .to.equal(9);
    });
    it("Advanced BiDijstra Test", () => {
        let newWeightedGraph = (0, graph_model_1.convertToWeightedGraph)(20, 20, new Set());
        let startVertex = new graph_addons_model_1.Vertex("1,2");
        let endVertex = new graph_addons_model_1.Vertex("15,8");
        let output = newWeightedGraph.findBiPath(startVertex, endVertex, {
            biPathfinding: bi_dijkstra_algorithm_1.findBiDijkstraPath
        });
        (0, chai_1.expect)(output.distance).to.equal(20);
        console.log(findBiggestElement(output.backwardDistanceMap));
        console.log(findBiggestElement(output.forwardDistanceMap));
    });
    it("Really Big Test", () => {
        let weightedGraph = (0, graph_model_1.convertToWeightedGraph)(100, 200, new Set());
        let startVertex = new graph_addons_model_1.Vertex("12,42");
        let endVertex = new graph_addons_model_1.Vertex("88,199");
        let output = weightedGraph.findBiPath(startVertex, endVertex, {
            biPathfinding: bi_dijkstra_algorithm_1.findBiDijkstraPath
        });
        (0, chai_1.expect)(output.distance).to.equal(233);
    });
});
const findBiggestElement = (map) => {
    let biggestElement = 0;
    for (let value of map.values()) {
        if (value > biggestElement) {
            biggestElement = value;
        }
    }
    return biggestElement;
};
