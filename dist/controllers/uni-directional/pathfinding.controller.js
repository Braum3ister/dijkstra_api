"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startPathfinding = void 0;
const parser_1 = require("../helpers/parser");
const graph_addons_model_1 = require("../../services/graph/graph-addons.model");
function startPathfinding(weightedGraph, startPoint, endPoint, algorithm) {
    return weightedGraph.findPath(algorithm, new graph_addons_model_1.Vertex((0, parser_1.convertArrayToPos)(startPoint).toIdString()), new graph_addons_model_1.Vertex((0, parser_1.convertArrayToPos)(endPoint).toIdString()));
}
exports.startPathfinding = startPathfinding;
