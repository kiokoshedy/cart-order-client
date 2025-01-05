import React, { useEffect, useState } from 'react';
import api from '../../api';
import { Product } from '../../types';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  TextField,
} from '@mui/material';
import { useCart } from '../../context/CartContext';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get('/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  // Handle quantity change
  const handleQuantityChange = (productId: number, value: string) => {
    const quantity = Math.max(1, parseInt(value) || 1); // Ensure at least 1
    setQuantities((prev) => ({ ...prev, [productId]: quantity }));
  };

  // Add to cart with quantity
  const handleAddToCart = async (product: Product) => {
    const quantity = quantities[product.id] || 1; // Default to 1 if not specified
    await addToCart(product, quantity);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Typography variant="h3" gutterBottom align="center">
        Our Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card>
              {product.image_url && (
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="200"
                  image={product.image_url}
                />
              )}
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  ${product.price.toFixed(2)}
                </Typography>
                <TextField
                  label="Quantity"
                  type="number"
                  size="small"
                  value={quantities[product.id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(product.id, e.target.value)
                  }
                  sx={{ mt: 2, width: '100%' }}
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product)}
                >
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

export default ProductList;
