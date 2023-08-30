import { IProductApiResponse } from './productsApiTypes';

export interface IProductsFromSlice {
  fetching: boolean;
  products: IProductApiResponse[];
  total: number;
  limit: number;
  offset: number;
  count: number;
}
