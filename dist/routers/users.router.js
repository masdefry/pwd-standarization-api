"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_controller_1 = require("../controllers/users.controller");
const express_1 = require("express");
const usersRouter = (0, express_1.Router)();
const verify_uploader_1 = require("../middlewares/verify.uploader");
const verify_token_1 = require("../middlewares/verify.token");
const create_profile_validator_1 = require("../middlewares/validator/create.profile.validator");
const express_validator_error_handling_1 = require("../middlewares/validator/express.validator.error.handling");
const multer_1 = require("../utils/multer");
usersRouter.post('/', verify_token_1.verifyToken, (0, multer_1.uploadMulter)({ storageType: 'disk' }).fields([{ name: 'images', maxCount: 3 }]), verify_uploader_1.verifyUploader, create_profile_validator_1.createProfileValidator, express_validator_error_handling_1.expressValidatorErrorHandling, users_controller_1.createProfile);
usersRouter.get('/', verify_token_1.verifyToken, users_controller_1.findProfile);
usersRouter.put('/', verify_token_1.verifyToken, (0, multer_1.uploadMulter)({ storageType: 'disk' }).fields([{ name: 'images', maxCount: 3 }]), verify_uploader_1.verifyUploader, users_controller_1.updateProfile);
exports.default = usersRouter;
