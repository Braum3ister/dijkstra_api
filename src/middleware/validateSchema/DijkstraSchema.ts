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
            console.log(typeof value)
            return true
        }),


    body("end-point")
        .exists({checkFalsy: true}),


    body("walls")
        .exists({
            checkNull : true
        })
];

export {dijkstraSchema2D}