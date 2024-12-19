import React from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { Product } from '../App';

interface CartPageProps {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  setOrders: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CartPage: React.FC<CartPageProps> = ({ cart, setCart, setOrders }) => {
  const navigate = useNavigate();

  const handleRemoveFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Cart
        </Typography>
        {cart.length === 0 ? (
          <Typography>Your cart is empty. Add some products!</Typography>
        ) : (
          <>
            <List>
              {cart.map((item) => (
                <ListItem key={item.id} divider>
                  <ListItemText
                    primary={`${item.name} | Quantity: ${item.quantity}`}
                    secondary={`Price: $${item.price * (item.quantity || 1)}`}
                  />
                  <IconButton aria-label="delete" onClick={() => handleRemoveFromCart(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Total Amount: ${totalAmount.toFixed(2)}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleProceedToCheckout} sx={{ mt: 4 }}>
              Proceed to Checkout
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default CartPage;
