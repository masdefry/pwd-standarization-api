import { Router } from 'express';

const route = Router()

import * as authController from '../controllers/auth.controller';
import { validateAuthRegistration, handleValidationErrors } from '../middleware/express-validator';

route.post('/register', validateAuthRegistration, handleValidationErrors, authController.register)
route.post('/', authController.login)

export default route