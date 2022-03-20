"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeWeightedGraph = exports.convertArrayToPos = exports.convertWalls = void 0;
const position_utils_1 = require("../../services/utils/position.utils");
const graph_model_1 = require("../../services/graph/graph.model");
let convertWalls = (walls) => {
    let posOutputAsString = new Set();
    walls.forEach((pos) => {
        posOutputAsString.add((0, exports.convertArrayToPos)(pos).toIdString());
    });
    return posOutputAsString;
};
exports.convertWalls = convertWalls;
let convertArrayToPos = (posAsArray) => {
    return new position_utils_1.Position(posAsArray[0], posAsArray[1]);
};
exports.convertArrayToPos = convertArrayToPos;
const makeWeightedGraph = (req) => {
    let height = req.body.height;
    let width = req.body.width;
    let walls = req.body.walls;
    return (0, graph_model_1.convertToWeightedGraph)(height, width, (0, exports.convertWalls)(walls));
};
exports.makeWeightedGraph = makeWeightedGraph;
