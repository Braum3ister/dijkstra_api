import {Router, Request, Response} from "express"
import {startDijkstra} from "../../controllers/dijkstra_session"
import {pathfindingScheme2D} from "../../middleware/validateSchema/DijkstraSchema";
import {validateRequestPathfinding} from "../../middleware/ValidateRequest";
import {StatusCodes} from "http-status-codes"

export const router: Router = Router()


router.route("/")
    .post(pathfindingScheme2D, validateRequestPathfinding, startDijkstra)
    .get((req : Request, res: Response) => res.sendStatus(StatusCodes.OK))
