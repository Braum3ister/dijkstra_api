"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToArray = exports.findDistance = exports.findBiAStar = void 0;
const graph_addons_model_1 = require("../../graph-addons.model");
const fibonacci_heap_1 = require("@tyriar/fibonacci-heap");
const bi_pathfiding_algorithm_1 = require("./bi-pathfiding.algorithm");
const findBiAStar = (graphMap, reversedGraphMap, startVertex, endVertex) => {
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
        let output1 = relaxNeighboursAStar(optimalHafWayPoint, endVertex, optimalDistance, graphMap, forwardDistanceMap, forwardQueue.extractMinimum().value, parentMapForward, queueMapForward, forwardQueue, backwardDistanceMap);
        optimalDistance = output1.optimalDistance;
        optimalHafWayPoint = output1.optimalHafWayPoint;
        let output2 = relaxNeighboursAStar(optimalHafWayPoint, startVertex, optimalDistance, reversedGraphMap, backwardDistanceMap, backwardQueue.extractMinimum().value, parentMapBackward, queueMapBackward, backwardQueue, forwardDistanceMap);
        optimalDistance = output2.optimalDistance;
        optimalHafWayPoint = output2.optimalHafWayPoint;
    }
    /**
     * Return a Result
     */
    return new bi_pathfiding_algorithm_1.ResultOfBiPathfinding(parentMapForward, parentMapBackward, forwardDistanceMap, backwardDistanceMap, startVertex, endVertex, optimalDistance, optimalHafWayPoint);
};
exports.findBiAStar = findBiAStar;
const relaxNeighboursAStar = (hWPoint, endVertex, optDistance, graphMap, primaryDistanceMap, currentPrimary, parentMapPrimary, queueMapPrimary, primaryQueue, secondaryDistanceMap) => {
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
            let guessedRemainingDistance = (0, exports.findDistance)(neighbourOfPrimary.endVertex.toIdString(), endVertex.toIdString());
            if (queueMapPrimary.get(neighbourOfPrimary.endVertex) == undefined) {
                let node = primaryQueue.insert(possibleNewWeight + guessedRemainingDistance, neighbourOfPrimary.endVertex);
                queueMapPrimary.set(neighbourOfPrimary.endVertex, node);
            }
            else {
                primaryQueue.decreaseKey(queueMapPrimary.get(neighbourOfPrimary.endVertex), possibleNewWeight + guessedRemainingDistance);
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
const findDistance = (currentVertex, endVertex) => {
    let coordinateCurrent = (0, exports.convertToArray)(currentVertex);
    let coordinateEnd = (0, exports.convertToArray)(endVertex);
    return Math.abs(coordinateCurrent[0] - coordinateEnd[0]) + Math.abs(coordinateCurrent[1] - coordinateEnd[1]);
};
exports.findDistance = findDistance;
const convertToArray = (coordinateAsString) => {
    let output = coordinateAsString.split(",");
    let x = parseInt(output[0]);
    let y = parseInt(output[1]);
    return [x, y];
};
exports.convertToArray = convertToArray;
