import {Request, Response} from "express"


import {makeWeightedGraph} from "./helpers/parser";
import {startBiPathfinding} from "./bi_pathfinding";
import {findBiAStar} from "../services/Graph/Algorithms/bidirectional/BiAStar";




export function startBiAStar(req: Request, res: Response): void {
    let startPoint: number[] = req.body.startPoint
    let endPoint: number[] = req.body.endPoint
    let weightedGraph = makeWeightedGraph(req)
    res.send(JSON.stringify(startBiPathfinding(weightedGraph, startPoint, endPoint, {
        biPathfinding: findBiAStar
    })))
}