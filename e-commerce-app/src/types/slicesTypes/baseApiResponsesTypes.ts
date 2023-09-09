export interface IBaseGetAllQueryResponse<T> {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Array<T>;
}

export interface IBaseIdTypeResponse {
  id: string;
  typeId: string;
}

export interface IMetaDescriptionProductResponse {
  en: string;
}

export interface IBaseCurrency {
  currencyCode: string | 'EUR' | 'USD'
  centAmount: number
}

export interface ICurrencyResponse extends IBaseCurrency{
  type: string
  fractionDigits: number
}
