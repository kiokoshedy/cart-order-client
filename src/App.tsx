import React, { useState, ReactNode } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProductList from './components/Products/ProductList';
import Cart from './components/Cart/Cart';
import Navbar from './components/Auth/Navbar';
import { CartProduct, Order } from './types';
import CheckoutPage from './components/Cart/CheckoutPage';
import OrdersPage from './components/Products/OrdersPage';

const App: React.FC = () => {

  const [cart, setCart] = useState<CartProduct[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  interface LayoutProps {
    children: ReactNode;
  }

  const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const hideNavbar = ['/login', '/register'].includes(location.pathname);

    return (
      <div>
        {!hideNavbar && <Navbar />}
        {children}
      </div>
    );
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage cart={[]} setCart={function (value: React.SetStateAction<CartProduct[]>): void {
            throw new Error('Function not implemented.');
          } } setOrders={function (value: React.SetStateAction<Order[]>): void {
            throw new Error('Function not implemented.');
          } } />} />
          <Route path="/orders" element={<OrdersPage orders={orders} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
