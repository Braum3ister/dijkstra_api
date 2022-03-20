"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const validata_request_middleware_1 = require("../../middleware/validata-request.middleware");
const dijkstra_schema_1 = require("../../middleware/validate-schema/dijkstra-schema");
const bi_a_star_controller_1 = require("../../controllers/bi-directional/bi-a-star.controller");
exports.router = (0, express_1.Router)();
exports.router.route("/")
    .post(dijkstra_schema_1.pathfindingScheme2D, validata_request_middleware_1.validateRequestPathfinding, bi_a_star_controller_1.startBiAStar)
    .get((req, res) => res.sendStatus(http_status_codes_1.StatusCodes.OK));
