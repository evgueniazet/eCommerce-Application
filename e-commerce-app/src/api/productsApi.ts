import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IGetAllProductsRequest,
  IGetAllProductsResponse,
  IGetProductByIdRequest,
  IProductApiResponse,
} from '../types/slicesTypes/productsApiTypes';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/products`,
  }),
  endpoints: (build) => ({
    getAllProducts: build.mutation<IGetAllProductsResponse, IGetAllProductsRequest>({
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
    getProductById: build.query<IProductApiResponse, IGetProductByIdRequest>({
      query(queryObject) {
        return {
          url: `/${queryObject.productId}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${queryObject.token}`,
            'Content-Type': 'application/json',
          },
        };
      },
    }),
  }),
});

export const { useGetAllProductsMutation, useGetProductByIdQuery } = productsApi;
