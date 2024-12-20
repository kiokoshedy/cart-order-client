import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Box,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../api';
import { Product } from '../../types';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useCart();
  const [products, setProducts] = useState<Record<number, Product>>({}); // Cache for product details

  const navigate = useNavigate();


  useEffect(() => {
    // Fetch product details for each cart item
    const fetchProductDetails = async () => {
      const productData: Record<number, Product> = {};
      for (const item of cart) {
        if (!products[item.product_id]) {
          const response = await api.get(`/products/${item.product_id}`);
          productData[item.product_id] = response.data;
        }
      }
      setProducts((prev) => ({ ...prev, ...productData }));
    };

    fetchProductDetails();
  }, [cart]);

  // Calculate total quantity and amount
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce(
    (sum, item) =>
      sum +
      item.quantity *
        (products[item.product_id] ? products[item.product_id].price : 0),
    0
  );

  const handleRemove = async (id: number) => {
    await removeFromCart(id);
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { totalAmount } });
  };
  

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          {/* Display cart items */}
          <List>
            {cart.map((item) => (
              <div key={item.id}>
                <ListItem>
                  <ListItemText
                    primary={item.product_name}
                    secondary={`Quantity: ${item.quantity} | Price: $${(
                      item.quantity *
                      (products[item.product_id]
                        ? products[item.product_id].price
                        : 0)
                    ).toFixed(2)}`}
                  />
                  <IconButton edge="end" onClick={() => handleRemove(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>

          {/* Display total quantity and amount */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">
              Total Quantity: {totalQuantity}
            </Typography>
            <Typography variant="h6">
              Total Amount: ${totalAmount.toFixed(2)}
            </Typography>

            {/* Proceed to Checkout Button */}
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              fullWidth
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart;
