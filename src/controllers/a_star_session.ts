import {Request, Response} from "express"
import {convertToWeightedGraph} from "../services/Graph/Graph";
import {Position} from "../services/utils/Postion";
import {AStarAlgorithm} from "../services/Graph/Algorithms/AStarAlgorithm";
import {Vertex} from "../services/Graph/GraphAddons";

/**
 * Verifies the input and sends a bad request if invalid, if not it
 * initializes the calculation of dijkstra
 * @param req
 * @param res
 */
export function startAStar(req: Request, res: Response): void {
    let height: number = req.body.height
    let width: number = req.body.width
    let startPoint = req.body.startPoint
    let endPoint = req.body.endPoint
    let walls = req.body.walls
    let weightedGraph = convertToWeightedGraph(height, width, convertWalls(walls))
    let output = weightedGraph.findPath(new AStarAlgorithm(), new Vertex(convertArrayToPos(startPoint).toIdString()),
        new Vertex(convertArrayToPos(endPoint).toIdString()));
    res.send(JSON.stringify(output))
}

let convertWalls = (walls: number[][]) => {
    let posOutputAsString: Set<string> = new Set()
    walls.forEach( (pos) => {
        posOutputAsString.add(convertArrayToPos(pos).toIdString())
    })
    return posOutputAsString;
}

let convertArrayToPos = (posAsArray: number[]): Position => {
    return new Position(posAsArray[0], posAsArray[1])
}