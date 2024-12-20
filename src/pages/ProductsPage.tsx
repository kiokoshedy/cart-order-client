import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, TextField, Button } from '@mui/material';
import { Product } from '../App';

interface ProductsPageProps {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

const products: Product[] = [
  { id: 1, name: 'Product 1', price: 100, quantity: 1 },
  { id: 2, name: 'Product 2', price: 200, quantity: 1 },
  { id: 3, name: 'Product 3', price: 300, quantity: 1 },
];

const ProductsPage: React.FC<ProductsPageProps> = ({ cart, setCart }) => {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const handleQuantityChange = (productId: number, value: number) => {
    setQuantities({ ...quantities, [productId]: Math.max(1, value) });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">Price: ${product.price}</Typography>
                <TextField
                  type="number"
                  label="Quantity"
                  value={quantities[product.id] || 1}
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                  fullWidth
                  sx={{ mt: 2 }}
                  inputProps={{ min: 1 }}
                />
              </CardContent>
              <CardActions>
                <Button variant="contained" onClick={() => handleAddToCart(product)} fullWidth>
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsPage;
