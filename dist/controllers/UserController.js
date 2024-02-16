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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const connection_1 = __importDefault(require("../connection"));
const HashPassword_1 = require("../lib/HashPassword");
const JWT_1 = require("../lib/JWT");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password, role } = req.body;
        if (!email || !username || !password || !role)
            throw { message: 'Data Not Complete!' };
        const hashedPassword = yield (0, HashPassword_1.hashPassword)(password);
        const createUser = yield connection_1.default.users.create({
            data: {
                email,
                username,
                password: hashedPassword,
                role
            }
        });
        res.status(200).send({
            error: false,
            message: 'Register Success',
            data: null
        });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield connection_1.default.users.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: email }
                ]
            }
        });
        if (user === null)
            throw { message: 'Username or Email Not Found' };
        const isComparePassword = yield (0, HashPassword_1.hashMatch)(password, user.password);
        if (isComparePassword === false)
            throw { message: 'Password Doesnt Match' };
        /*
            accessToken: Digunakan untuk mengambil resource (Token Utama)
            refreshToken: Digunakan untuk authorization

            Mengapa expiry date accessToken hanya sebentar dibanding refreshToken?
            Untuk menghindari pencurian token/penyalahgunaan token. Sehingga
            accessToken harus sering diperbarui.

            Dalam implementasinya, ketika accessToken expired, maka
            client akan mengirimkan refreshToken untuk generate accessToken
            baru. Sehingga user tidak perlu login ulang untuk mendapatkan
            accessToken yang baru.
        */
        const accessToken = yield (0, JWT_1.jwtCreate)({ id: user.id, role: user.role, expiryIn: '1h' });
        const refreshToken = yield (0, JWT_1.jwtCreate)({ id: user.id, role: user.role, expiryIn: '7d' });
        /*
            Untuk mendapatkan expiry date dari accessToken dan refreshToken.
            Kegunaannya untuk pengecekan di sisi frontend,
            supaya tidak perlu selalu request ke backend untuk pengecekan
            token nya sudah expired atau belum. Apabila
            token expired, maka dari sisi frontend perlu
            melakukan request generate token baru.
        */
        const expAccessToken = yield (0, JWT_1.jwtVerify)(accessToken);
        const expRefreshToken = yield (0, JWT_1.jwtVerify)(refreshToken);
        res.status(200).send({
            error: false,
            message: 'Login Success',
            data: {
                username: user.username,
                role: user.role,
                accessToken: {
                    token: accessToken,
                    expiry: expAccessToken.exp
                },
                refreshToken: {
                    token: refreshToken,
                    expiry: expRefreshToken.exp
                }
            }
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.login = login;
