import { Router } from 'express';

// Define Variable
const route = Router()

// Import Product Controller
import * as ProductController from './../controllers/ProductController';

// Import Middleware
import { refreshTokenVerify } from '../middleware/TokenVerify';
import { UploadValidator } from '../middleware/UploadValidator';

route.post('/', refreshTokenVerify, UploadValidator, ProductController.create)

export default route