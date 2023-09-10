import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICartApiResponse } from '../types/slicesTypes/cart';
import { IUpdateCartApiObjectRequest } from '../types/slicesTypes/cart/updateCartApiTypes';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}`,
  }),
  tagTypes: ['activeCart'],
  endpoints: (build) => ({
    getMyActiveCart: build.query<ICartApiResponse, string>({
      query(token: string) {
        console.log('get active cart');
        return {
          url: '/me/active-cart',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ['activeCart'],
      async onQueryStarted(token, {queryFulfilled, dispatch}) {
        try {
          queryFulfilled.catch( () => dispatch(cartApi.endpoints.createCart.initiate(token)));
        } catch (e) {
          dispatch(cartApi.endpoints.createCart.initiate(token));
        }
      }
    }),
    createCart: build.mutation<ICartApiResponse, string>({
      query(token: string) {
        return {
          url: '/me/carts',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: {
            currency: 'EUR',
          },
        };
      },
      invalidatesTags: ['activeCart'],
    }),
    updateCart: build.mutation({
      query(queryObj: IUpdateCartApiObjectRequest) {
        return {
          url: `/me/carts/${queryObj.cartId}`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${queryObj.token}`,
            'Content-Type': 'application/json',
          },
          body: queryObj.data,
        };
      },
      invalidatesTags: ['activeCart'],
    }),
    deleteCart: build.mutation({
      query(queryObj: { cartId: string; token: string }) {
        return {
          url: `/me/carts/${queryObj.cartId}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${queryObj.token}`,
          },
        };
      },
    }),
  }),
});

export const { useLazyGetMyActiveCartQuery, useCreateCartMutation, useUpdateCartMutation } =
  cartApi;
