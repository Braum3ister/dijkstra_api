import {Request, Response} from "express"

/**
 * Verifies the input and sends a bad request if invalid, if not it
 * initializes the calculation of dijkstra
 * @param req
 * @param res
 */
export function startDijkstra(req: Request, res: Response): void {
    res.send("test")
}