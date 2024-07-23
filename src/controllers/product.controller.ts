// Handle Request & Response
import {Request, Response, NextFunction} from 'express';
import { createProductService } from '../services/product/create-product.service';
import prisma from '../connection';
import fs from 'fs';

export const createProduct = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {name, price, description, stock} = JSON.parse(req.body.dataProduct)

            await createProductService({
                files:  Array.isArray(req.files) ? req!.files! : req!.files!['images'], 
                name, 
                price, 
                description, 
                stock
            })
            
            res.status(201).send({
                error: false, 
                message: 'Create Product Success', 
                data: {}
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