import { FC } from 'react';
import { getLoggedIn } from '../store/slices/userSlice';
import { useAppSelector } from '../store/hooks';
import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoute: FC = () => {
  const isLoggedIn = useAppSelector(getLoggedIn);
  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
