import { Router } from 'express';

// Define Variable
const route = Router()

// Import Product Controller
import * as UserController from './../controllers/UserController';

// Import Middleware
import { accessTokenVerify } from '../middleware/TokenVerify';
import { roleVerifyUser } from '../middleware/RoleVerify';

route.post('/address', accessTokenVerify, roleVerifyUser, UserController.createAddress)
route.get('/address', accessTokenVerify, roleVerifyUser, UserController.findAddresses)

export default route