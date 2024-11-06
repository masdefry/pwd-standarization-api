import {body} from 'express-validator'

export const createProfileValidator = [
    body(['birthDate', 'phoneNumber', 'address']).notEmpty().withMessage('Birthdate, Phone Number and Address is Required'),
    body('birthDate').isString().escape(),
    body('phoneNumber').isString().escape(),
    body('address').isString().escape()
]