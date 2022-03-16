import {Router} from "express"
import {router as dijkstraRoute} from "./api/dijkstra"
import {router as aStarRouter} from "./api/astar"

const apiRouter: Router = Router()

apiRouter.use("/dijkstra", dijkstraRoute)

apiRouter.use("/astar", aStarRouter)


export default apiRouter