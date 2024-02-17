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
exports.create = void 0;
const index_1 = require("./../services/products/index");
const ResponseHandler_1 = require("../helpers/ResponseHandler");
const connection_1 = __importDefault(require("../connection"));
const fs_1 = __importDefault(require("fs"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, description, stock } = JSON.parse(req.body.dataProduct);
        yield (0, index_1.createProduct)({
            req,
            name,
            price,
            description,
            stock
        });
        (0, ResponseHandler_1.responseHandler)({
            res: res,
            status: 201,
            message: 'Create Product Success!',
        });
    }
    catch (error) {
        if (req.files) {
            let filesArray = Array.isArray(req.files) ? req.files : req.files['images'];
            filesArray.forEach((item) => {
                fs_1.default.rmSync(item.path);
            });
        }
        next(error);
    }
    finally {
        connection_1.default.$disconnect();
    }
});
exports.create = create;
