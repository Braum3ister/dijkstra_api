"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startBiAStar = void 0;
const parser_1 = require("../helpers/parser");
const bi_pathfiding_controller_1 = require("./bi-pathfiding.controller");
const bi_a_star_algorithm_1 = require("../../services/graph/algorithms/bi-directional/bi-a-star.algorithm");
function startBiAStar(req, res) {
    let startPoint = req.body.startPoint;
    let endPoint = req.body.endPoint;
    let weightedGraph = (0, parser_1.makeWeightedGraph)(req);
    res.send(JSON.stringify((0, bi_pathfiding_controller_1.startBiPathfinding)(weightedGraph, startPoint, endPoint, {
        biPathfinding: bi_a_star_algorithm_1.findBiAStar
    })));
}
exports.startBiAStar = startBiAStar;
