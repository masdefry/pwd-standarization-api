import { Router } from 'express';

// Define Variable
const route = Router()

// Import Product Controller
import * as productController from '../controllers/product.controller';

// Import Middleware
import { accessTokenVerify } from '../middleware/token-verify';
import { UploadValidator } from '../middleware/upload-validator';

route.post('/', accessTokenVerify, UploadValidator, productController.createProduct)

export default route