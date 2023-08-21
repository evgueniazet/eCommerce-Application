import {
  createBrowserRouter,
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
import { ProductsPage } from '../pages/ProductsPage/ProductsPage';
import { ErrorPage } from '../pages/ErrorPage/ErrorPage';
import { LogoutPage } from '../pages/LogoutPage/LogoutPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={'/'} element={<RootPage />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </>,
  ),
);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
