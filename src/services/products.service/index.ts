import { prisma } from "../../connection"

export const findProductsService = async({ limit, offset }: {limit: number, offset: number}) => {
    const products = await prisma.product.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          createdAt: 'desc', 
        },
    });

    const totalProducts = await prisma.product.count();
    const totalPages = Math.ceil(totalProducts / limit);

    return {
        products, 
        totalProducts, 
        totalPages
    }
}