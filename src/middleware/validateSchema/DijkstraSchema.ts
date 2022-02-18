import { body } from "express-validator"


const dijkstraSchema2D = [
    body("height")
        .isInt()
        .withMessage("Height must be a number"),
    body()

]