import './App.css';
import AppRoutes from './routes/AppRoutes';
import { useGetAccessTokenFromRefreshMutation, useGetAnonymousTokenMutation } from './api/authApi';
import { useEffect } from 'react';
import { useLocalToken } from './hooks/useLocalToken';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getAccessToken, setAuth, setLogIn, setLogOut } from './store/slices/userSlice';
import { useGetMyCustomerDetailsMutation } from './api/myCustomerApi';
import LoadingProgress from './components/LoadingProgress/LoadingProgress';
import { useLazyGetMyActiveCartQuery } from './api/cartApi';

export const App = () => {
  const [getAnonymousToken] = useGetAnonymousTokenMutation();
  const {
    isTokenInStorage,
    getTokenFromStorage,
    delTokenFromStorage,
    setTokenInSessionStorage,
    getTokenFromSessionStorage,
    isTokenInLocalStorage,
  } = useLocalToken();
  const [getAccessTokenApi, { data, isSuccess, isError, isLoading }] =
    useGetAccessTokenFromRefreshMutation();
  const [getDetails] = useGetMyCustomerDetailsMutation();
  const [getMyActiveCart] = useLazyGetMyActiveCartQuery();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(getAccessToken);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setAuth({ access_token: data.access_token }));
      getDetails(data.access_token).then((res) => {
        if ('data' in res) {
          dispatch(setAuth({ email: res.data.email }));
          dispatch(setLogIn());
        }
      });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      delTokenFromStorage();
      dispatch(setLogOut());
    }
  }, [isError]);

  useEffect(() => {
    if (accessToken) {
      getMyActiveCart(accessToken).then((a) => console.log(a.data));
      return;
    }

    if (isTokenInLocalStorage()) {
      const token = getTokenFromSessionStorage();
      if (token) {
        getAccessTokenApi(token);
      }
      return;
    }

    if (isTokenInStorage()) {
      const token = getTokenFromStorage();
      if (token) {
        getAccessTokenApi(token);
      }
      return;
    }

    getAnonymousToken().then((res) => {
      if ('data' in res) {
        dispatch(
          setAuth({ access_token: res.data.access_token, refresh_token: res.data.refresh_token }),
        );
        setTokenInSessionStorage(res.data.refresh_token);
      }
    });
  }, [accessToken]);

  if (isLoading) {
    return <LoadingProgress />;
  }

  return (
    <>
      <AppRoutes />
    </>
  );
};
