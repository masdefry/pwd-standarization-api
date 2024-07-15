import prisma from '../../connection';
import { ICreateProductProps } from './types';

export const createProductService = async({
    req, 
    name, 
    price, 
    description, 
    stock
}: ICreateProductProps) => {
    await prisma.$transaction(async(tx: any) => {
        const {id} = await tx.products.create({
            data: {
                name, price, description, stock
            }
        })

        const createImages: any[] = []

        if(req.files){
            let filesArray = Array.isArray(req.files) ? req.files : req.files['images'];
            filesArray.forEach(async(item: any) => {
                createImages.push({url: item.filename, productsId: id})
            })
        }
        
        await tx.productImages.createMany({
            data: createImages
        })
    })

}