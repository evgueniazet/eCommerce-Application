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
export interface IDiscountBaseIdTypeResponse extends IBaseIdTypeResponse {
  typeId: 'product-discount';
}
export interface IDiscountedPriceResponse {
  value: ICurrencyResponse;
  discount: IDiscountBaseIdTypeResponse;
}

export interface IValuePriceProductApiResponse {
  country?: string;
  channel?: IBaseIdTypeResponse;
  discounted?: IDiscountedPriceResponse;
}

export interface IPriceProductApiResponse extends IValuePriceProductApiResponse {
  id: string;
  value: ICurrencyResponse;
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
  version: number;
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
