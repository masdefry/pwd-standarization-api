import { Request, Response, NextFunction } from 'express';
import { upload } from '../lib/multer';

import fs from 'fs';

export const UploadValidator = (req: Request, res: Response, next: NextFunction) => {
    const uploadResult = upload.fields([{name: 'images', maxCount: 3}])

    uploadResult(req, res, (err) => {
        try {
            if(err) throw err

            let isError = ''

            let filesArray: any = []
            if (req.files) {
              filesArray = Array.isArray(req.files) ? req.files : req.files['bebas'];

                if (Array.isArray(filesArray)) {
                  filesArray.forEach((item: Express.Multer.File) => {
                    if (item.size > 5000000000000) {
                      isError += `${item.originalname} Size too Large. Maximum Size 5Kb`;
                    }
                  });
                }
              }

            if(isError) throw {message: isError, images: filesArray}

            next()
        } catch (error: any) {
            if(error.images){
              error.images.forEach((item: any) => {
                fs.rmSync(item.path)
              })
            }

            res.status(500).send({
                error: true, 
                message: `[Upload Failed] ${error.message}`, 
                data: null
            })
        }
    })
}