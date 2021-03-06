import {Destination, Vertex} from "../../graph-addons.model";
import {FibonacciHeap, INode} from "@tyriar/fibonacci-heap";

export class ResultOfBiPathfinding {
    private readonly _forwardDistanceMap: Map<string, number>
    private readonly _backwardDistanceMap: Map<string, number>
    private readonly _startVertex: Vertex
    private readonly _endVertex: Vertex
    private readonly _distance: number
    private readonly _parentMap: Map<string, null>
    private readonly _halfWayPoint: Vertex


    get forwardDistanceMap(): Map<string, number> {
        return this._forwardDistanceMap;
    }

    get backwardDistanceMap(): Map<string, number> {
        return this._backwardDistanceMap;
    }

    get startVertex(): Vertex {
        return this._startVertex;
    }

    get endVertex(): Vertex {
        return this._endVertex;
    }


    constructor(parentMapForward: Map<string, string>,
                parentMapBackward: Map<string, string>,
                forwardDistanceMap: Map<string, number>,
                backwardDistanceMap: Map<string, number>,
                startVertex: Vertex,
                endVertex: Vertex,
                distance: number,
                halfWayPoint: Vertex) {
        this._forwardDistanceMap = forwardDistanceMap
        this._backwardDistanceMap = backwardDistanceMap
        this._startVertex = startVertex
        this._endVertex = endVertex
        this._distance = distance
        this._halfWayPoint = halfWayPoint
        this._parentMap = this.parseParentMap(parentMapForward, parentMapBackward)

    }

    parseParentMap(parentMapForward: Map<string, string>, parentMapBackward: Map<string, string>): Map<string, null> {
        let output: Map<string, null> = new Map()
        let currentForward: string | undefined = this._halfWayPoint.toIdString();
        while (currentForward != undefined) {
            output.set(currentForward, null)
            currentForward = parentMapForward.get(currentForward)
        }

        let currentBackward: string | undefined = this._halfWayPoint.toIdString()
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
            start: this._startVertex,
            end: this._endVertex,
            distance: this.distance,
            forwardDistanceMap: Object.fromEntries(this._forwardDistanceMap),
            backwardDistanceMap: Object.fromEntries(this._backwardDistanceMap),
            path: Object.fromEntries(this._parentMap)
        }

    }
}


export interface BiPathfindingFunction {
    biPathfinding: (graph: Map<string, Set<Destination>>, reverseGraph: Map<string, Set<Destination>>,
                    startVertex: Vertex,
                    endVertex: Vertex) => ResultOfBiPathfinding
}

export interface BiAlgorithmStatus {
    forwardQueue: FibonacciHeap<number, Vertex>
    backwardQueue: FibonacciHeap<number, Vertex>

    forwardDistanceMap: Map<string, number>
    backwardDistanceMap: Map<string, number>

    parentMapForward: Map<string, string>
    parentMapBackward: Map<string, string>

    queueMapForward: Map<Vertex, INode<number, Vertex>>
    queueMapBackward: Map<Vertex, INode<number, Vertex>>

}