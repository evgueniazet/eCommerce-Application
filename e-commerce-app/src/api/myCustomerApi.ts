import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IAuthenticateMyCustomer,
  IMyCustomerBaseResponse,
  ISignUpMyCustomer,
} from '../types/slicesTypes/myCustomerApiSliceTypes';
import {
  IChangePasswordMyCustomerRequest,
  IUpdateMyCustomerRequest,
} from '../types/updateMyCustomerTypes/updateMyCustomerTypes';

export const myCustomerApi = createApi({
  reducerPath: 'myCustomerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
  }),
  tagTypes: ['myCustomerDetails'],
  endpoints: (build) => ({
    authenticateMyCustomer: build.mutation<IMyCustomerBaseResponse, IAuthenticateMyCustomer>({
      query(queryObj) {
        return {
          url: '/login',
          method: 'POST',
          body: JSON.stringify(queryObj.customerData),
          headers: {
            Authorization: `Bearer ${queryObj.token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        };
      },
    }),
    signUpMyCustomer: build.mutation<IMyCustomerBaseResponse, ISignUpMyCustomer>({
      query(signUpData) {
        return {
          url: '/signup',
          method: 'POST',
          body: JSON.stringify(signUpData.customerData),
          headers: {
            Authorization: `Bearer ${signUpData.token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        };
      },
    }),
    getMyCustomerDetails: build.mutation<IMyCustomerBaseResponse, string>({
      query(token: string) {
        return {
          url: '/',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
      },
    }),
    getMyCustomerDetailedInfo: build.query<IMyCustomerBaseResponse, string>({
      query(token: string) {
        return {
          url: '/',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
      },
      providesTags: ['myCustomerDetails'],
    }),
    updateMyCustomer: build.mutation<IMyCustomerBaseResponse, IUpdateMyCustomerRequest>({
      query(queryObj) {
        return {
          url: '',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${queryObj.token}`,
            'Content-Type': 'application/json',
          },
          body: queryObj.data,
        };
      },
      invalidatesTags: ['myCustomerDetails'],
    }),
    changePasswordMyCustomer: build.mutation<
      IMyCustomerBaseResponse,
      IChangePasswordMyCustomerRequest
    >({
      query(queryObj) {
        return {
          url: '/password',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${queryObj.token}`,
            'Content-Type': 'application/json',
          },
          body: queryObj.data,
        };
      },
      invalidatesTags: ['myCustomerDetails'],
    }),
  }),
});

export const {
  useAuthenticateMyCustomerMutation,
  useSignUpMyCustomerMutation,
  useGetMyCustomerDetailsMutation,
  useUpdateMyCustomerMutation,
  useGetMyCustomerDetailedInfoQuery,
  useChangePasswordMyCustomerMutation,
} = myCustomerApi;
