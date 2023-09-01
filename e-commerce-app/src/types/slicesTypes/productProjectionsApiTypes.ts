import { IBaseGetAllQueryResponse, ICategoryTypeResponse } from './baseApiResponsesTypes';
import { IProductApiDescriptionResponse } from './productsApiTypes';

export interface ISearchApiResponse extends IProductApiDescriptionResponse {
  id: string;
  key: string;
  productType: ICategoryTypeResponse;
  taxCategory: ICategoryTypeResponse;
}

export interface ISearchProductsResponse extends IBaseGetAllQueryResponse<ISearchApiResponse>{
  results: ISearchApiResponse[];
}
