import {convertArrayToPos} from "./helpers/parser";
import {Vertex} from "../services/Graph/GraphAddons";
import {WeightedDirectedGraph} from "../services/Graph/Graph";


export function startBiPathfinding(weightedGraph: WeightedDirectedGraph, startPoint: number[], endPoint: number[]) {
    return JSON.stringify(weightedGraph.findBiDijkstra(new Vertex(convertArrayToPos(startPoint).toIdString()),
        new Vertex(convertArrayToPos(endPoint).toIdString())));

}