import {convertArrayToPos} from "./helpers/parser";
import {Vertex} from "../services/Graph/GraphAddons";
import {WeightedDirectedGraph} from "../services/Graph/Graph";
import {BiPathfindingFunction} from "../services/Graph/Algorithms/bidirectional/BiPathfinding";


export function startBiPathfinding(weightedGraph: WeightedDirectedGraph, startPoint: number[], endPoint: number[],
                                   biPathfinding: BiPathfindingFunction) {
    return weightedGraph.findBiPath(new Vertex(convertArrayToPos(startPoint).toIdString()),
        new Vertex(convertArrayToPos(endPoint).toIdString()), biPathfinding);

}