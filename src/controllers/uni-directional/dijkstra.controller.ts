import {Request, Response} from "express"


import {DijkstraAlgorithm} from "../../services/graph/algorithms/uni-direcional/dijkstra.algorithm";
import {makeWeightedGraph} from "../helpers/parser";
import {startPathfinding} from "./pathfinding.controller";

/**
 * Verifies the input and sends a bad request if invalid, if not it
 * initializes the calculation of dijkstra
 * @param req
 * @param res
 */
export function startDijkstra(req: Request, res: Response): void {
    let startPoint = req.body.startPoint
    let endPoint = req.body.endPoint
    let weightedGraph = makeWeightedGraph(req)
    res.send(JSON.stringify(startPathfinding(weightedGraph, startPoint, endPoint, new DijkstraAlgorithm())))
}

