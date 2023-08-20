import './App.css';
import AppRoutes from './routes/AppRoutes';
import { useGetAccessTokenFromRefreshMutation, useGetAnonymousTokenMutation } from './api/authApi';
import { useEffect } from 'react';
import { useLocalToken } from './hooks/useLocalToken';
import { useAppDispatch } from './store/hooks';
import { setAuth, setLogIn, setLogOut } from './store/slices/userSlice';
import { useGetMyCustomerDetailsMutation } from './api/myCustomerApi';

export const App = () => {
  const [getAnonymousToken] = useGetAnonymousTokenMutation();
  const { isTokenInStorage, getTokenFromStorage, delTokenFromStorage } = useLocalToken();
  const [getAccessToken, { data, isSuccess, isError }] = useGetAccessTokenFromRefreshMutation();
  const [getDetails] = useGetMyCustomerDetailsMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setAuth({ access_token: data.access_token }));
      console.log(data);
      getDetails(data.access_token).then((res) => {
        if ('data' in res) {
          dispatch(setAuth({ email: res.data.email }));
        }
      });
      dispatch(setLogIn());
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      delTokenFromStorage();
      dispatch(setLogOut());
    }
  }, [isError]);

  useEffect(() => {
    if (isTokenInStorage()) {
      const token = getTokenFromStorage();
      console.log(token);
      if (token) {
        getAccessToken(token);
      }
    } else {
      getAnonymousToken().then((res) => {
        if ('data' in res) {
          dispatch(setAuth({ access_token: res.data.access_token, refresh_token: res.data.refresh_token }));
        }
      });
    }
  }, []);

  return (
    <>
      <AppRoutes/>
    </>
  );
};
