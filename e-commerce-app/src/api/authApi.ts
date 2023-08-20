import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILoginResponse } from '../types/AuthTypes';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_CTP_AUTH_URL}/oauth`,
  }),
  endpoints: (build) => ({
    logoutUser: build.mutation({
      query(accessToken: string) {
        console.log(accessToken);
        return {
          url: '/token/revoke',
          method: 'POST',
          body: `token=${accessToken}&token_type_hint=access_token`,
          headers: {
            Authorization: `Basic ${btoa(
              process.env.REACT_APP_CTP_CLIENT_ID + ':' + process.env.REACT_APP_CTP_CLIENT_SECRET,
            )}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        };
      },
    }),
    loginUser: build.mutation<ILoginResponse, { email: string; password: string }>({
      query({ email, password }: { email: string; password: string }) {
        return {
          url: `/${process.env.REACT_APP_CTP_PROJECT_KEY}/customers/token`,
          method: 'POST',
          body: `grant_type=password&username=${email}&password=${password}`,
          headers: {
            Authorization: `Basic ${btoa(
              process.env.REACT_APP_CTP_CLIENT_ID + ':' + process.env.REACT_APP_CTP_CLIENT_SECRET,
            )}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        };
      },
    }),
  }),
});

export const { useLogoutUserMutation, useLoginUserMutation } = authApi;
