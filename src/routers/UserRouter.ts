import { Router } from 'express';

// Define Variable
const route = Router()

// Import Product Controller
import * as UserController from './../controllers/UserController';

// Import Middleware
import { refreshTokenVerify, accessTokenVerify, regenerateToken } from '../middleware/TokenVerify';

route.post('/', refreshTokenVerify, accessTokenVerify, regenerateToken, UserController.create)

export default route