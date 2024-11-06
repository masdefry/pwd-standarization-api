"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlingValidator = void 0;
const express_validator_1 = require("express-validator");
const errorHandlingValidator = (req, res, next) => {
    try {
        const errorResult = (0, express_validator_1.validationResult)(req);
        if (errorResult.isEmpty() === false) {
            throw { msg: errorResult.array()[0].msg, status: 406 };
        }
        else {
            next();
        }
    }
    catch (error) {
        next(error);
    }
};
exports.errorHandlingValidator = errorHandlingValidator;
