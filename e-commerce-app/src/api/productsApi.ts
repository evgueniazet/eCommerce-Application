import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/products`,
  }),
  endpoints: (build) => ({
    getAllProducts: build.mutation({
      query(token: string) {
        return {
          url: '/',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
      }
    })
  })
});

export const { useGetAllProductsMutation } = productsApi;
