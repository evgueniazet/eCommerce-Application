import { IBaseIdTypeResponse } from '../baseApiResponsesTypes';

export interface IDiscountCodeIdType extends IBaseIdTypeResponse {
  typeId: 'discount-code';
}

export interface IDiscountCodesCart {
  discountCode: IDiscountCodeIdType;
  state:
    | string
    | 'NotActive'
    | 'MatchesCart'
    | 'NotValid'
    | 'DoesNotMatchCart'
    | 'MaxApplicationReached'
    | 'ApplicationStoppedByPreviousDiscount';
}
