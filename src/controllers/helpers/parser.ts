import {Position} from "../../services/utils/Postion";
import {Request} from "express";
import {convertToWeightedGraph} from "../../services/Graph/Graph";

export let convertWalls = (walls: number[][]) => {
    let posOutputAsString: Set<string> = new Set()
    walls.forEach( (pos) => {
        posOutputAsString.add(convertArrayToPos(pos).toIdString())
    })
    return posOutputAsString;
}

export let convertArrayToPos = (posAsArray: number[]): Position => {
    return new Position(posAsArray[0], posAsArray[1])
}

export const makeWeightedGraph = (req: Request) => {
    let height: number = req.body.height
    let width: number = req.body.width
    let walls = req.body.walls
    return convertToWeightedGraph(height, width, convertWalls(walls))

}