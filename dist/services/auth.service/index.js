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
exports.keepAuthService = exports.authLoginService = void 0;
const connection_1 = require("../../connection");
const hash_password_1 = require("../../utils/hash.password");
const authLoginService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    const findUsers = yield connection_1.prisma.user.findMany({
        where: { email }
    });
    if (!findUsers.length)
        throw { msg: 'Email Belum Terdaftar', status: 400 };
    const isComparePassword = yield (0, hash_password_1.comparePassword)(password, findUsers[0].password);
    if (!isComparePassword)
        throw { msg: 'Password Tidak Sesuai', status: 400 };
    return findUsers;
});
exports.authLoginService = authLoginService;
const keepAuthService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
    const findUser = yield connection_1.prisma.user.findUnique({
        where: { id }
    });
    if (!(findUser === null || findUser === void 0 ? void 0 : findUser.id))
        throw { msg: 'User Tidak Ditemukan', status: 400 };
    return findUser;
});
exports.keepAuthService = keepAuthService;
