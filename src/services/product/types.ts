export interface IProductProps{
    name: string;
    price: number;
    description: string;
    stock: number;
}

export interface IProductAndFilesProps extends IProductProps{
    files: Express.Multer.File[]
}

export interface IProductImageProps{
    url: string,
    productsId: string
}