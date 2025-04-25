export interface QueryParamsProps {
  limit: number;
  offset: number;
  search?: string;
}

export interface ProductProps {
  id: number;
  name: string;
  price: string;
  stocks: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}