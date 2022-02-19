"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dijkstraRoute = require("./api/dijkstra");
const apiRouter = (0, express_1.Router)();
apiRouter.use("/dijkstra", dijkstraRoute);
module.exports = apiRouter;
