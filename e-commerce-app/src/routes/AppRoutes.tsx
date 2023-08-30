import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import RootPage from '../pages/RootPage/RootPage';
import { HomePage } from '../pages/HomePage/HomePage';
import { AboutPage } from '../pages/AbouPage/AboutPage';
import { BasketPage } from '../pages/BasketPage/BasketPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import { UserPage } from '../pages/UserPage/UserPage';
import { ProductPage } from '../pages/ProductPage/ProductPage';
import { ErrorPage } from '../pages/ErrorPage/ErrorPage';
import { LogoutPage } from '../pages/LogoutPage/LogoutPage';
import ProductsQuery from '../requestsComponents/ProductsQuery/ProductsQuery';
import CategoriesQuery from '../requestsComponents/CategoriesQuery/CategoriesQuery';
import TokenGuard from '../requestsComponents/TokenGuard/TokenGuard';

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path={'/'}
             element={<RootPage/>}>
        <Route index
               element={<HomePage/>}/>
        <Route path="/about"
               element={<AboutPage/>}/>
        <Route path="/login"
               element={<LoginPage/>}/>
        <Route path="/logout"
               element={<LogoutPage/>}/>
        <Route element={<TokenGuard/>}>
          <Route path="/registration"
                 element={<RegistrationPage/>}/>
          <Route path="/basket"
                 element={<BasketPage/>}/>
          <Route path="/user"
                 element={<UserPage/>}/>
          <Route element={<CategoriesQuery/>}
                 path={'/products'}>
            <Route index
                   element={<ProductsQuery/>}/>
            <Route path=":productId"
                   element={<ProductPage/>}/>
          </Route>
        </Route>
      </Route>
      <Route path="*"
             element={<ErrorPage/>}/>
    </>,
  ),
);

const AppRoutes = () => {
  return <RouterProvider router={router}/>;
};

export default AppRoutes;
