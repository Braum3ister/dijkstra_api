import {Destination, Vertex} from "../../GraphAddons";
import {FibonacciHeap, INode} from "@tyriar/fibonacci-heap";
import {ResultOfBiPathfinding} from "./BiPathfinding";




export const findBiAStar = (graphMap: Map<string, Set<Destination>>,
                                   reversedGraphMap: Map<string, Set<Destination>>,
                                   startVertex: Vertex,
                                   endVertex: Vertex) => {
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
        let currentForward = forwardQueue.findMinimum()!.value!;
        let currentBackward = backwardQueue.findMinimum()!.value!;

        let posResultForward = forwardDistanceMap.get(currentForward.toIdString())
        let posResultBackward = backwardDistanceMap.get(currentBackward.toIdString())
        if (posResultBackward && posResultForward) {
            if (posResultForward + posResultBackward >= optimalDistance) {
                break;
            }
        }




        let output1 = relaxNeighboursAStar(optimalHafWayPoint,
                endVertex,
                optimalDistance,
                graphMap,
                forwardDistanceMap,
                forwardQueue.extractMinimum()!.value!,
                parentMapForward,
                queueMapForward,
                forwardQueue,
                backwardDistanceMap)

        optimalDistance = output1.optimalDistance
        optimalHafWayPoint = output1.optimalHafWayPoint

        let output2 = relaxNeighboursAStar(optimalHafWayPoint,
                startVertex,
                optimalDistance,
                reversedGraphMap,
                backwardDistanceMap,
                backwardQueue.extractMinimum()!.value!,
                parentMapBackward,
                queueMapBackward,
                backwardQueue,
                forwardDistanceMap)

        optimalDistance = output2.optimalDistance
        optimalHafWayPoint = output2.optimalHafWayPoint

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



const relaxNeighboursAStar = (hWPoint: Vertex,
                         endVertex: Vertex,
                         optDistance: number,
                         graphMap: Map<string, Set<Destination>>,
                         primaryDistanceMap: Map<string, number>,
                         currentPrimary: Vertex,
                         parentMapPrimary: Map<string, string>,
                         queueMapPrimary: Map<Vertex, INode<number, Vertex>>,
                         primaryQueue:FibonacciHeap<number, Vertex>,
                         secondaryDistanceMap: Map<string, number>) => {
    let optimalDistance = optDistance
    let optimalHafWayPoint = hWPoint
    let possibleNeighboursForward: Set<Destination> = graphMap.get(currentPrimary.toIdString())!
    possibleNeighboursForward.forEach(neighbourOfPrimary => {
        let weight = primaryDistanceMap.get(neighbourOfPrimary.endVertex.toIdString())
        let currentWeight = primaryDistanceMap.get(currentPrimary.toIdString())!
        let possibleNewWeight = currentWeight + neighbourOfPrimary.weight
        if (weight == undefined || weight > possibleNewWeight) {
            primaryDistanceMap.set(neighbourOfPrimary.endVertex.toIdString(), possibleNewWeight);
            parentMapPrimary.set(neighbourOfPrimary.endVertex.toIdString(), currentPrimary.toIdString())
            /*
             * Update heap or insert Heap
             */
            let guessedRemainingDistance = findDistance(neighbourOfPrimary.endVertex.toIdString(), endVertex.toIdString())
            if (queueMapPrimary.get(neighbourOfPrimary.endVertex) == undefined) {
                let node = primaryQueue.insert(possibleNewWeight + guessedRemainingDistance, neighbourOfPrimary.endVertex)
                queueMapPrimary.set(neighbourOfPrimary.endVertex, node)
            } else {
                primaryQueue.decreaseKey(queueMapPrimary.get(neighbourOfPrimary.endVertex)!,
                    possibleNewWeight + guessedRemainingDistance)
            }

        }
        /**
         * Update optimal distance
         */

        let remainingDistance = secondaryDistanceMap.get(neighbourOfPrimary.endVertex.toIdString())

        if (remainingDistance != undefined && (possibleNewWeight + remainingDistance) < optimalDistance) {
            optimalDistance = possibleNewWeight + remainingDistance
            optimalHafWayPoint = neighbourOfPrimary.endVertex
        }

    })

    return {
        optimalDistance,
        optimalHafWayPoint
    }
}

export const findDistance = (currentVertex: string, endVertex: string) => {
    let coordinateCurrent = convertToArray(currentVertex)
    let coordinateEnd = convertToArray(endVertex)
    return Math.abs(coordinateCurrent[0] - coordinateEnd[0]) + Math.abs(coordinateCurrent[1] - coordinateEnd[1])


}

export const convertToArray = (coordinateAsString: string): number[] => {
    let output = coordinateAsString.split(",")
    let x  = parseInt(output[0])
    let y = parseInt(output[1])

    return [x, y]
}