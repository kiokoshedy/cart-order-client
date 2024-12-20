import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Order } from '../../types';

interface OrdersPageProps {
  orders: Order[];
}

const OrdersPage: React.FC<OrdersPageProps> = ({ orders }) => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Your Orders
      </Typography>
      {orders.length === 0 ? (
        <Typography>You have no orders yet.</Typography>
      ) : (
        <List>
          {orders.map((order) => (
            <div key={order.id}>
              <ListItem>
                <ListItemText
                  primary={`Order #${order.id}`}
                  secondary={`Status: ${order.status} | Total Amount: $${order.total_amount.toFixed(
                    2
                  )}`}
                />
              </ListItem>
              <Divider />
              <List>
                {order.items.map((item) => (
                  <ListItem key={item.id} sx={{ pl: 4 }}>
                    <ListItemText
                      primary={item.product_name}
                      secondary={`Quantity: ${item.quantity} | Price: $${item.price.toFixed(2)}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider />
            </div>
          ))}
        </List>
      )}
    </Container>
  );
};

export default OrdersPage;
