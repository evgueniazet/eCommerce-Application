import { ICurrencyResponse } from '../baseApiResponsesTypes';

export interface ICartApiResponse {
  cartState: 'Active' | 'Merged' | 'Ordered' | 'Frozen';
  customerId?: string;
  anonymousId?: string;
  deleteDaysAfterLastModification: number;
  directDiscounts: [];
  discountCodes: [];
  id: string;
  inventoryMode: string;
  itemShippingAddresses: [];
  lastMessageSequenceNumber: number;
  lineItems: [];
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
