"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathfindingScheme2D = void 0;
const express_validator_1 = require("express-validator");
const pathfindingScheme2D = [
    (0, express_validator_1.body)("height")
        .exists({
        checkFalsy: true
    })
        .isInt({
        min: 0
    })
        .toInt()
        .withMessage("Height must be a number > 0"),
    (0, express_validator_1.body)("width")
        .exists({
        checkFalsy: true
    })
        .isInt({
        min: 0
    })
        .toInt()
        .withMessage("Width must be a number > 0"),
    (0, express_validator_1.body)("startPoint")
        .exists({ checkFalsy: true })
        .custom((value) => {
        return Array.isArray(value) && value.length === 2;
    })
        .toArray(),
    (0, express_validator_1.body)("endPoint")
        .exists({ checkFalsy: true })
        .custom((value) => {
        return Array.isArray(value) && value.length === 2;
    })
        .toArray(),
    (0, express_validator_1.body)("walls")
        .exists({
        checkNull: true
    })
        .custom((value) => {
        value.forEach((posCoordinate) => {
            if (posCoordinate.length !== 2) {
                throw new Error();
            }
        });
        return true;
    })
        .toArray()
        .withMessage("Not valid Syntax for walls")
];
exports.pathfindingScheme2D = pathfindingScheme2D;
