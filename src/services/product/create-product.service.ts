import prisma from '../../connection';
import { IProductAndFilesProps, IProductImageProps } from './types';

export const createProductService = async({
    files, 
    name, 
    price, 
    description, 
    stock
}: IProductAndFilesProps) => {
    await prisma.$transaction(async(tx: any) => {
        const {id} = await tx.products.create({
            data: {
                name, price, description, stock
            }
        })

        const createImages: IProductImageProps[] = []

        if(files){
            files.forEach(async(item: any) => {
                createImages.push({url: item.filename, productsId: id})
            })
        }
        
        await tx.productImages.createMany({
            data: createImages
        })
    })

}