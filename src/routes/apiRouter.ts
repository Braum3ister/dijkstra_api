import {Router} from "express"

const dijkstraRoute = require("./api/dijkstra")
const apiRouter: Router = Router()

apiRouter.use("/dijkstra", dijkstraRoute)


export default apiRouter