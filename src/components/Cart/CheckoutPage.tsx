import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Container, Typography, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartProduct, Order } from '../../types';

interface CheckoutPageProps {
  cart: CartProduct[];
  setCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, setCart, setOrders }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0; // Retrieve totalAmount from Cart

  const handlePaymentSuccess = (details: any) => {
    console.log('Payment Successful: ', details);

    const newOrder: Order = {
      id: Date.now(), // Generate a unique order ID
      status: 'Completed', // Order status
      total_amount: totalAmount, // Total amount paid
      items: cart.map((item) => ({
        id: item.id,
        order_id: Date.now(),
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]); // Add the new order
    setCart([]); // Clear the cart after successful payment
    alert('Payment completed successfully!');
    navigate('/orders'); // Navigate to orders page immediately
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
          <Typography variant="h6" gutterBottom>
            Total Amount: ${totalAmount.toFixed(2)}
          </Typography>
          <Box sx={{ mt: 4 }}>
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
                  intent: 'CAPTURE',
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
