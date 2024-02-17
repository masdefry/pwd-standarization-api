// Handle Request & Response
import {Request, Response, NextFunction} from 'express';
import { createProductService } from './../services/products/index';
import { responseHandler } from '../helpers/ResponseHandler';
import prisma from '../connection';
import fs from 'fs';

export const createProduct = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {name, price, description, stock} = JSON.parse(req.body.dataProduct)

            await createProductService({
                req, 
                name, 
                price, 
                description, 
                stock
            })
            
            responseHandler({
                res: res,
                status: 201,
                message: 'Create Product Success!',
            })
        } catch (error) {
            if(req.files){
                let filesArray = Array.isArray(req.files) ? req.files : req.files['images'];
                filesArray.forEach((item: any) => {
                    fs.rmSync(item.path)
                })
            }
            
            next(error)
        } finally {
            prisma.$disconnect()
        }
}