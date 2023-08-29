import { ReactElement } from 'react';


export interface IPrivateRouteProps {
  element: ReactElement;
  isLoggedIn: boolean;
  fallbackPath: string;
}
