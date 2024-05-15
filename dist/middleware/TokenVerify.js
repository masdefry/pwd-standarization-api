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
const refreshTokenVerify = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Cek, Apakah RefreshToken Valid & Belum Expiry
        return yield (0, JWT_1.jwtVerify)(refreshToken);
    }
    catch (error) {
        // Apabila RefreshToken Expiry
        throw Object.assign(Object.assign({}, error), { isExpiryRefresh: true });
    }
});
exports.refreshTokenVerify = refreshTokenVerify;
const accessTokenVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.headers.authaccesskey;
        const refreshToken = req.headers.authrefreshkey;
        // Cek, Apakah AccessToken Dikirim dari Client
        if (!accessToken)
            throw { status: 401, message: 'Unauthorized! Token Must Provide!' };
        if (accessToken && refreshToken) {
            const decodedRefreshPayload = yield (0, exports.refreshTokenVerify)(refreshToken);
            // Apabila RefreshToken Masih Valid, Generate AccessToken Baru
            console.log(decodedRefreshPayload);
            console.log('>>>');
        }
        // Cek, Apakah AccessToken Menggunakan Latest AccessToken?
        const validateAccessKeyResult = yield (0, auth_1.validateAccessKey)({ accessToken: accessToken });
        if (!validateAccessKeyResult)
            throw { status: 401, message: 'Unauthorized! Token Invalid!' };
        // Verify, Apakah AccessToken Valid & Belum Expiry
        const decodedAccessPayload = yield (0, JWT_1.jwtVerify)(accessToken);
        req.decodedAccessPayload = decodedAccessPayload;
        next();
    }
    catch (error) {
        if (error.message === 'jwt expired' && error.isExpiryRefresh) {
            next(Object.assign(Object.assign({}, error), { isExpiryToken: 'refresh' }));
        }
        // Apabila AccessToken Expiry, Kirim Response isExpiryAccess = true
        // untuk Kebutuhan Axios Interceptor Supaya Dapat Mengirimkan
        // RefreshToken untuk Pembaharuan AccessToken 
        if (error.message === 'jwt expired') {
            next(Object.assign(Object.assign({}, error), { isExpiryToken: 'access' }));
        }
        next(error);
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
