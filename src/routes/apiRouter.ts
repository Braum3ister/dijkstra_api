import {Router} from "express"
import {router as dijkstraRoute} from "./api/dijkstra"
import {router as aStarRouter} from "./api/astar"
import {router as biDijkstraRouter} from "./api/bidijkstra"

const apiRouter: Router = Router()

apiRouter.use("/dijkstra", dijkstraRoute)
apiRouter.use("/astar", aStarRouter)
apiRouter.use("/bidijkstra", biDijkstraRouter)


export default apiRouter