"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
const auth_controller_1 = require("../controllers/auth.controller");
const verify_token_1 = require("../middlewares/verify.token");
authRouter.post('/', auth_controller_1.authLogin);
authRouter.get('/', verify_token_1.verifyToken, auth_controller_1.keepAuth);
exports.default = authRouter;
