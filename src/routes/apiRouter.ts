import {Router} from "express"
import {router as dijkstraRoute} from "./api/dijkstra"
import {router as aStarRouter} from "./api/astar"
import {router as biDijkstraRouter} from "./api/bidijkstra"
import {router as biAStarRouter} from "./api/biastar"

const apiRouter: Router = Router()

apiRouter.use("/dijkstra", dijkstraRoute)
apiRouter.use("/astar", aStarRouter)
apiRouter.use("/bidijkstra", biDijkstraRouter)
apiRouter.use("/biastar", biAStarRouter)


export default apiRouter