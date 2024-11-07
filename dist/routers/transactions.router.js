"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactionsRouter = (0, express_1.Router)();
const transactions_controller_1 = require("../controllers/transactions.controller");
const verify_token_1 = require("../middlewares/verify.token");
transactionsRouter.post('/', verify_token_1.verifyToken, transactions_controller_1.createTransaction);
exports.default = transactionsRouter;
