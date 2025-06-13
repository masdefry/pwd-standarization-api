import { prisma } from '../../connection'
import { Prisma } from '@prisma/client';
import { QueryParamsProps } from './types';

export const findProductsService = async({ limit, offset, search, categoryId }: Pick<QueryParamsProps, 'limit' | 'offset' | 'search'> & { categoryId: number | string }) => {
    let whereClause: Prisma.ProductWhereInput = {};

    if (search) {
        whereClause = {
          name: {
            contains: search
          },
        };
    }
    if (categoryId) {
        whereClause = {
          ...whereClause,
          category: { equals: categoryId }
        };
      }
    
    const products = await prisma.product.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          createdAt: 'desc', 
        },
        where: whereClause
        
    });

    const totalProducts = await prisma.product.count();
    const totalPages = Math.ceil(totalProducts / limit);

    return {
        products, 
        totalProducts, 
        totalPages
    }
}