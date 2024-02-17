import { Router } from 'express';

// Define Variable
const route = Router()

// Import Product Controller
import * as UserController from './../controllers/UserController';

// Import Middleware
import { refreshTokenVerify, accessTokenVerify, regenerateToken } from '../middleware/TokenVerify';

route.post('/address', refreshTokenVerify, accessTokenVerify, regenerateToken, UserController.createAddress)
route.get('/address', refreshTokenVerify, accessTokenVerify, regenerateToken, UserController.findAddresses)

export default route