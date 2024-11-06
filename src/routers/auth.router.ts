import { Router } from 'express';
const authRouter = Router();
import {authLogin, keepAuth} from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/verify.token';

authRouter.post('/', authLogin);
authRouter.get('/', verifyToken, keepAuth)

export default authRouter;