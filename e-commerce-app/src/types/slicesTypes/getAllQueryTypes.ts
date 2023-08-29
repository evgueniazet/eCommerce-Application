export interface IBaseGetAllQueryResponse<T> {
  limit: number
  offset: number
  count: number
  total: number
  results: Array<T>
}
