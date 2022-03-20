import {Router} from "express"
import {router as dijkstraRoute} from "./api/dijkstra.router"
import {router as aStarRouter} from "./api/a-star.router"
import {router as biDijkstraRouter} from "./api/bi-dijkstra.router"
import {router as biAStarRouter} from "./api/bi-a-star.router"

const apiRouter: Router = Router()

apiRouter.use("/dijkstra", dijkstraRoute)
apiRouter.use("/astar", aStarRouter)
apiRouter.use("/bidijkstra", biDijkstraRouter)
apiRouter.use("/biastar", biAStarRouter)


export default apiRouter