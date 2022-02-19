"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDijkstra = void 0;
const Graph_1 = require("../services/Graph/Graph");
const Postion_1 = require("../services/utils/Postion");
const DijkstraAlgorithm_1 = require("../services/Graph/Algorithms/DijkstraAlgorithm");
const GraphAddons_1 = require("../services/Graph/GraphAddons");
/**
 * Verifies the input and sends a bad request if invalid, if not it
 * initializes the calculation of dijkstra
 * @param req
 * @param res
 */
function startDijkstra(req, res) {
    let height = req.body.height;
    let width = req.body.width;
    let startPoint = req.body.startPoint;
    let endPoint = req.body.endPoint;
    let walls = req.body.walls;
    let weightedGraph = (0, Graph_1.convertToWeightedGraph)(height, width, convertWalls(walls));
    let output = weightedGraph.findPath(new DijkstraAlgorithm_1.DijkstraAlgorithm(), new GraphAddons_1.Vertex(convertArrayToPos(startPoint).toIdString()), new GraphAddons_1.Vertex(convertArrayToPos(endPoint).toIdString()));
    res.send(JSON.stringify(output));
}
exports.startDijkstra = startDijkstra;
let convertWalls = (walls) => {
    let posOutputAsString = new Set();
    walls.forEach((pos) => {
        posOutputAsString.add(convertArrayToPos(pos).toIdString());
    });
    return posOutputAsString;
};
let convertArrayToPos = (posAsArray) => {
    return new Postion_1.Position(posAsArray[0], posAsArray[1]);
};
