import {convertArrayToPos} from "../helpers/parser";
import {Vertex} from "../../services/graph/GraphAddons";
import {Pathfinding} from "../../services/graph/algorithms/uni-direcional/Pathfinding";
import {WeightedDirectedGraph} from "../../services/graph/Graph";


export function startPathfinding(weightedGraph: WeightedDirectedGraph, startPoint: number[], endPoint: number[], algorithm: Pathfinding) {
    return weightedGraph.findPath(algorithm, new Vertex(convertArrayToPos(startPoint).toIdString()),
        new Vertex(convertArrayToPos(endPoint).toIdString()));

}