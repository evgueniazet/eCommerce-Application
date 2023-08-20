import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IMyCustomerBaseResponse,
  IMyCustomerLoginRequest,
  IMyCustomerApiSignupRequest,
} from '../types/slicesTypes/myCustomerApiSliceTypes';

export const myCustomerApi = createApi({
  reducerPath: 'myCustomerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
  }),
  endpoints: (build) => ({
    authenticateMyCustomer: build.mutation<IMyCustomerBaseResponse, IMyCustomerLoginRequest>({
      query(customerData: IMyCustomerLoginRequest) {
        return {
          url: '/login',
          method: 'POST',
          body: JSON.stringify(customerData),
          headers: {
            Authorization: `Bearer ${btoa(
              process.env.REACT_APP_CTP_CLIENT_ID + ':' + process.env.REACT_APP_CTP_CLIENT_SECRET,
            )}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        };
      },
    }),
    signUpMyCustomer: build.mutation<IMyCustomerBaseResponse, IMyCustomerApiSignupRequest>({
      query(customerData) {
        return {
          url: '/signup',
          method: 'POST',
          body: JSON.stringify(customerData),
          headers: {
            Authorization: `Bearer ${btoa(
              process.env.REACT_APP_CTP_CLIENT_ID + ':' + process.env.REACT_APP_CTP_CLIENT_SECRET,
            )}`,
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
          }
        };
      }
    })
  }),
});

export const { useAuthenticateMyCustomerMutation, useSignUpMyCustomerMutation, useGetMyCustomerDetailsMutation } = myCustomerApi;
