import {convertArrayToPos} from "../helpers/parser";
import {Vertex} from "../../services/graph/graph-addons.model";
import {Pathfinding} from "../../services/graph/algorithms/uni-direcional/pathfiding.algorithm";
import {WeightedDirectedGraph} from "../../services/graph/graph.model";


export function startPathfinding(weightedGraph: WeightedDirectedGraph, startPoint: number[], endPoint: number[], algorithm: Pathfinding) {
    return weightedGraph.findPath(algorithm, new Vertex(convertArrayToPos(startPoint).toIdString()),
        new Vertex(convertArrayToPos(endPoint).toIdString()));

}