import { ICurrencyResponse } from '../baseApiResponsesTypes';
import { ICartLineItem } from './cartLineItemsTypes';
import { IDiscountCodesCart } from '../DiscountCodesTypes/DiscountCodesCart';

export interface ICartApiResponse {
  cartState: 'Active' | 'Merged' | 'Ordered' | 'Frozen';
  customerId?: string;
  anonymousId?: string;
  deleteDaysAfterLastModification: number;
  directDiscounts: [];
  discountCodes: IDiscountCodesCart[];
  id: string;
  inventoryMode: string;
  itemShippingAddresses: [];
  lastMessageSequenceNumber: number;
  lineItems: ICartLineItem[];
  origin: string | 'Customer';
  refusedGifts: [];
  shipping: [];
  shippingMode: 'Single' | 'Multiple';
  taxCalculationMode: string | 'LineItemLevel';
  taxMode: string | 'Platform';
  taxRoundingMode: string | 'HalfEven';
  totalPrice: ICurrencyResponse;
  totalLineItemQuantity: number;
  type: string | 'Cart';
  version: number;
}
