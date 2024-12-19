import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { Product } from '../App';

interface NavbarProps {
  pageName: string;
  cart: Product[];
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ pageName, cart, onLogout }) => {
  const navigate = useNavigate();
  const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {pageName}
        </Typography>
        <IconButton color="inherit" onClick={() => navigate('/cart')}>
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <Button color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
