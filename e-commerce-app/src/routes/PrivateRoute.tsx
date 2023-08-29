import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { IPrivateRouteProps } from '../interfaces/IPrivateRouteProps';

export const PrivateRoute: FC<IPrivateRouteProps> = ({ element, isLoggedIn, fallbackPath }) => {
  return isLoggedIn ? element : <Navigate to={fallbackPath} replace />;
};
