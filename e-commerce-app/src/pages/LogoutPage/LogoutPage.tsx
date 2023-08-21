import { JSX, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAccessToken, getLoggedIn, setLogOut } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useLocalToken } from '../../hooks/useLocalToken';
import { useLogoutUserMutation } from '../../api/authApi';

export const LogoutPage = (): JSX.Element => {
  const navigate = useNavigate();
  const from = '/';

  const isLoggedIn = useAppSelector(getLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn]);

  const { delTokenFromStorage, getTokenFromStorage } = useLocalToken();
  const accessToken = useAppSelector(getAccessToken);
  const dispatch = useAppDispatch();
  const refreshToken = getTokenFromStorage();

  const [logoutUser, { isSuccess, isError }] = useLogoutUserMutation();

  useEffect(() => {
    dispatch(setLogOut());
    delTokenFromStorage();
  }, [isSuccess, isError]);

  useEffect(() => {
    if (accessToken) {
      logoutUser(accessToken);
    } else if (refreshToken) {
      logoutUser(refreshToken);
    } else {
      dispatch(setLogOut());
    }
  }, []);

  return <CircularProgress />;
};
