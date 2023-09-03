import { SortFormType } from '../searchProductsTypes/filterFormTypes';

export interface IBaseQueryParams {
  limit?: number;
  offset?: number;
  ['text.en']?: string;
  ['name.en']?: string;
  fuzzy?: boolean;
  fuzzyLevel?: 0 | 1 | 2;
  sort?: SortFormType | string;
  resultPath?: string;
  filter?: string[];
}
