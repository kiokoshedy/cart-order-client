import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Product, Order } from '../App';

interface CheckoutPageProps {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, setCart, setOrders }) => {
  const navigate = useNavigate();
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePaymentSuccess = (details: any) => {
    console.log('Payment Successful: ', details);

    const newOrders: Order[] = cart.map((item) => ({
      ...item,
      total: item.price * item.quantity,
      date: new Date().toISOString(),
    }));

    setOrders((prevOrders) => [...prevOrders, ...newOrders]);
    setCart([]);
    alert('Payment completed successfully!');
    navigate('/orders');
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: 'AZjimSAVe8sdeA0vRnTKUBagvTgzJKcpqC6T1GaOgrbDdnEOu2v6WAnjWvX2QRwrOOBTt8l5xsCeqSqJ', // Replace with your PayPal Client ID
        currency: 'USD',
      }}
    >
      <Container sx={{ mt: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Checkout
          </Typography>
          <Typography variant="h6" gutterBottom >
            Total Amount: ${totalAmount.toFixed(2)}
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Pay with :
            </Typography>
            <PayPalButtons
              style={{ layout: 'vertical' }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: 'USD',
                        value: totalAmount.toFixed(2),
                      },
                    },
                  ],
                  intent: 'CAPTURE'
                });
              }}
              onApprove={(data, actions) => {
                if (!actions.order) {
                  console.error('Order actions not available.');
                  return Promise.reject('Order actions are undefined.');
                }
                return actions.order.capture().then((details) => {
                  handlePaymentSuccess(details);
                });
              }}
              onError={(err) => {
                console.error('PayPal Checkout Error:', err);
                alert('An error occurred during payment. Please try again.');
              }}
            />
          </Box>
        </Box>
      </Container>
    </PayPalScriptProvider>
  );
};

export default CheckoutPage;
