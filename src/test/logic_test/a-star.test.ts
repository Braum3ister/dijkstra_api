import {expect} from "chai"
import {convertToWeightedGraph} from "../../services/graph/graph.model";
import {Vertex} from "../../services/graph/graph-addons.model";

import {AStarAlgorithm} from "../../services/graph/algorithms/uni-direcional/a-star.algorithm";


describe("AStarAlgorithm Test", () => {

    it("Crate matrix Graph Dijkstra", () => {
        let newWeightedGraph = convertToWeightedGraph(10, 10, new Set())
        let startVertex = new Vertex("0,0")
        let endVertex = new Vertex("0,9")
        expect(newWeightedGraph.findPath(new AStarAlgorithm(), startVertex, endVertex).finalDistance).to.equal(9)
    })

})