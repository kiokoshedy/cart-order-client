import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { Product } from '../App';

interface NavbarProps {
  cart: Product[];
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cart, onLogout }) => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <AppBar position="static"
    sx={{
      backgroundColor: '#1976d2', // Change this color code for custom background color
    }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer',color: 'black', fontWeight: 'bold', fontFamily: 'inherit'}} onClick={() => navigate('/products')}>
          DUKA
        </Typography>
        <IconButton color="warning" onClick={handleCartClick}>
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <IconButton color="error" onClick={handleLogoutClick}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
