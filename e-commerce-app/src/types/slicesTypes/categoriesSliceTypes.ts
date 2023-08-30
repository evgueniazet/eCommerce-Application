import { ICategoryApiResponse } from './categoriesApiTypes';

export interface ICategoriesFromSlice {
  fetching: boolean;
  categories: ICategoryApiResponse[];
  total: number;
  limit: number;
  offset: number;
  count: number;
}
