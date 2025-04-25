"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = ({ id, role }) => {
    return jsonwebtoken_1.default.sign({ data: { id, role } }, 'jcwd3002', { expiresIn: '1d' });
};
exports.createToken = createToken;
const decodeToken = (token) => {
    return jsonwebtoken_1.default.verify(token, 'jcwd3002');
};
exports.decodeToken = decodeToken;
