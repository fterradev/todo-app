import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = async () => {
      await auth?.logout();
      navigate('/');
  };
  
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "1rem" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TODO List app
          </Typography>
          {auth?.ready && auth?.currentUser ? (
            <>
              <Typography variant="body2">
                { auth.currentUser.email }
              </Typography>
              <Button color="inherit" onClick={handleLogout}>Log Out</Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/signup")}>Sign Up</Button>
              <Button color="inherit" onClick={() => navigate("/login")}>Log In</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
