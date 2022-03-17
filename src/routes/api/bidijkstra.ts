import {Router, Request, Response} from "express"
import {startBiDijkstra} from "../../controllers/bi_dijkstra_session"
import {pathfindingScheme2D} from "../../middleware/validateSchema/DijkstraSchema";
import {validateRequestPathfinding} from "../../middleware/ValidateRequest";

export const router: Router = Router()


router.route("/")
    .post(pathfindingScheme2D, validateRequestPathfinding, startBiDijkstra)
    .get((req : Request, res: Response) => res.sendStatus(200))
