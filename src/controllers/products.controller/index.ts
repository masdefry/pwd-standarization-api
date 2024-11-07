import { NextFunction, Request, Response } from 'express';
import { findProductsService } from '../../services/products.service';

export const findProducts = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let {search, categoryId} = req.query as {search: string, categoryId: string};

        const page = parseInt(req.query.page as string) || 1;
        const limit = 5
        const offset = (page-1) * limit;

        const {products, totalProducts, totalPages} = await findProductsService({ limit, offset, search, categoryId: categoryId? parseInt(categoryId) : categoryId  })
        
        res.status(200).json({
            error: false, 
            message: 'Get Products Success', 
            data: {
                page, 
                limit,
                offset, 
                products, 
                totalProducts, 
                totalPages
            }
        })
    } catch (error) {
        next(error)
    }
}