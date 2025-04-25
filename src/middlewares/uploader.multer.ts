import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { FileFilterCallback } from 'multer';
import path from 'path';

export const uploaderMulter = (
  fileAccepted: string[],
  storageType: string = 'diskStorage'
) => {
  const storage =
    storageType === 'diskStorage'
      ? multer.diskStorage({
          destination: function (
            req: Request,
            file: Express.Multer.File,
            cb: (error: Error | null, destination: string) => void
          ) {
            const mainDirectory = path.join(process.cwd());
            cb(null, `${mainDirectory}/src/public/images`);
          },
          filename: function (
            req: Request,
            file: Express.Multer.File,
            cb: (error: Error | null, destination: string) => void
          ) {
            const splitOriginalName = file.originalname.split('.');
            const fileExtension =
              splitOriginalName[splitOriginalName.length - 1];
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
          },
        })
      : multer.memoryStorage();

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (!fileAccepted.includes(file.mimetype))
      return cb(new Error('File format not accepted'));
    cb(null, true);
  };

  return multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 2 },
  });
};
