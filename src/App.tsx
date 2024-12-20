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
  quantity: number;
}

export interface Order extends Product {
  total: number;
  date: string;
}

const App: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [token, setToken] = useState<string | null>(null);

  const handleLogout = () => {
    setToken(null);
    setCart([]);
  };

  return (
    <Router>
      {token && <Navbar cart={cart} onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/products" replace />
            ) : (
              <LoginPage onLoginSuccess={(newToken: string) => setToken(newToken)} />
            )
          }
        />
        <Route
          path="/products"
          element={
            token ? (
              <ProductsPage cart={cart} setCart={setCart} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/cart"
          element={
            token ? (
              <CartPage cart={cart} setCart={setCart} setOrders={setOrders} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/checkout"
          element={
            token ? (
              <CheckoutPage cart={cart} setCart={setCart} setOrders={setOrders} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/orders"
          element={
            token ? (
              <OrdersPage orders={orders} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to={token ? '/products' : '/login'} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
