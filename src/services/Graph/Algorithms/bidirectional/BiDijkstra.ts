import {Destination, Vertex} from "../../GraphAddons";
import {FibonacciHeap, INode} from "@tyriar/fibonacci-heap";


export class ResultOfBiPathfinding {
    private readonly forwardDistanceMap: Map<string, number>
    private readonly backwardDistanceMap: Map<string, number>
    private readonly startVertex: Vertex
    private readonly endVertex: Vertex
    private readonly _distance: number
    private readonly parentMap: Map<string, null>
    private readonly halfWayPoint: Vertex


    constructor(parentMapForward: Map<string, string>, parentMapBackward: Map<string, string>, forwardDistanceMap: Map<string, number>, backwardDistanceMap: Map<string, number>, startVertex: Vertex, endVertex: Vertex, distance: number, halfWayPoint: Vertex) {
        this.forwardDistanceMap = forwardDistanceMap
        this.backwardDistanceMap = backwardDistanceMap
        this.startVertex = startVertex
        this.endVertex = endVertex
        this._distance = distance
        this.halfWayPoint = halfWayPoint
        this.parentMap = this.parseParentMap(parentMapForward, parentMapBackward)

    }

    parseParentMap(parentMapForward: Map<string, string>, parentMapBackward: Map<string, string>): Map<string, null> {
        let output: Map<string, null> = new Map()
        let currentForward: string | undefined = this.halfWayPoint.toIdString();
        while (currentForward != undefined) {
            output.set(currentForward, null)
            currentForward = parentMapForward.get(currentForward)
        }

        let currentBackward: string | undefined = this.halfWayPoint.toIdString()
        while (currentBackward != undefined) {
            output.set(currentBackward, null)
            currentBackward = parentMapBackward.get(currentBackward)
        }
        return output;
    }

    get distance(): number {
        return this._distance;
    }

    toJSON() {

        return {
            start: this.startVertex,
            end: this.endVertex,
            distance: this.distance,
            forwardDistanceMap: Object.fromEntries(this.forwardDistanceMap),
            backwardDistanceMap: Object.fromEntries(this.backwardDistanceMap),
            path: Object.fromEntries(this.parentMap)
        }

    }
}

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

        let possibleNeighboursForward: Set<Destination> = graphMap.get(currentForward.toIdString())!
        possibleNeighboursForward.forEach(neighbourOfForward => {
            let weight = forwardDistanceMap.get(neighbourOfForward.endVertex.toIdString())
            let currentWeight = forwardDistanceMap.get(currentForward.toIdString())!
            let possibleNewWeight = currentWeight + neighbourOfForward.weight
            if (weight == undefined || weight > possibleNewWeight) {
                forwardDistanceMap.set(neighbourOfForward.endVertex.toIdString(), possibleNewWeight);
                parentMapForward.set(neighbourOfForward.endVertex.toIdString(), currentForward.toIdString())
                /*
                 * Update heap or insert Heap
                 */
                if (queueMapForward.get(neighbourOfForward.endVertex) == undefined) {
                    let node = forwardQueue.insert(possibleNewWeight, neighbourOfForward.endVertex)
                    queueMapForward.set(neighbourOfForward.endVertex, node)
                } else {
                    forwardQueue.decreaseKey(queueMapForward.get(neighbourOfForward.endVertex)!, possibleNewWeight)
                }

            }
            /**
             * Update optimal distance
             */

            let remainingDistance = backwardDistanceMap.get(neighbourOfForward.endVertex.toIdString())

            if (remainingDistance != undefined && (possibleNewWeight + remainingDistance) < optimalDistance) {
                optimalDistance = possibleNewWeight + remainingDistance
                optimalHafWayPoint = neighbourOfForward.endVertex
            }

        })



        /**
         * Add adjacent vertices to Backward Search
         */



        let possibleNeighboursBackward: Set<Destination> = reversedGraphMap.get(currentBackward.toIdString())!
        possibleNeighboursBackward.forEach(neighbourOfBackward => {
            let weight = backwardDistanceMap.get(neighbourOfBackward.endVertex.toIdString())
            let currentWeight = backwardDistanceMap.get(currentBackward.toIdString())!
            let possibleNewWeight = currentWeight + neighbourOfBackward.weight
            if (weight == undefined || weight > possibleNewWeight) {
                backwardDistanceMap.set(neighbourOfBackward.endVertex.toIdString(), possibleNewWeight);
                parentMapBackward.set(neighbourOfBackward.endVertex.toIdString(), currentBackward.toIdString())
                /*
                 * Update heap or insert Heap
                 */
                if (queueMapBackward.get(neighbourOfBackward.endVertex) == undefined) {
                    let node = backwardQueue.insert(possibleNewWeight, neighbourOfBackward.endVertex)
                    queueMapBackward.set(neighbourOfBackward.endVertex, node)
                } else {
                    backwardQueue.decreaseKey(queueMapBackward.get(neighbourOfBackward.endVertex)!, possibleNewWeight)
                }

            }

            /**
             * Update optimal distance
             */

            let remainingDistance = forwardDistanceMap.get(neighbourOfBackward.endVertex.toIdString())
            if (remainingDistance != undefined
                && (possibleNewWeight + remainingDistance) < optimalDistance) {
                optimalDistance = possibleNewWeight + remainingDistance
                optimalHafWayPoint = neighbourOfBackward.endVertex
            }

        })

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





