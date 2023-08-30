import React, { JSX } from 'react';
import { useAppSelector } from '../../store/hooks';
import { getAccessToken } from '../../store/slices/userSlice';
import LoadingProgress from '../../components/LoadingProgress/LoadingProgress';
import { Outlet } from 'react-router-dom';

const TokenGuard = (): JSX.Element => {
  const accessToken = useAppSelector(getAccessToken);

  if (!accessToken) {
    return <LoadingProgress />;
  }

  return <Outlet />;
};
export default TokenGuard;
