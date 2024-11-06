"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfileValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createProfileValidator = [
    (0, express_validator_1.body)(['birthDate', 'phoneNumber', 'address']).notEmpty().withMessage('Birthdate, Phone Number and Address is Required'),
    (0, express_validator_1.body)('birthDate').isString().escape(),
    (0, express_validator_1.body)('phoneNumber').isString().escape(),
    (0, express_validator_1.body)('address').isString().escape()
];
