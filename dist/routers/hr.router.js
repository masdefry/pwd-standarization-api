"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hrRouter = (0, express_1.Router)();
const hr_controller_1 = require("../controllers/hr.controller");
const verify_token_1 = require("../middlewares/verify.token");
const verify_role_1 = require("../middlewares/verify.role");
hrRouter.post('/create-user', verify_token_1.verifyToken, verify_role_1.verifyRole, hr_controller_1.createUser);
exports.default = hrRouter;
