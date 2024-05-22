import { Request, NextFunction, Response } from 'express';

const { query, body, validationResult } = require('express-validator');

export const validateAuthRegistration = [
    body('email', 'username', 'password', 'role').not().isEmpty().withMessage("Please Fill All Field!"),
    body('email').isString().isEmail().withMessage("Please Type an Valid Email Address"),
    body('password').isString().isLength({min:6}).withMessage("Password must Meet a Minimum Requirement of 6 Characters") 
]

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return res.status(401).send(
            {message: error.errors[0].msg}
        )
    }
    next()
}