import {Router, Request, Response} from "express"
import {startDijkstra} from "../../controllers/dijkstra_session"
import {dijkstraSchema2D} from "../../middleware/validateSchema/DijkstraSchema";
import {validateRequestDijkstra} from "../../middleware/ValidateRequest";

const router: Router = Router()


router.route("/").post(dijkstraSchema2D, validateRequestDijkstra, startDijkstra).get((req, res) => res.sendStatus(200))

router.get("/dij", ((req: Request, res: Response) => {
    res.send("res")
}))

module.exports = router