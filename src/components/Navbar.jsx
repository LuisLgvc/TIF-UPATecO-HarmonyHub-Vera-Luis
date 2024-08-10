import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';

function Navbar() {
    const { isAuthenticated } = useAuth("state");
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    <Link to="/">Canciones</Link>
                </Typography>
                <Typography variant="h6">
                    <Link to="/artists">Artistas</Link>
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginLeft: 'auto' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ backgroundColor: '#1FDF64', '&:hover': { backgroundColor: '#189945' } }}
                        onClick={
                            isAuthenticated
                                ? () => {
                                      navigate("/profile");
                                  }
                                : () => {
                                      navigate("/login");
                                  }
                        }

                    >
                        {isAuthenticated ? "Perfil" : "Iniciar Sesión"}
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;