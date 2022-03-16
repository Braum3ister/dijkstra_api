import {expect} from "chai"
import {convertToWeightedGraph, WeightedDirectedGraph} from "../../services/Graph/Graph";
import {Vertex} from "../../services/Graph/GraphAddons";

import {AStarAlgorithm} from "../../services/Graph/Algorithms/AStarAlgorithm";


describe("AStarAlgorithm Test", () => {
    let startVertex = new Vertex("start")
    let endVertex = new Vertex("end")

    let A = new Vertex("A")
    let B = new Vertex("B")
    let C = new Vertex("C")
    let D = new Vertex("D")
    let E = new Vertex("E")
    let F = new Vertex("F")

    function setUpBasicGraph() {

        const weightedGraph = new WeightedDirectedGraph()
        weightedGraph.addEdge(startVertex, endVertex, 10)
        return weightedGraph;
    }

    function setUpAdvancedGraph() {
        let weightedGraph = new WeightedDirectedGraph()

        weightedGraph.addEdge(A, B, 2)
        weightedGraph.addEdge(A, C, 4)
        weightedGraph.addEdge(B, C, 1)
        weightedGraph.addEdge(B, E, 2)
        weightedGraph.addEdge(B, D, 4)
        weightedGraph.addEdge(C, E, 3)
        weightedGraph.addEdge(D, F, 2)
        weightedGraph.addEdge(E, F, 2)
        weightedGraph.addEdge(E, D, 3)
        return weightedGraph;

    }

    it("Crate matrix Graph Dijkstra", () => {
        let newWeightedGraph = convertToWeightedGraph(10, 10, new Set())
        let startVertex = new Vertex("0,0")
        let endVertex = new Vertex("0,9")
        expect(newWeightedGraph.findPath(new AStarAlgorithm(), startVertex, endVertex).finalDistance).to.equal(9)
    })

})