import {
  IBaseGetAllQueryResponse,
  IBaseIdTypeResponse,
  ICurrencyResponse,
  IMetaDescriptionProductResponse,
} from './baseApiResponsesTypes';
import { IBaseQueryParams } from './baseApiRequestsTypes';

export interface IAttributeProductApiResponse {
  name: string;
  value: string;
}

export interface IImageProductApiResponse {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

export interface IValuePriceProductApiResponse extends ICurrencyResponse {
  country: string;
  channel: IBaseIdTypeResponse;
}

export interface IPriceProductApiResponse {
  id: string;
  value: IValuePriceProductApiResponse;
}

export interface IMasterVariantProductApiResponse {
  assets: [];
  attributes: IAttributeProductApiResponse[];
  id: number;
  images: IImageProductApiResponse[];
  key: string;
  prices: IPriceProductApiResponse[];
  sku: string;
}

export interface IProductApiDescriptionResponse {
  categories: IBaseIdTypeResponse[];
  categoryOrderHints: object;
  masterVariant: IMasterVariantProductApiResponse;
  metaDescription: IMetaDescriptionProductResponse;
  name: IMetaDescriptionProductResponse;
  searchKeywords: object;
  slug: IMetaDescriptionProductResponse;
  variants: [];
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
  masterData: IMasterDataProductApiResponse;
  productType: IBaseIdTypeResponse;
  taxCategory: IBaseIdTypeResponse;
}

export interface IGetAllProductsResponse extends IBaseGetAllQueryResponse<IProductApiResponse> {
  results: IProductApiResponse[];
}

export interface IGetAllProductsRequest {
  token: string;
  params?: IBaseQueryParams;
}

export interface IGetProductByIdRequest {
  token: string;
  productId: string;
}
