import {
  IBaseGetAllQueryResponse,
  ICategoryTypeResponse,
  IMetaDescriptionProductResponse
} from './baseApiResponsesTypes';

export interface IProductApiDescriptionResponse {
  categories: ICategoryTypeResponse[],
  categoryOrderHints: object,
  masterVariant: object,
  metaDescription: IMetaDescriptionProductResponse,
  name: IMetaDescriptionProductResponse,
  searchKeywords: object,
  slug: IMetaDescriptionProductResponse,
  variants: [],

}

export interface IMasterDataProductApiResponse {
  current: IProductApiDescriptionResponse;
  hasStagedChanges: boolean;
  published: boolean;
  staged: IProductApiDescriptionResponse;
}

export interface IProductApiResponse {
  id: string;
  key: string;
  masterData: object;
  productType: ICategoryTypeResponse;
  taxCategory: ICategoryTypeResponse;
}

export interface IGetAllProductsResponse extends IBaseGetAllQueryResponse<IProductApiResponse> {
  results: IProductApiResponse[];
}

export interface IGetAllProductsRequest {
  token: string,
  params?: {
    limit?: number,
    offset?: number
  }
}
