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
exports.regenerateToken = exports.accessTokenVerify = exports.refreshTokenVerify = void 0;
const JWT_1 = require("../lib/JWT");
const JWT_2 = require("../lib/JWT");
const auth_1 = require("../services/auth");
const refreshTokenVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authrefreshkey;
        const decodedRefreshPayload = yield (0, JWT_1.jwtVerify)(token);
        req.decodedRefreshPayload = decodedRefreshPayload;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.refreshTokenVerify = refreshTokenVerify;
const accessTokenVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authaccesskey;
        const validateResult = yield (0, auth_1.validateAccessKey)({ accessToken: token });
        if (!validateResult)
            throw { denied: true, message: 'Access Key Not Valid!' };
        const decodedAccessPayload = yield (0, JWT_1.jwtVerify)(token);
        if (decodedAccessPayload.role !== 'USER')
            throw { denied: true, message: 'Access Denied!' };
        req.decodedAccessPayload = decodedAccessPayload;
        next();
    }
    catch (error) {
        if (error.denied)
            next(error);
        next();
    }
});
exports.accessTokenVerify = accessTokenVerify;
const regenerateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let decodedRefreshPayload = req.decodedRefreshPayload;
        let decodedAccessPayload = req.decodedAccessPayload;
        if (!decodedAccessPayload && decodedRefreshPayload) {
            let accessToken = yield (0, JWT_2.jwtCreate)({ id: decodedRefreshPayload.id, role: decodedRefreshPayload.role, expiryIn: '300s' });
            yield (0, auth_1.saveAccessKey)({
                accessToken: accessToken.token,
                userId: decodedRefreshPayload.id
            });
            req.decodedAccessPayload = decodedRefreshPayload;
            req.newAccessToken = accessToken;
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.regenerateToken = regenerateToken;
