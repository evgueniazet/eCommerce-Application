import { ITaxApiResponse } from './taxApiTypes';

export interface ITaxFromSlice {
  fetching: boolean;
  taxes: ITaxApiResponse[];
  total: number;
  limit: number;
  offset: number;
  count: number;
}
