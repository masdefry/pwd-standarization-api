"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.validateAuthRegistration = void 0;
const { query, body, validationResult } = require('express-validator');
exports.validateAuthRegistration = [
    body('email', 'username', 'password', 'role').not().isEmpty().withMessage("Please Fill All Field!"),
    body('email').isString().isEmail().withMessage("Please Type an Valid Email Address"),
    body('password').isString().isLength({ min: 6 }).withMessage("Password must Meet a Minimum Requirement of 6 Characters")
];
const handleValidationErrors = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(401).send({ message: error.errors[0].msg });
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
