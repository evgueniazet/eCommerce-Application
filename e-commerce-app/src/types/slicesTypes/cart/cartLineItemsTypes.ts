import { IBaseIdTypeResponse, ICurrencyResponse } from '../baseApiResponsesTypes';
import { IImageProductApiResponse, IPriceProductApiResponse } from '../productsApiTypes';

export interface IProductType extends IBaseIdTypeResponse {
  typeId: 'product-type';
  version: number;
}

export interface IAttributeCartLineItem {
  name: string;
  value: string;
}

export interface ISubState extends IBaseIdTypeResponse {
  typeId: 'state';
}
export interface IStateLineItem {
  quantity: number;
  state: ISubState;
}

export interface IIncludedDiscounts {
  discount: IBaseIdTypeResponse;
  discountedAmount: ICurrencyResponse;
}

export interface IDiscountedPriceCart {
  value: ICurrencyResponse;
  includedDiscounts: IIncludedDiscounts[];
}

export interface ICartLineItem {
  id: string;
  productId: string;
  productKey: string;
  name: {
    en: string;
  };
  productType: IProductType;
  productSlug: {
    en: string;
  };
  variant: {
    id: number;
    sku: string;
    key: string;
    prices: IPriceProductApiResponse[];
    images: IImageProductApiResponse[];
    attributes: IAttributeCartLineItem[];
    assets: [];
  };
  price: IPriceProductApiResponse;
  quantity: number;
  discountedPrice: IDiscountedPriceCart;
  discountedPricePerQuantity: [];
  perMethodTaxRate: [];
  state: [];
  priceMode: string;
  lineItemMode: string;
  totalPrice: ICurrencyResponse;
  taxedPricePortions: [];
}
