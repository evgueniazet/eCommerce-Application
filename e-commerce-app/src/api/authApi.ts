import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILoginResponse, IRefreshTokenResponse } from '../types/AuthTypes';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_CTP_AUTH_URL}/oauth`,
  }),
  endpoints: (build) => ({
    logoutUser: build.mutation({
      query(accessToken: string) {
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
    getAnonymousToken: build.mutation<ILoginResponse, void>({
      query() {
        return {
          url: `/${process.env.REACT_APP_CTP_PROJECT_KEY}/anonymous/token?grant_type=client_credentials`,
          method: 'POST',
          headers: {
            Authorization: `Basic ${btoa(
              process.env.REACT_APP_CTP_CLIENT_ID + ':' + process.env.REACT_APP_CTP_CLIENT_SECRET,
            )}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        };
      },
    }),
    getAccessTokenFromRefresh: build.mutation<IRefreshTokenResponse, string>({
      query(token: string) {
        return {
          url: '/token',
          method: 'POST',
          body: `grant_type=refresh_token&refresh_token=${token}`,
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

export const {
  useLogoutUserMutation,
  useLoginUserMutation,
  useGetAnonymousTokenMutation,
  useGetAccessTokenFromRefreshMutation,
} = authApi;
