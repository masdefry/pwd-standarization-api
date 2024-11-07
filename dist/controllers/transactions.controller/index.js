"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = void 0;
const transactions_service_1 = require("../../services/transactions.service");
const createTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { total, productItems } = req.body;
        const usersId = (_a = req === null || req === void 0 ? void 0 : req.auth) === null || _a === void 0 ? void 0 : _a.usersId;
        yield (0, transactions_service_1.createTransactionService)({ total, productItems, usersId });
        res.status(201).json({
            message: 'Create Transaction Success'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createTransaction = createTransaction;
