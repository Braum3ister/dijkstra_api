import { body } from "express-validator"


const dijkstraSchema2D = [
    body("height")
        .exists({
            checkFalsy: true
        })
        .isInt({
            min : 0
        })
        .withMessage("Height must be a number > 0"),
    body("width")
        .exists({
            checkFalsy: true
        })
        .isInt({
            min : 0
        })
        .withMessage("Width must be a number > 0"),

    body("start-point")
        .exists({checkFalsy : true})
        .custom((value) => {
            return Array.isArray(value) && value.length === 2
        }),


    body("end-point")
        .exists({checkFalsy: true})
    .custom((value) => {
        return Array.isArray(value) && value.length === 2
    }),


    body("walls")
        .exists({
            checkNull : true
        })
        .custom((value) => {
            value.forEach((posCoordinate: number[]) => {
                if (posCoordinate.length !== 2) {
                    return false;
                }
            })
            return true;
        })
];

export {dijkstraSchema2D}