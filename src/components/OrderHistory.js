import React from 'react';
import { Typography, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function OrderHistory({ orders, onEditOrder, onRemoveOrder }) {
  return (
    <div style={{ marginTop: '1rem' }}>
      <Typography variant="h6" gutterBottom>Order History</Typography>
      {orders.length === 0 ? (
        <Typography>No orders yet.</Typography>
      ) : (
        <List>
          {orders.map((order, index) => (
            <ListItem key={index} divider>
              <ListItemText 
                primary={`Item: ${order.item} | Quantity: ${order.quantity}`} 
                secondary={`Date: ${order.created_at}`} 
              />
              <Box>
                <IconButton
                  aria-label="edit"
                  onClick={() => onEditOrder(index)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => onRemoveOrder(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default OrderHistory;
