import { CountriesType } from '../addressesTypes';
import { IBaseGetAllQueryResponse } from './baseApiResponsesTypes';

export interface ITaxApiResponse {
  amount: number;
  country: CountriesType;
  id: string;
  includedInPrice: boolean;
  name: string;
  rates: [];
  key: string;
}

export interface IGetAllTaxesResponse extends IBaseGetAllQueryResponse<ITaxApiResponse> {
  results: ITaxApiResponse[];
}
