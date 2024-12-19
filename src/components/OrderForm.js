import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

function OrderForm({ onPlaceOrder }) {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Populate fields when editing
    const itemField = document.getElementById('order-item');
    const quantityField = document.getElementById('order-quantity');
    if (itemField && quantityField) {
      setItem(itemField.value || '');
      setQuantity(Number(quantityField.value) || 1);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item && quantity > 0) {
      onPlaceOrder(item, quantity);
      setItem('');
      setQuantity(1);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>Place an Order</Typography>
      <TextField
        id="order-item"
        fullWidth
        label="Item"
        margin="normal"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        required
      />
      <TextField
        id="order-quantity"
        fullWidth
        label="Quantity"
        margin="normal"
        type="number"
        inputProps={{ min: 1 }}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {onPlaceOrder ? 'Save Order' : 'Place Order'}
      </Button>
    </Box>
  );
}

export default OrderForm;
