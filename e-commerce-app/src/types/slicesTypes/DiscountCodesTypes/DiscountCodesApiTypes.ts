import {
  IBaseGetAllQueryResponse,
  IBaseIdTypeResponse,
  IMetaDescriptionProductResponse,
} from '../baseApiResponsesTypes';

export interface ICartDiscountIdType extends IBaseIdTypeResponse {
  typeId: 'cart-discount';
}

export interface IDiscountCodesResponse {
  attributeTypes: object;
  cartDiscounts: ICartDiscountIdType[];
  cartFieldTypes: object;
  code: string;
  customLineItemFieldTypes: object;
  description: IMetaDescriptionProductResponse;
  groups: [];
  id: string;
  isActive: boolean;
  lineItemFieldTypes: object;
  name: IMetaDescriptionProductResponse;
  references: [];
  validFrom: string;
  validUntil: string;
  version: number;
}

export interface IGetDiscountCodesResponse
  extends IBaseGetAllQueryResponse<IDiscountCodesResponse> {
  results: IDiscountCodesResponse[];
}
