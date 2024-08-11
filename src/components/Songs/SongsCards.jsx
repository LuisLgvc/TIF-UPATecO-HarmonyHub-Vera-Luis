import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

// Carta que muestra la informacion basica de una canción
function SongsCards({ song, onClick }) {
    return (
        <Card 
            onClick={onClick} 
            sx={{
                backgroundColor: '#121212',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(255, 255, 255, 0.2)',
                color: 'white',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.02)',
                },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
            }}
        >
            <CardMedia
                component="img"
                height="150"
                image={song.cover || '../../assets/notFoundImg.png'}
                alt="Cover"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" color="#7a7a7a">
                    {song.title}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default SongsCards;