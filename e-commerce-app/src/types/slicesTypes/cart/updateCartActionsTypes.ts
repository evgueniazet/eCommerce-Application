import { IBaseCurrency, IBaseIdTypeResponse } from '../baseApiResponsesTypes';
import { IMyCustomerApiAddressRequest } from '../../addressesTypes';

export interface IAddLineItemCart {
  action: 'addLineItem',
  productId: string,
  variantId: number,
  quantity: number
}

export interface IRemoveLineItemCart {
  action: 'removeLineItem',
  lineItemId: string,
  quantity: number,
  externalPrice?: IBaseCurrency,
  shippingDetailsToRemove?: {
    targets: {
      addressKey: string
      quantity: number
    }
  }
}

export interface IAddDiscountCodeCart {
  action: 'addDiscountCode';
  code: string;
}

export interface IDiscountCodeCart extends IBaseIdTypeResponse {
  typeId: 'discount-code';
}

export interface IRemoveDiscountCodeCart {
  action: 'removeDiscountCode';
  discountCode: IDiscountCodeCart;
}

export interface IPaymentCart extends IBaseIdTypeResponse {
  typeId: 'payment';
}

export interface IAddPaymentCart {
  action: 'addPayment',
  payment: IPaymentCart,
}

export interface IRemovePaymentCart {
  action: 'removePayment',
  payment: IPaymentCart,
}

export interface IChangeTaxModeCart {
  action: 'changeTaxMode',
  taxMode: 'Platform' | 'External' | 'ExternalAmount' | 'Disabled'
}

export interface ISetBillingAddressCart {
  action: 'setBillingAddress';
  address: IMyCustomerApiAddressRequest;
}

export interface ISetShippingAddressCart {
  action: 'setShippingAddress';
  address: IMyCustomerApiAddressRequest;
}

export interface IAddItemShippingAddressCart {
  action: 'addItemShippingAddress',
  address: IMyCustomerApiAddressRequest,
}

export interface IRemoveItemShippingAddressCart {
  action: 'removeItemShippingAddress';
  addressKey: string;
}

export interface IUpdateItemShippingAddressCart {
  action: 'updateItemShippingAddress',
  address: string,
}

export interface IShippingMethod extends IBaseIdTypeResponse {
  typeId: 'shipping-method';
}

export interface ISetShippingMethodCart {
  action: 'setShippingMethod';
  shippingMethod: IShippingMethod;
}

export interface ISetLocaleCart {
  action: 'setLocale';
  locale: string;
}

export interface ISetCountryCart {
  action: 'setCountry';
  country: 'DE';
}

export interface ISetDeleteDaysAfterLastModificationCart {
  action: 'setDeleteDaysAfterLastModification';
  deleteDaysAfterLastModification: number;
}

export interface IRecalculateCart {
  action: 'recalculate';
  updateProductData: boolean;
}

export type IActionCart =
  IRecalculateCart
  | ISetDeleteDaysAfterLastModificationCart
  | ISetCountryCart
  | ISetLocaleCart
  | ISetShippingMethodCart
  | IPaymentCart
  | IUpdateItemShippingAddressCart
  | IRemoveItemShippingAddressCart
  | IAddItemShippingAddressCart
  | ISetShippingAddressCart
  | ISetBillingAddressCart
  | IChangeTaxModeCart
  | IRemovePaymentCart
  | IAddPaymentCart
  | IRemoveDiscountCodeCart
  | IAddDiscountCodeCart
  | IRemoveLineItemCart
  | IAddLineItemCart
