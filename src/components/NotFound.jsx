import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/spotixImg.png';

function NotFound() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 0,
                padding: 0,
                height: '100%',
                width: '100%',
                bgcolor: '#121212',
                color: 'white',
                textAlign: 'center',
            }}
        >
            <img src={logo} alt="Logo" style={{ marginBottom: '1rem', maxWidth: '150px' }} />
            <Typography variant="h3" component="h1" gutterBottom>
                No se encontró la página
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                No podemos encontrar la página que buscas.
            </Typography>
            <Button
                variant="contained"
                size="large"
                sx={{ mt: 2, backgroundColor: '#1FDF64', '&:hover': { backgroundColor: '#189945' } }}
                onClick={handleGoHome}
            >
                Inicio
            </Button>
        </Box>
    );
}

export default NotFound;
