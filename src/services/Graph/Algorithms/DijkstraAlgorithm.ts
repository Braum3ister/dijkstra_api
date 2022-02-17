import {Pathfinding, ResultOfPathfinding} from "./Pathfinding";
import {Destination, Vertex} from "../GraphAddons";
import {FibonacciHeap, INode} from "@tyriar/fibonacci-heap"


export class DijkstraAlgorithm implements Pathfinding {

    findPath(graphMap: Map<Vertex, Set<Destination>>, startVertex: Vertex, endVertex: Vertex): ResultOfPathfinding {
        //Heap to get next Vertex to look at
        let fibHeap:FibonacciHeap<number, Vertex> = new FibonacciHeap()
        let fibHeapMap: Map<Vertex, INode<number, Vertex>> = new Map()
        //ParentMap to find shortestPath
        let parentMap: Map<Vertex, Vertex> = new Map();
        let distanceMap: Map<Vertex, number> = new Map();

        let startNode = fibHeap.insert(0, startVertex)
        fibHeapMap.set(startVertex, startNode)
        distanceMap.set(startVertex, 0)

        while (!fibHeap.isEmpty()) {
            let currentVertex: Vertex = fibHeap.extractMinimum()!.value!;
            if (currentVertex == endVertex) {
                break;
            }
            let possibleNeighbours: Set<Destination> = graphMap.get(currentVertex)!
            possibleNeighbours.forEach( (neighbour) => {
                let weight = distanceMap.get(neighbour.endVertex)
                let currentWeight =  distanceMap.get(currentVertex)!
                let possibleNewWeight = currentWeight + neighbour.weight
                if (weight == undefined || weight > possibleNewWeight) {
                    distanceMap.set(neighbour.endVertex, possibleNewWeight);
                    parentMap.set(neighbour.endVertex, currentVertex)
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