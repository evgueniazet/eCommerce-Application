import { SortFormType } from '../searchProductsTypes/filterFormTypes';

export interface IQueryParamsFromSlice {
  limit: number;
  offset: number;
  text: string;
  sort: SortFormType;
  centAmount: number[];
  categories: string;
}
