"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAStar = void 0;
const a_star_algorithm_1 = require("../../services/graph/algorithms/uni-direcional/a-star.algorithm");
const parser_1 = require("../helpers/parser");
const pathfinding_controller_1 = require("./pathfinding.controller");
/**
 * Verifies the input and sends a bad request if invalid, if not it
 * initializes the calculation of dijkstra
 * @param req
 * @param res
 */
function startAStar(req, res) {
    let startPoint = req.body.startPoint;
    let endPoint = req.body.endPoint;
    let weightedGraph = (0, parser_1.makeWeightedGraph)(req);
    res.send(JSON.stringify((0, pathfinding_controller_1.startPathfinding)(weightedGraph, startPoint, endPoint, new a_star_algorithm_1.AStarAlgorithm())));
}
exports.startAStar = startAStar;
