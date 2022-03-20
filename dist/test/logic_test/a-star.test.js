"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const graph_model_1 = require("../../services/graph/graph.model");
const graph_addons_model_1 = require("../../services/graph/graph-addons.model");
const a_star_algorithm_1 = require("../../services/graph/algorithms/uni-direcional/a-star.algorithm");
describe("AStarAlgorithm Test", () => {
    it("Crate matrix Graph Dijkstra", () => {
        let newWeightedGraph = (0, graph_model_1.convertToWeightedGraph)(10, 10, new Set());
        let startVertex = new graph_addons_model_1.Vertex("0,0");
        let endVertex = new graph_addons_model_1.Vertex("0,9");
        (0, chai_1.expect)(newWeightedGraph.findPath(new a_star_algorithm_1.AStarAlgorithm(), startVertex, endVertex).finalDistance).to.equal(9);
    });
});
