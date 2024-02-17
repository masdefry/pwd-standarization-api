import { Router } from 'express';

const route = Router()

import * as AuthController from '../controllers/AuthController';
import { validateAuthRegistration, handleValidationErrors } from '../middleware/ExpressValidator';

route.post('/', validateAuthRegistration, handleValidationErrors, AuthController.register)
route.post('/login', AuthController.login)

export default route