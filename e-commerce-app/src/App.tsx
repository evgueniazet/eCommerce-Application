import './App.css';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { AboutPage } from './pages/AbouPage/AboutPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { BasketPage } from './pages/BasketPage/BasketPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { UserPage } from './pages/UserPage/UserPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';
import RootPage from './pages/RootPage/RootPage';

export const App = () => {
  return (
    <Router>
      <header>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/basket">Basket</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/registration">Registration</NavLink>
        <NavLink to="/user">User</NavLink>
        <NavLink to="/product">Product</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="*">Error</NavLink>
      </header>
      <Routes>
        <Route path={'/'} element={<RootPage />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};
