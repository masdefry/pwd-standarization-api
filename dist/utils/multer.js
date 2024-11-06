"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMulter = void 0;
const multer_1 = __importDefault(require("multer"));
const uploadMulter = ({ storageType }) => {
    const storage = storageType === 'memory' ?
        multer_1.default.memoryStorage()
        :
            multer_1.default.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, 'src/public/images');
                },
                filename: function (req, file, cb) {
                    const splitOriginalName = file.originalname.split('.');
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + splitOriginalName[splitOriginalName.length - 1]); // images-Date.now-Math.round()
                }
            });
    const fileFilter = (req, file, cb) => {
        const extensionAccepted = ['png', 'jpg', 'jpeg', 'webp', 'svg'];
        const splitOriginalName = file.originalname.split('.');
        if (!extensionAccepted.includes(splitOriginalName[splitOriginalName.length - 1])) {
            return cb(new Error('File Format Not Acceptable'));
        }
        return cb(null, true);
    };
    return (0, multer_1.default)({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 2000000 } });
};
exports.uploadMulter = uploadMulter;
