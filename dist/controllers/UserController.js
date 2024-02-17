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
exports.findAddresses = exports.createAddress = void 0;
const ResponseHandler_1 = require("../helpers/ResponseHandler");
const user_1 = require("../services/user");
const createAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedAccessPayload = req.decodedAccessPayload;
        const newAccessToken = req.newAccessToken;
        const { receiver, phoneNumber, address } = req.body;
        const createdAddress = yield (0, user_1.createAddressService)({
            req,
            id: decodedAccessPayload.id,
            receiver,
            phoneNumber,
            address
        });
        (0, ResponseHandler_1.responseHandler)({
            res: res,
            status: 201,
            message: 'Create Address Success!',
            data: {
                createdAddress,
                newAccessToken: newAccessToken || null
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createAddress = createAddress;
const findAddresses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedAccessPayload = req.decodedAccessPayload;
        const newAccessToken = req.newAccessToken;
        const addresses = yield (0, user_1.findAddressesService)({
            req,
            id: decodedAccessPayload.id
        });
        (0, ResponseHandler_1.responseHandler)({
            res: res,
            message: 'Find Address Success!',
            data: {
                addresses,
                newAccessToken: newAccessToken || null
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.findAddresses = findAddresses;
