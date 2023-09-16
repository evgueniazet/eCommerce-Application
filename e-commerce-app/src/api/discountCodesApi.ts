import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IGetDiscountCodesResponse } from '../types/slicesTypes/DiscountCodesTypes/DiscountCodesApiTypes';

export const discountCodesApi = createApi({
  reducerPath: 'discountCodesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/discount-codes`,
  }),
  endpoints: (build) => ({
    getDiscountCodes: build.query<IGetDiscountCodesResponse, string>({
      query(token) {
        return {
          url: '',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useGetDiscountCodesQuery, useLazyGetDiscountCodesQuery } = discountCodesApi;
