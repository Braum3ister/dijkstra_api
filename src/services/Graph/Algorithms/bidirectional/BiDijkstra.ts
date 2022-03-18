import {Destination, Vertex} from "../../GraphAddons";
import {FibonacciHeap, INode} from "@tyriar/fibonacci-heap";
import {ResultOfBiPathfinding} from "./BiPathfinding";




export const findBiDijkstraPath = (graphMap: Map<string, Set<Destination>>, reversedGraphMap: Map<string, Set<Destination>>, startVertex: Vertex, endVertex: Vertex) => {
    const forwardQueue: FibonacciHeap<number, Vertex> = new FibonacciHeap()
    const backwardQueue: FibonacciHeap<number, Vertex> = new FibonacciHeap()

    let forwardDistanceMap: Map<string, number> = new Map();
    let backwardDistanceMap: Map<string, number> = new Map();

    let parentMapForward: Map<string, string> = new Map();
    let parentMapBackward: Map<string, string> = new Map();

    let queueMapForward: Map<Vertex, INode<number, Vertex>> = new Map()
    let queueMapBackward: Map<Vertex, INode<number, Vertex>> = new Map()

    let optimalDistance = Number.MAX_SAFE_INTEGER
    let optimalHafWayPoint: Vertex = new Vertex("")

    /**
     * Prepare for start
     */
    let startNodeForward = forwardQueue.insert(0, startVertex)
    queueMapForward.set(startVertex, startNodeForward)
    forwardDistanceMap.set(startVertex.toIdString(), 0)


    let startNodeBackward = backwardQueue.insert(0, endVertex)
    queueMapBackward.set(endVertex, startNodeBackward)
    backwardDistanceMap.set(endVertex.toIdString(), 0)


    while (!forwardQueue.isEmpty() && !backwardQueue.isEmpty()) {
        let currentForward = forwardQueue.extractMinimum()!.value!;
        let currentBackward = backwardQueue.extractMinimum()!.value!;

        let posResultForward = forwardDistanceMap.get(currentForward.toIdString())
        let posResultBackward = backwardDistanceMap.get(currentBackward.toIdString())
        if (posResultBackward && posResultForward) {
            if (posResultForward + posResultBackward >= optimalDistance) {
                break;
            }
        }
        /**
         * Add Adjacent Vertices to Forward Search
         */

        let outputForward = relaxNeighbours(optimalHafWayPoint,
            optimalDistance,
            graphMap,
            forwardDistanceMap,
            currentForward,
            parentMapForward,
            queueMapForward,
            forwardQueue,
            backwardDistanceMap)

        optimalDistance = outputForward.optimalDistance
        optimalHafWayPoint = outputForward.optimalHafWayPoint

        /**
         * Add adjacent vertices to Backward Search
         */

        let outputBackward = relaxNeighbours(optimalHafWayPoint,
            optimalDistance,
            reversedGraphMap,
            backwardDistanceMap,
            currentBackward,
            parentMapBackward,
            queueMapBackward,
            backwardQueue,
            forwardDistanceMap)

        optimalHafWayPoint = outputBackward.optimalHafWayPoint
        optimalDistance = outputBackward.optimalDistance

    }

    /**
     * Return a Result
     */

    return new ResultOfBiPathfinding(parentMapForward,
        parentMapBackward,
        forwardDistanceMap,
        backwardDistanceMap,
        startVertex,
        endVertex,
        optimalDistance,
        optimalHafWayPoint)

}



const relaxNeighbours = (hWPoint: Vertex, optDistance: number, graphMap: Map<string, Set<Destination>>, primaryDistanceMap: Map<string, number>, currentPrimary: Vertex, parentMapPrimary: Map<string, string>, queueMapPrimary: Map<Vertex, INode<number, Vertex>>, primaryQueue:FibonacciHeap<number, Vertex>, secondaryDistanceMap: Map<string, number>) => {
    let optimalDistance = optDistance
    let optimalHafWayPoint = hWPoint
    let possibleNeighboursForward: Set<Destination> = graphMap.get(currentPrimary.toIdString())!
    possibleNeighboursForward.forEach(neighbourOfForward => {
        let weight = primaryDistanceMap.get(neighbourOfForward.endVertex.toIdString())
        let currentWeight = primaryDistanceMap.get(currentPrimary.toIdString())!
        let possibleNewWeight = currentWeight + neighbourOfForward.weight
        if (weight == undefined || weight > possibleNewWeight) {
            primaryDistanceMap.set(neighbourOfForward.endVertex.toIdString(), possibleNewWeight);
            parentMapPrimary.set(neighbourOfForward.endVertex.toIdString(), currentPrimary.toIdString())
            /*
             * Update heap or insert Heap
             */
            if (queueMapPrimary.get(neighbourOfForward.endVertex) == undefined) {
                let node = primaryQueue.insert(possibleNewWeight, neighbourOfForward.endVertex)
                queueMapPrimary.set(neighbourOfForward.endVertex, node)
            } else {
                primaryQueue.decreaseKey(queueMapPrimary.get(neighbourOfForward.endVertex)!, possibleNewWeight)
            }

        }
        /**
         * Update optimal distance
         */

        let remainingDistance = secondaryDistanceMap.get(neighbourOfForward.endVertex.toIdString())

        if (remainingDistance != undefined && (possibleNewWeight + remainingDistance) < optimalDistance) {
            optimalDistance = possibleNewWeight + remainingDistance
            optimalHafWayPoint = neighbourOfForward.endVertex
        }

    })

    return {
        optimalDistance,
        optimalHafWayPoint
    }
}





