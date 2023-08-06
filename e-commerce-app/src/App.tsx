import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { BasketPage } from './pages/BasketPage/BasketPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { UserPage } from './pages/UserPage/UserPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';

export const App = () => {

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/basket">Basket</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/registration">Registration</Link>
                    <Link to="/user">User</Link>
                    <Link to="/product">Product</Link>
                    <Link to="/products">Products</Link>
                    <Link to="*">Error</Link>
                </header>
            </div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/basket" element={<BasketPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}
