import { IBaseGetAllQueryResponse, IBaseIdTypeResponse } from './baseApiResponsesTypes';

export interface ICategoryName {
  en: string;
}

export interface ICategoryApiResponse {
  ancestors: IBaseIdTypeResponse[];
  assets: [];
  id: string;
  key: string;
  name: ICategoryName;
  orderHint: string;
  parent?: IBaseIdTypeResponse;
  slug: ICategoryName;
  version: number;
}

export interface IGetAllCategoriesResponse extends IBaseGetAllQueryResponse<ICategoryApiResponse> {
  results: ICategoryApiResponse[];
}
