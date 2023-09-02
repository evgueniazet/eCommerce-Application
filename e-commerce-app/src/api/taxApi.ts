import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetAllTaxesResponse } from '../types/slicesTypes/taxApiTypes';

export const taxApi = createApi({
  reducerPath: 'taxApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/tax-categories`,
  }),
  endpoints: (build) => ({
    getAllTaxes: build.query<IGetAllTaxesResponse, string>({
      query(token: string) {
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

export const { useGetAllTaxesQuery } = taxApi;
