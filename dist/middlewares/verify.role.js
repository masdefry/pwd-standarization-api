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
exports.verifyRole = void 0;
const verifyRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorizationRole } = req.auth;
        if (authorizationRole !== 'HR')
            throw { msg: 'User Unauthorized', status: 401 };
        next();
    }
    catch (error) {
        // Menuju ke Centralized Error
        next(error);
    }
});
exports.verifyRole = verifyRole;
