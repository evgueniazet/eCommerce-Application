import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetAllProductsRequest } from '../types/slicesTypes/productsApiTypes';
import { ISearchProductsResponse } from '../types/slicesTypes/productProjectionsApiTypes';

export const productProjectionApi = createApi({
  reducerPath: 'productProjectionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/product-projections`,
  }),
  endpoints: (build) => ({
    searchProducts: build.mutation<ISearchProductsResponse, IGetAllProductsRequest>({
      query(queryObject) {
        return {
          url: '/search',
          method: 'GET',
          params: {
            limit: 12,
            ...queryObject.params,
          },
          headers: {
            Authorization: `Bearer ${queryObject.token}`,
          },
        };
      },
    }),
  }),
});

export const { useSearchProductsMutation } = productProjectionApi;
