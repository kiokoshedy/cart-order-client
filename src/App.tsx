import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

  
  return (
    <Router>
      <div>
      <Navbar />
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
      </div>
    </Router>
  );
};

export default App;
