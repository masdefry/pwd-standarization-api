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
exports.verifyToken = void 0;
const jwt_1 = require("../utils/jwt");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { authorization } = req.headers;
        authorization = authorization === null || authorization === void 0 ? void 0 : authorization.split(' ')[1];
        if (!authorization)
            throw { msg: 'Token Not Found', status: 400 };
        const decodedToken = (0, jwt_1.decodeToken)(authorization);
        if (typeof decodedToken !== 'string' && 'data' in decodedToken) {
            req.auth = {
                usersId: decodedToken.data.id,
                authorizationRole: decodedToken.data.role,
            };
        }
        next();
    }
    catch (error) {
        // Menuju ke Centralized Error
        next(error);
    }
});
exports.verifyToken = verifyToken;
