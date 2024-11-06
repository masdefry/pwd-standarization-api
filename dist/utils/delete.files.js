"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const deleteFiles = ({ imagesUploaded }) => {
    console.log(imagesUploaded);
    imagesUploaded.images.forEach((item) => {
        fs_1.default.rmSync(item.path);
    });
};
exports.deleteFiles = deleteFiles;
