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
exports.findProductsService = void 0;
const connection_1 = require("../../connection");
const findProductsService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ limit, offset }) {
    const products = yield connection_1.prisma.product.findMany({
        skip: offset,
        take: limit,
        orderBy: {
            createdAt: 'desc',
        },
    });
    const totalProducts = yield connection_1.prisma.product.count();
    const totalPages = Math.ceil(totalProducts / limit);
    return {
        products,
        totalProducts,
        totalPages
    };
});
exports.findProductsService = findProductsService;
