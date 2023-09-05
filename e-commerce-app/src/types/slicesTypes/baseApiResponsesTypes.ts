export interface IBaseGetAllQueryResponse<T> {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Array<T>;
}

export interface ICategoryTypeResponse {
  id: string;
  typeId: string;
}

export interface IMetaDescriptionProductResponse {
  en: string;
}
