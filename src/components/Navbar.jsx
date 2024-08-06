import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          <Link to="/">Songs</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;