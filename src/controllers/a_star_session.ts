import {Request, Response} from "express"
import {AStarAlgorithm} from "../services/Graph/Algorithms/unidirecional/AStarAlgorithm";
import {makeWeightedGraph} from "./helpers/parser";
import {startPathfinding} from "./pathfinding";

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


