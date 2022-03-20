"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startBiPathfinding = void 0;
const parser_1 = require("../helpers/parser");
const graph_addons_model_1 = require("../../services/graph/graph-addons.model");
function startBiPathfinding(weightedGraph, startPoint, endPoint, biPathfinding) {
    return weightedGraph.findBiPath(new graph_addons_model_1.Vertex((0, parser_1.convertArrayToPos)(startPoint).toIdString()), new graph_addons_model_1.Vertex((0, parser_1.convertArrayToPos)(endPoint).toIdString()), biPathfinding);
}
exports.startBiPathfinding = startBiPathfinding;
