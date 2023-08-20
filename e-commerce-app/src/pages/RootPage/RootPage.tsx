import { JSX } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';

const RootPage = (): JSX.Element => {
  return (
    <>
      <header style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/basket">Basket</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/logout">Logout</NavLink>
        <NavLink to="/registration">Registration</NavLink>
        <NavLink to="/user">User</NavLink>
        <NavLink to="/product">Product</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="*">Error</NavLink>
      </header>
      <Header />
      <div className="app">
        <Outlet />
      </div>
    </>
  );
};
export default RootPage;
