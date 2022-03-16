"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DijkstraAlgorithm = void 0;
const Pathfinding_1 = require("./Pathfinding");
const fibonacci_heap_1 = require("@tyriar/fibonacci-heap");
class DijkstraAlgorithm {
    findPath(graphMap, startVertex, endVertex) {
        //Heap to get next Vertex to look at
        let fibHeap = new fibonacci_heap_1.FibonacciHeap();
        let fibHeapMap = new Map();
        //ParentMap to find shortestPath
        let parentMap = new Map();
        let distanceMap = new Map();
        let startNode = fibHeap.insert(0, startVertex);
        fibHeapMap.set(startVertex, startNode);
        distanceMap.set(startVertex.toIdString(), 0);
        while (!fibHeap.isEmpty()) {
            let currentVertex = fibHeap.extractMinimum().value;
            if (currentVertex.toIdString() === endVertex.toIdString()) {
                break;
            }
            let possibleNeighbours = graphMap.get(currentVertex.toIdString());
            possibleNeighbours.forEach((neighbour) => {
                let weight = distanceMap.get(neighbour.endVertex.toIdString());
                let currentWeight = distanceMap.get(currentVertex.toIdString());
                let possibleNewWeight = currentWeight + neighbour.weight;
                if (weight == undefined || weight > possibleNewWeight) {
                    distanceMap.set(neighbour.endVertex.toIdString(), possibleNewWeight);
                    parentMap.set(neighbour.endVertex.toIdString(), currentVertex.toIdString());
                    /*
                     * Update heap or insert Heap
                     */
                    if (fibHeapMap.get(neighbour.endVertex) == undefined) {
                        let node = fibHeap.insert(possibleNewWeight, neighbour.endVertex);
                        fibHeapMap.set(neighbour.endVertex, node);
                    }
                    else {
                        fibHeap.decreaseKey(fibHeapMap.get(neighbour.endVertex), possibleNewWeight);
                    }
                }
            });
        }
        return new Pathfinding_1.ResultOfPathfinding(parentMap, distanceMap, startVertex, endVertex);
    }
}
exports.DijkstraAlgorithm = DijkstraAlgorithm;
