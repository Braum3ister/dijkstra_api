"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const dijkstra_session_1 = require("../../controllers/dijkstra_session");
const DijkstraSchema_1 = require("../../middleware/validateSchema/DijkstraSchema");
const ValidateRequest_1 = require("../../middleware/ValidateRequest");
exports.router = (0, express_1.Router)();
exports.router.route("/")
    .post(DijkstraSchema_1.pathfindingScheme2D, ValidateRequest_1.validateRequestPathfinding, dijkstra_session_1.startDijkstra)
    .get((req, res) => res.sendStatus(200));
