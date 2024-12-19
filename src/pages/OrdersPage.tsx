import React from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Product } from '../App';

interface OrdersPageProps {
  orders: Product[];
}

const OrdersPage: React.FC<OrdersPageProps> = ({ orders }) => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Orders
        </Typography>
        {orders.length === 0 ? (
          <Typography>No orders placed yet.</Typography>
        ) : (
          <List>
            {orders.map((order, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={`${order.name} | Quantity: ${order.quantity}`}
                  secondary={`Price: $${order.price * (order.quantity || 1)}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
};

export default OrdersPage;
