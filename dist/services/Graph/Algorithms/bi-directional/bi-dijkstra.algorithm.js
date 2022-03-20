"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBiDijkstraPath = void 0;
const graph_addons_model_1 = require("../../graph-addons.model");
const fibonacci_heap_1 = require("@tyriar/fibonacci-heap");
const bi_pathfiding_algorithm_1 = require("./bi-pathfiding.algorithm");
const findBiDijkstraPath = (graphMap, reversedGraphMap, startVertex, endVertex) => {
    const forwardQueue = new fibonacci_heap_1.FibonacciHeap();
    const backwardQueue = new fibonacci_heap_1.FibonacciHeap();
    let forwardDistanceMap = new Map();
    let backwardDistanceMap = new Map();
    let parentMapForward = new Map();
    let parentMapBackward = new Map();
    let queueMapForward = new Map();
    let queueMapBackward = new Map();
    let optimalDistance = Number.MAX_SAFE_INTEGER;
    let optimalHafWayPoint = new graph_addons_model_1.Vertex("");
    /**
     * Prepare for start
     */
    let startNodeForward = forwardQueue.insert(0, startVertex);
    queueMapForward.set(startVertex, startNodeForward);
    forwardDistanceMap.set(startVertex.toIdString(), 0);
    let startNodeBackward = backwardQueue.insert(0, endVertex);
    queueMapBackward.set(endVertex, startNodeBackward);
    backwardDistanceMap.set(endVertex.toIdString(), 0);
    while (!forwardQueue.isEmpty() && !backwardQueue.isEmpty()) {
        let currentForward = forwardQueue.findMinimum().value;
        let currentBackward = backwardQueue.findMinimum().value;
        let posResultForward = forwardDistanceMap.get(currentForward.toIdString());
        let posResultBackward = backwardDistanceMap.get(currentBackward.toIdString());
        if (posResultBackward && posResultForward) {
            if (posResultForward + posResultBackward >= optimalDistance) {
                break;
            }
        }
        let output;
        if (forwardQueue.findMinimum().key <= backwardQueue.findMinimum().key) {
            output = relaxNeighbours(optimalHafWayPoint, optimalDistance, graphMap, forwardDistanceMap, forwardQueue.extractMinimum().value, parentMapForward, queueMapForward, forwardQueue, backwardDistanceMap);
        }
        else {
            output = relaxNeighbours(optimalHafWayPoint, optimalDistance, reversedGraphMap, backwardDistanceMap, backwardQueue.extractMinimum().value, parentMapBackward, queueMapBackward, backwardQueue, forwardDistanceMap);
        }
        optimalDistance = output.optimalDistance;
        optimalHafWayPoint = output.optimalHafWayPoint;
    }
    /**
     * Return a Result
     */
    return new bi_pathfiding_algorithm_1.ResultOfBiPathfinding(parentMapForward, parentMapBackward, forwardDistanceMap, backwardDistanceMap, startVertex, endVertex, optimalDistance, optimalHafWayPoint);
};
exports.findBiDijkstraPath = findBiDijkstraPath;
const relaxNeighbours = (hWPoint, optDistance, graphMap, primaryDistanceMap, currentPrimary, parentMapPrimary, queueMapPrimary, primaryQueue, secondaryDistanceMap) => {
    let optimalDistance = optDistance;
    let optimalHafWayPoint = hWPoint;
    let possibleNeighboursForward = graphMap.get(currentPrimary.toIdString());
    possibleNeighboursForward.forEach(neighbourOfPrimary => {
        let weight = primaryDistanceMap.get(neighbourOfPrimary.endVertex.toIdString());
        let currentWeight = primaryDistanceMap.get(currentPrimary.toIdString());
        let possibleNewWeight = currentWeight + neighbourOfPrimary.weight;
        if (weight == undefined || weight > possibleNewWeight) {
            primaryDistanceMap.set(neighbourOfPrimary.endVertex.toIdString(), possibleNewWeight);
            parentMapPrimary.set(neighbourOfPrimary.endVertex.toIdString(), currentPrimary.toIdString());
            /*
             * Update heap or insert Heap
             */
            if (queueMapPrimary.get(neighbourOfPrimary.endVertex) == undefined) {
                let node = primaryQueue.insert(possibleNewWeight, neighbourOfPrimary.endVertex);
                queueMapPrimary.set(neighbourOfPrimary.endVertex, node);
            }
            else {
                primaryQueue.decreaseKey(queueMapPrimary.get(neighbourOfPrimary.endVertex), possibleNewWeight);
            }
        }
        /**
         * Update optimal distance
         */
        let remainingDistance = secondaryDistanceMap.get(neighbourOfPrimary.endVertex.toIdString());
        if (remainingDistance != undefined && (possibleNewWeight + remainingDistance) < optimalDistance) {
            optimalDistance = possibleNewWeight + remainingDistance;
            optimalHafWayPoint = neighbourOfPrimary.endVertex;
        }
    });
    return {
        optimalDistance,
        optimalHafWayPoint
    };
};
