import {Router, Request, Response} from "express"

import {StatusCodes} from "http-status-codes"
import {pathfindingScheme2D} from "../../middleware/validate-schema/dijkstra-schema";
import {validateRequestPathfinding} from "../../middleware/validata-request.middleware";
import {startDijkstra} from "../../controllers/uni-directional/dijkstra.controller";

export const router: Router = Router()


router.route("/")
    .post(pathfindingScheme2D, validateRequestPathfinding, startDijkstra)
    .get((req : Request, res: Response) => res.sendStatus(StatusCodes.OK))
