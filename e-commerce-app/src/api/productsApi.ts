import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IGetAllProductsRequest,
  IGetAllProductsResponse,
} from '../types/slicesTypes/productsApiTypes';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/products`,
  }),
  endpoints: (build) => ({
    getAllProducts: build.query<IGetAllProductsResponse, IGetAllProductsRequest>({
      query(queryObject) {
        return {
          url: '',
          method: 'GET',
          params: {
            limit: 12,
            ...queryObject.params,
          },
          headers: {
            Authorization: `Bearer ${queryObject.token}`,
            'Content-Type': 'application/json',
          },
        };
      },
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
