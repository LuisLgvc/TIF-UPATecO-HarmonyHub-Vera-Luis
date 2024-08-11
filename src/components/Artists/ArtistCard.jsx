import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import logo from '../../assets/notFoundImg.png';

function ArtistCard({ artist, onClick }) {
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
                image={artist.image || logo}
                alt="Artist Image"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" color="#7a7a7a">
                    {artist.name}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ArtistCard;