"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsRouter = (0, express_1.Router)();
const products_controller_1 = require("../controllers/products.controller");
productsRouter.get('/', products_controller_1.findProducts);
exports.default = productsRouter;
