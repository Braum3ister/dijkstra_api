import {Pathfinding, ResultOfPathfinding} from "./Pathfinding";
import {Destination, Vertex} from "../../GraphAddons";
import {FibonacciHeap, INode} from "@tyriar/fibonacci-heap"


export class DijkstraAlgorithm implements Pathfinding {

    findPath(graphMap: Map<string, Set<Destination>>, startVertex: Vertex, endVertex: Vertex): ResultOfPathfinding {
        //Heap to get next Vertex to look at
        let fibHeap: FibonacciHeap<number, Vertex> = new FibonacciHeap()
        let fibHeapMap: Map<Vertex, INode<number, Vertex>> = new Map()
        //ParentMap to find shortestPath
        let parentMap: Map<string, string> = new Map();
        let distanceMap: Map<string, number> = new Map();

        let startNode = fibHeap.insert(0, startVertex)
        fibHeapMap.set(startVertex, startNode)
        distanceMap.set(startVertex.toIdString(), 0)

        while (!fibHeap.isEmpty()) {
            let currentVertex: Vertex = fibHeap.extractMinimum()!.value!;
            if (currentVertex.toIdString() === endVertex.toIdString()) {
                break;
            }
            let possibleNeighbours: Set<Destination> = graphMap.get(currentVertex.toIdString())!
            possibleNeighbours.forEach((neighbour) => {
                let weight = distanceMap.get(neighbour.endVertex.toIdString())
                let currentWeight = distanceMap.get(currentVertex.toIdString())!
                let possibleNewWeight = currentWeight + neighbour.weight
                if (weight == undefined || weight > possibleNewWeight) {
                    distanceMap.set(neighbour.endVertex.toIdString(), possibleNewWeight);
                    parentMap.set(neighbour.endVertex.toIdString(), currentVertex.toIdString())
                    /*
                     * Update heap or insert Heap
                     */
                    if (fibHeapMap.get(neighbour.endVertex) == undefined) {
                        let node = fibHeap.insert(possibleNewWeight, neighbour.endVertex)
                        fibHeapMap.set(neighbour.endVertex, node)
                    } else {
                        fibHeap.decreaseKey(fibHeapMap.get(neighbour.endVertex)!, possibleNewWeight)
                    }

                }
            })

        }
        return new ResultOfPathfinding(parentMap, distanceMap, startVertex, endVertex)
    }
}