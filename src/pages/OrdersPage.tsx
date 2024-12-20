import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Order } from '../App';

interface OrdersPageProps {
  orders: Order[];
}

const OrdersPage: React.FC<OrdersPageProps> = ({ orders }) => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Orders
      </Typography>
      {orders.length === 0 ? (
        <Typography variant="body1">You have no orders yet. Place an order to see it here!</Typography>
      ) : (
        <Table sx={{ fontSize: '1.2rem' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Order Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Product</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Quantity</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: '1rem' }}>{new Date(order.date).toLocaleString()}</TableCell>
                <TableCell sx={{ fontSize: '1rem' }}>{order.name}</TableCell>
                <TableCell sx={{ fontSize: '1rem' }}>{order.quantity}</TableCell>
                <TableCell sx={{ fontSize: '1rem' }}>${order.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default OrdersPage;
