import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { IPrivateRouteProps } from '../interfaces/IPrivateRouteProps';
import { getLoggedIn } from '../store/slices/userSlice';
import { useAppSelector } from '../store/hooks';

export const PrivateRoute: FC<IPrivateRouteProps> = ({ element, fallbackPath }) => {
  const isLoggedIn = useAppSelector(getLoggedIn);

  return isLoggedIn ? element : <Navigate to={fallbackPath} replace />;
};
