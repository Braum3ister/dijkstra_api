import {Pathfinding, ResultOfPathfinding} from "./Pathfinding";
import {Destination, Vertex} from "../GraphAddons";
import {BinaryHeap, Comparable, Heap} from "./helpers/Heap";


class VertexDistanceDijkstra implements Comparable<VertexDistanceDijkstra> {

    private readonly _vertex: Vertex;
    private _distance: number;

    constructor(vertex: Vertex, distance : number) {
        this._vertex = vertex;
        this._distance = distance;
    }

    get distance(): number {
        return this._distance;
    }

    set distance(value: number) {
        this._distance = value;
    }

    get vertex(): Vertex {
        return this._vertex;
    }


    compareTo(obj1: VertexDistanceDijkstra): number {
        return this._distance - obj1._distance;
    }
}

export class DijkstraAlgorithm implements Pathfinding {
    findPath(graphMap: Map<Vertex, Set<Destination>>, startVertex: Vertex, endVertex: Vertex): ResultOfPathfinding {
        const numberOfVertices = 34
        //Heap to get next Vertex to look at
        let heap: Heap<VertexDistanceDijkstra> = new BinaryHeap(numberOfVertices)
        //ParentMap to find shortestPath
        let parentMap: Map<Vertex, Vertex> = new Map();
        /*distanceMap to keep Track of the distances
          Optional: add Relationship between heap and distanceMap
          https://youtu.be/fRpsjKCfQjE?t=974
         */
        let distanceMap: Map<Vertex, number> = new Map();
        heap.insert(new VertexDistanceDijkstra(startVertex, 0))
        distanceMap.set(startVertex, 0)

        while (heap.getSize() > 0) {
            let current = heap.deleteMin();
            if (current == endVertex) {
                break;
            }
            let possibleNeighbours: Set<Destination> | undefined = graphMap.get(current)
            if (possibleNeighbours == undefined) continue;
            possibleNeighbours.forEach( (neighbour) => {
                let weight = distanceMap.get(neighbour.endVertex)
                let currentWeight =  distanceMap.get(current.vertex)
                if (currentWeight == undefined) {
                    return;
                }
                let possibleNewWeight = currentWeight + neighbour.weight
                if (weight == undefined || weight > possibleNewWeight) {
                    distanceMap.set(neighbour.endVertex, possibleNewWeight);
                    parentMap.set(neighbour.endVertex, current.vertex)
                }
            })

        }
        return new ResultOfPathfinding(parentMap, distanceMap, startVertex, endVertex)
    }

}