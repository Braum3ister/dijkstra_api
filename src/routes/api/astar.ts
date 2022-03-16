import {Router, Request, Response} from "express"
import {startAStar} from "../../controllers/a_star_session"
import {pathfindingScheme2D} from "../../middleware/validateSchema/DijkstraSchema";
import {validateRequestPathfinding} from "../../middleware/ValidateRequest";

export const router: Router = Router()


router.route("/").post(pathfindingScheme2D, validateRequestPathfinding, startAStar).get((req: Request, res: Response) => res.sendStatus(200))

