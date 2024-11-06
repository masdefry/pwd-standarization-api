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
exports.updateProfileService = exports.findProfileService = exports.createProfileService = void 0;
const connection_1 = require("../../connection");
const delete_files_1 = require("../../utils/delete.files");
const createProfileService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ imagesUploaded, birthDate, phoneNumber, address, usersId }) {
    yield connection_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const createdUserProfile = yield tx.userProfile.create({
            data: {
                birthDate: new Date(birthDate),
                phoneNumber,
                address,
                usersId
            }
        });
        const imagesToCreate = imagesUploaded.images.map((image) => {
            return { imageUrl: image.filename, directory: image.destination, userProfilesId: createdUserProfile.id };
        });
        yield tx.userProfileImage.createMany({
            data: imagesToCreate
        });
    }));
});
exports.createProfileService = createProfileService;
const findProfileService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ usersId }) {
    return yield connection_1.prisma.userProfile.findFirst({
        where: { usersId },
        include: {
            userProfileImage: {
                select: {
                    imageUrl: true,
                    directory: true
                }
            }
        },
    });
});
exports.findProfileService = findProfileService;
const updateProfileService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ birthDate, address, phoneNumber, usersId, imagesUploaded }) {
    yield connection_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // Step-01 Update Profile to Update by usersId
        const updateProfile = yield tx.userProfile.update({
            data: {
                birthDate: new Date(birthDate),
                address,
                phoneNumber
            },
            where: {
                usersId
            }
        });
        // Step-02 Find Image User from UserImageProfile by userProfileId
        const findProfileImages = yield tx.userProfileImage.findMany({
            where: {
                userProfilesId: updateProfile.id
            }
        });
        // Step-04 Delete Current Data Image on UserImageProfile > Create New Data Image on UserImageProfile v
        yield tx.userProfileImage.deleteMany({
            where: {
                userProfilesId: updateProfile.id
            }
        });
        const imagesToCreate = imagesUploaded.images.map((image) => {
            return { imageUrl: image.filename, directory: image.destination, userProfilesId: updateProfile.id };
        });
        yield tx.userProfileImage.createMany({
            data: imagesToCreate
        });
        // Step-03 Delete Image User File Based on Step-02
        const imagesToDelete = findProfileImages.map((image) => {
            return { path: `${image.directory}/${image.imageUrl}` };
        });
        (0, delete_files_1.deleteFiles)({ imagesUploaded: { images: imagesToDelete } });
    }));
});
exports.updateProfileService = updateProfileService;
