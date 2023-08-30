import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetAllCategoriesResponse } from '../types/slicesTypes/categoriesApiTypes';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/categories`,
  }),
  tagTypes: ['categories'],
  endpoints: (build) => ({
    getAllCategories: build.query<IGetAllCategoriesResponse, string>({
      query(token: string) {
        return {
          url: '',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        };
      },
      providesTags: ['categories'],
    })
  })
});

export const { useGetAllCategoriesQuery } = categoriesApi;
