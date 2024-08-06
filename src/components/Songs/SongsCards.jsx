import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

function SongsCards({ song, onClick }) {
    return (
        <Card 
            onClick={onClick} 
            sx={{
                backgroundColor: 'black',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(255, 255, 255, 0.2)',
                color: 'white',
                transition: 'transform 0.2s', // Añade una transición para el efecto de crecimiento
                '&:hover': {
                    transform: 'scale(1.02)', // Efecto de crecimiento al pasar el ratón
                },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%', // Asegura que la carta ocupe todo el espacio disponible
            }}
        >
            <CardMedia
                component="img"
                height="150" // Mantén la altura de la imagen
                image={song.cover || '../../assets/notFoundImg.png'}
                alt="Cover"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" color="#7a7a7a">
                    {song.title}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default SongsCards;