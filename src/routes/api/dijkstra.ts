import {Router, Request, Response} from "express"
import {startDijkstra} from "../../controllers/dijkstra_session"

const router: Router = Router()


router.route("/").post(startDijkstra)

router.get("/dij", ((req: Request, res: Response) => {
    res.send("res")
}))

module.exports = router