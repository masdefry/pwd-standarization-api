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
exports.deleteFilesTest = exports.uploadFilesTest = void 0;
const cloudinary_1 = require("../../utils/cloudinary");
const cloudinary_2 = require("cloudinary");
const uploadFilesTest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let files;
        if (req.files) {
            files = Array.isArray(req.files)
                ? req.files
                : req.files['images'];
            const imagesUploaded = []; // Get Image Path and Image Filename to Store into DB
            for (const image of files) {
                // Upload Each Image to Cloudinary
                const result = yield (0, cloudinary_1.cloudinaryUpload)(image.path);
                imagesUploaded.push(result.res); // Assuming `res` is Always Defined, Use Non-null Assertion
            }
        }
        res.status(201).json({
            error: false,
            message: 'Upload Files Success',
            data: {}
        });
    }
    catch (error) {
        next(error);
    }
});
exports.uploadFilesTest = uploadFilesTest;
const deleteFilesTest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { imageUrl } = req.params;
        const result = yield cloudinary_2.v2.uploader.destroy(imageUrl);
        res.status(200).json({
            error: false,
            message: 'Delete Files Success',
            data: {}
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteFilesTest = deleteFilesTest;
