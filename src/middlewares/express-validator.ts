import { Request, NextFunction, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateAuthRegistration = [
    body('email', 'username', 'password', 'role').not().isEmpty().withMessage('All Field is Required'),
    body('email').isString().isEmail().withMessage('Email Address is Invalid'),
    body('password').isString().isLength({min:6}).withMessage('Password must Meet a Minimum Requirement of 6 Characters') 
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