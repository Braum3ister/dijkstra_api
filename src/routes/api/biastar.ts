import {Router, Request, Response} from "express"
import {startBiAStar} from "../../controllers/bi_a_star_sssion";
import {pathfindingScheme2D} from "../../middleware/validateSchema/DijkstraSchema";
import {validateRequestPathfinding} from "../../middleware/ValidateRequest";
import {StatusCodes} from "http-status-codes"

export const router: Router = Router()


router.route("/")
    .post(pathfindingScheme2D, validateRequestPathfinding, startBiAStar)
    .get((req : Request, res: Response) => res.sendStatus(StatusCodes.OK))
