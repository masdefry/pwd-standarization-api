import { Router } from "express";

const route = Router()

import * as UserController from '../controllers/UserController';
import { tokenVerify } from "../middleware/TokenVerify";

route.post('/', UserController.register)
route.post('/login', UserController.login)

export default route