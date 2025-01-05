import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import LogoutIcon from '@mui/icons-material/Logout';


const Navbar: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens and redirect to login
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Shop Name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={() => navigate('/products/')}>
          MyShop
        </Typography>

        {/* Cart Icon with Badge */}
        <IconButton color="inherit" onClick={() => navigate('/cart')}>
          <Badge badgeContent={cart.length} color="secondary">
            <ShoppingCartIcon  />
          </Badge>
        </IconButton>

        {/* Logout Button */}
        <Button color="inherit" onClick={handleLogout}>
          <LogoutIcon color='error'/>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
