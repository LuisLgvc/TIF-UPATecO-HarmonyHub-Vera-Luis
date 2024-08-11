import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab, Menu, MenuItem } from '@mui/material';

function Navbar() {
    const { isAuthenticated } = useAuth("state");
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const { logout } = useAuth("actions");

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                navigate("/");
                break;
            case 1:
                navigate("/artists");
                break;
            default:
                break;
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#202020' }}>
            <Toolbar>
                <Tabs value={value} onChange={handleChange} textColor="inherit" indicatorColor="primary">
                    <Tab label="Canciones" sx={{ color: '#FFFFFF' }} />
                    <Tab label="Artistas" sx={{ color: '#FFFFFF' }} />
                </Tabs>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginLeft: 'auto' }}>
                    {isAuthenticated ? (
                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                sx={{ color: '#FFFFFF' }}
                            >
                                Opciones
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={() => { handleClose(); navigate("/profile"); }}>Perfil</MenuItem>
                                <MenuItem onClick={() => { handleClose(); logout(); }}>Cerrar Sesión</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#1FDF64', '&:hover': { backgroundColor: '#189945' }, color: '#FFFFFF' }}
                            onClick={() => navigate("/login")}
                        >
                            Iniciar Sesión
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;