import { Router } from 'express';

// Define Variable
const route = Router()

// Import Address Controller
import * as addressController from '../controllers/address.controller';

// Import Middleware
import { accessTokenVerify } from '../middleware/token-verify';
import { roleVerifyUser } from '../middleware/role-verify';

route.post('/', accessTokenVerify, roleVerifyUser, addressController.createAddress)
route.get('/', accessTokenVerify, roleVerifyUser, addressController.findAddress)

export default route