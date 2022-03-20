import {convertArrayToPos} from "../helpers/parser";
import {Vertex} from "../../services/Graph/GraphAddons";
import {Pathfinding} from "../../services/Graph/Algorithms/uni-direcional/Pathfinding";
import {WeightedDirectedGraph} from "../../services/Graph/Graph";


export function startPathfinding(weightedGraph: WeightedDirectedGraph, startPoint: number[], endPoint: number[], algorithm: Pathfinding) {
    return weightedGraph.findPath(algorithm, new Vertex(convertArrayToPos(startPoint).toIdString()),
        new Vertex(convertArrayToPos(endPoint).toIdString()));

}