import {Router, Request, Response} from "express"

import {StatusCodes} from "http-status-codes"
import {pathfindingScheme2D} from "../../middleware/validate-schema/dijkstra-schema";
import {startBiDijkstra} from "../../controllers/bi-directional/bi-dijkstra.controller";
import {validateRequestPathfinding} from "../../middleware/validata-request.middleware";

export const router: Router = Router()


router.route("/")
    .post(pathfindingScheme2D, validateRequestPathfinding, startBiDijkstra)
    .get((req : Request, res: Response) => res.sendStatus(StatusCodes.OK))
