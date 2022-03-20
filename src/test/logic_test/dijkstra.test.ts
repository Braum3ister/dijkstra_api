import {expect} from "chai"
import {convertToWeightedGraph, WeightedDirectedGraph} from "../../services/Graph/Graph";
import {Vertex} from "../../services/Graph/GraphAddons";
import {DijkstraAlgorithm} from "../../services/Graph/Algorithms/uni-direcional/DijkstraAlgorithm";


describe("Dijkstra Test", () => {
    let startVertex = new Vertex("start")
    let endVertex = new Vertex("end")

    let A = new Vertex("A")
    let B = new Vertex("B")
    let C = new Vertex("C")
    let D = new Vertex("D")
    let E = new Vertex("E")
    let F = new Vertex("F")

    let weightedGraph = setUpBasicGraph()

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


    it("One Edge Graph Dijkstra", () =>  {
        expect(weightedGraph.findPath(new DijkstraAlgorithm(),startVertex, endVertex).finalDistance).to.equal(10)
    })

    it("BiDijkstraGraph BasicGraph", () => {
        expect(weightedGraph.findBiDijkstra(startVertex, endVertex).distance).to.equal(10)
    })

    it("Advanced Graph Dijkstra", () => {
        let advancedGraph = setUpAdvancedGraph()
        expect(advancedGraph.findPath(new DijkstraAlgorithm(), A, F).finalDistance).to.equal(6)
    })

    it("Advance Graph BiDijkstra", () => {
        let advancedGraph = setUpAdvancedGraph()
        let output = advancedGraph.findBiDijkstra(A, F)
        expect(output.distance).to.equal(6)
    })

    it("Crate matrix Graph Dijkstra", () => {
        let newWeightedGraph = convertToWeightedGraph(10, 10, new Set())
        let startVertex = new Vertex("0,0")
        let endVertex = new Vertex("0,9")
        expect(newWeightedGraph.findPath(new DijkstraAlgorithm(), startVertex, endVertex).finalDistance)
            .to.equal(9)
    })

    it("Advanced BiDijstra Test", () => {
        let newWeightedGraph = convertToWeightedGraph(20, 20, new Set())
        let startVertex = new Vertex("1,2")
        let endVertex = new Vertex("15,8")
        let output = newWeightedGraph.findBiDijkstra(startVertex, endVertex)
        expect(output.distance).to.equal(20)
        console.log(findBiggestElement(output.backwardDistanceMap))
        console.log(findBiggestElement(output.forwardDistanceMap))
    })

    it("Really Big Test", () => {
        let weightedGraph = convertToWeightedGraph(100, 200, new Set())
        let startVertex = new Vertex("12,42")
        let endVertex = new Vertex("88,199")
        let output = weightedGraph.findBiDijkstra(startVertex, endVertex)
        expect(output.distance).to.equal(233)
    })

})

const findBiggestElement = (map: Map<string, number>) => {
    let biggestElement = 0
    for (let value of map.values()) {
        if (value > biggestElement) {
            biggestElement = value
        }
    }
    return biggestElement
}