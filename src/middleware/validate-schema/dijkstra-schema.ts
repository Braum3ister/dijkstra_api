import {body} from "express-validator"


const pathfindingScheme2D = [
    body("height")
        .exists({
            checkFalsy: true
        })
        .isInt({
            min: 0
        })
        .toInt()
        .withMessage("Height must be a number > 0"),
    body("width")
        .exists({
            checkFalsy: true
        })
        .isInt({
            min: 0
        })
        .toInt()
        .withMessage("Width must be a number > 0"),

    body("startPoint")
        .exists({checkFalsy: true})
        .custom((value) => {
            return Array.isArray(value) && value.length === 2
        })
        .toArray(),


    body("endPoint")
        .exists({checkFalsy: true})
        .custom((value) => {
            return Array.isArray(value) && value.length === 2
        })
        .toArray(),


    body("walls")
        .exists({
            checkNull: true
        })
        .custom((value) => {
            value.forEach((posCoordinate: number[]) => {
                if (posCoordinate.length !== 2) {
                    throw new Error()
                }
            })
            return true;
        })
        .toArray()
        .withMessage("Not valid Syntax for walls")

];

export {pathfindingScheme2D}