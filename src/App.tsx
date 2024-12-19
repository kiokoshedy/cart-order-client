import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import CheckoutPage from './pages/CheckoutPage';
import Navbar from './components/Navbar';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity?: number;
}

export interface Order extends Product {}

const App: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [token, setToken] = useState<string | null>(null);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/products" />
            ) : (
              <LoginPage onLoginSuccess={(newToken: string) => setToken(newToken)} />
            )
          }
        />
        <Route
          path="/products"
          element={
            token ? (
              <>
                <Navbar pageName="Products" cart={cart} onLogout={handleLogout} />
                <ProductsPage cart={cart} setCart={setCart} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/cart"
          element={
            token ? (
              <>
                <Navbar pageName="Cart" cart={cart} onLogout={handleLogout} />
                <CartPage cart={cart} setCart={setCart} setOrders={setOrders} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/checkout"
          element={
            token ? (
              <>
                <Navbar pageName="Checkout" cart={cart} onLogout={handleLogout} />
                <CheckoutPage cart={cart} setCart={setCart} setOrders={setOrders} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/orders"
          element={
            token ? (
              <>
                <Navbar pageName="Orders" cart={cart} onLogout={handleLogout} />
                <OrdersPage orders={orders} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to={token ? '/products' : '/login'} />} />
      </Routes>
    </Router>
  );
};

export default App;
