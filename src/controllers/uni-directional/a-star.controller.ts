import {Request, Response} from "express"
import {AStarAlgorithm} from "../../services/graph/algorithms/uni-direcional/AStarAlgorithm";
import {makeWeightedGraph} from "../helpers/parser";
import {startPathfinding} from "./pathfinding.controller";

/**
 * Verifies the input and sends a bad request if invalid, if not it
 * initializes the calculation of dijkstra
 * @param req
 * @param res
 */
export function startAStar(req: Request, res: Response): void {
    let startPoint = req.body.startPoint
    let endPoint = req.body.endPoint
    let weightedGraph = makeWeightedGraph(req)
    res.send(JSON.stringify(startPathfinding(weightedGraph, startPoint, endPoint, new AStarAlgorithm())))
}


