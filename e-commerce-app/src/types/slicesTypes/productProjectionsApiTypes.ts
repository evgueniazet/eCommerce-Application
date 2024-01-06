import { IBaseGetAllQueryResponse, IBaseIdTypeResponse } from './baseApiResponsesTypes';
import { IProductApiDescriptionResponse } from './productsApiTypes';

export interface ISearchApiResponse extends IProductApiDescriptionResponse {
  id: string;
  key: string;
  productType: IBaseIdTypeResponse;
  taxCategory: IBaseIdTypeResponse;
  version: number;
}

export interface ISearchProductsResponse extends IBaseGetAllQueryResponse<ISearchApiResponse> {
  results: ISearchApiResponse[];
}
