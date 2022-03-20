import {convertArrayToPos} from "../helpers/parser";
import {Vertex} from "../../services/graph/GraphAddons";
import {WeightedDirectedGraph} from "../../services/graph/Graph";
import {BiPathfindingFunction} from "../../services/graph/algorithms/bi-directional/BiPathfinding";


export function startBiPathfinding(weightedGraph: WeightedDirectedGraph, startPoint: number[], endPoint: number[],
                                   biPathfinding: BiPathfindingFunction) {
    return weightedGraph.findBiPath(new Vertex(convertArrayToPos(startPoint).toIdString()),
        new Vertex(convertArrayToPos(endPoint).toIdString()), biPathfinding);

}