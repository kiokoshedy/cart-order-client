import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Product } from '../App';
import { useNavigate } from 'react-router-dom';

interface CartPageProps {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  setOrders: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CartPage: React.FC<CartPageProps> = ({ cart, setCart, setOrders }) => {
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();

  const handleRemove = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // const handleCheckout = () => {
  //   setOrders((prev) => [
  //     ...prev,
  //     ...cart.map((item) => ({
  //       ...item,
  //       total: item.price * item.quantity,
  //       date: new Date().toISOString(),
  //     })),
  //   ]);
  //   setCart([]);
  // };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="body1">Your cart is empty!</Typography>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Product</TableCell>
                <TableCell sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Quantity</TableCell>
                <TableCell sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Price</TableCell>
                <TableCell sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ fontSize: '1.1rem' }}>{item.name}</TableCell>
                  <TableCell sx={{ fontSize: '1.1rem' }}>{item.quantity}</TableCell>
                  <TableCell sx={{ fontSize: '1.1rem' }}> ${(item.price * item.quantity).toFixed(2)}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRemove(item.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 3,
            }}
          >
            <Typography variant="h5" sx={{ fontSize: '1.2rem' , fontWeight: 'bold'}}>
              Total: ${totalAmount.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleProceedToCheckout}
              sx={{
                textTransform: 'none',
              }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CartPage;
