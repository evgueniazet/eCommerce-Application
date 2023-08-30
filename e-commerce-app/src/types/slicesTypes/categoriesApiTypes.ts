import { IBaseGetAllQueryResponse, ICategoryTypeResponse } from './baseApiResponsesTypes';

export interface ICategoryName {
  en: string;
}

export interface ICategoryApiResponse {
  ancestors: ICategoryTypeResponse[];
  assets: [];
  id: string;
  key: string;
  name: ICategoryName;
  orderHint: string;
  parent?: ICategoryTypeResponse;
  slug: ICategoryName;
  version: number;
}

export interface IGetAllCategoriesResponse extends IBaseGetAllQueryResponse<ICategoryApiResponse>{
  results: ICategoryApiResponse[];
}
