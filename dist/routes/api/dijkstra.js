"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dijkstra_session_1 = require("../../controllers/dijkstra_session");
const DijkstraSchema_1 = require("../../middleware/validateSchema/DijkstraSchema");
const ValidateRequest_1 = require("../../middleware/ValidateRequest");
const router = (0, express_1.Router)();
router.route("/").post(DijkstraSchema_1.dijkstraSchema2D, ValidateRequest_1.validateRequestDijkstra, dijkstra_session_1.startDijkstra).get((req, res) => res.sendStatus(200));
router.get("/dij", ((req, res) => {
    res.send("res");
}));
module.exports = router;
