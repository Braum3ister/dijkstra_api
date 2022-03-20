import {convertArrayToPos} from "../helpers/parser";
import {Vertex} from "../../services/graph/graph-addons.model";
import {WeightedDirectedGraph} from "../../services/graph/graph.model";
import {BiPathfindingFunction} from "../../services/graph/algorithms/bi-directional/bi-pathfiding.algorithm";


export function startBiPathfinding(weightedGraph: WeightedDirectedGraph, startPoint: number[], endPoint: number[],
                                   biPathfinding: BiPathfindingFunction) {
    return weightedGraph.findBiPath(new Vertex(convertArrayToPos(startPoint).toIdString()),
        new Vertex(convertArrayToPos(endPoint).toIdString()), biPathfinding);

}