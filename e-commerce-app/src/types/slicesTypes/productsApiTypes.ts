import {
  IBaseGetAllQueryResponse,
  ICategoryTypeResponse,
  IMetaDescriptionProductResponse,
} from './baseApiResponsesTypes';

export interface IAttributeProductApiResponse {
  name: string
  value: string
}
export interface IImageProductApiResponse {
  url: string,
  dimensions: {
    w: number,
    h: number
  }
}
export interface IValuePriceProductApiResponse {
  type: string
  currencyCode: string
  centAmount: number
  fractionDigits: number
  country: string
  channel: ICategoryTypeResponse
}
export interface IPriceProductApiResponse {
  id: string
  value: IValuePriceProductApiResponse
}
export interface IMasterVariantProductApiResponse {
  assets: []
  attributes: IAttributeProductApiResponse[]
  id: number
  images: IImageProductApiResponse[]
  key: string
  prices: IPriceProductApiResponse[]
  sku: string
}

export interface IProductApiDescriptionResponse {
  categories: ICategoryTypeResponse[];
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
  productType: ICategoryTypeResponse;
  taxCategory: ICategoryTypeResponse;
}

export interface IGetAllProductsResponse extends IBaseGetAllQueryResponse<IProductApiResponse> {
  results: IProductApiResponse[];
}

export interface IGetAllProductsRequest {
  token: string;
  params?: {
    limit?: number;
    offset?: number;
  };
}
