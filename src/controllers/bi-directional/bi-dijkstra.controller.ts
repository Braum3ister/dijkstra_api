import {Request, Response} from "express"


import {makeWeightedGraph} from "../helpers/parser";
import {startBiPathfinding} from "./bi-pathfiding.controller";
import {findBiDijkstraPath} from "../../services/graph/algorithms/bi-directional/bi-dijkstra.algorithm";



export function startBiDijkstra(req: Request, res: Response): void {
    let startPoint: number[] = req.body.startPoint
    let endPoint: number[] = req.body.endPoint
    let weightedGraph = makeWeightedGraph(req)
    res.send(JSON.stringify(startBiPathfinding(weightedGraph, startPoint, endPoint, {
        biPathfinding: findBiDijkstraPath
    })))
}
