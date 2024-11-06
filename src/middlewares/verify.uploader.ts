import { NextFunction, Request, Response } from 'express';

export const verifyUploader = (req: Request, res: Response, next: NextFunction) => {
    try{
       if(!Array.isArray(req?.files) && !req?.files?.images?.length) throw {msg: 'No File Uploaded'}
     
        next()
    }catch(err){
        next(err)
    }
}