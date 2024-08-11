import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import useFetchArtists from '../../hooks/useFetchArtists';
import ArtistCard from './ArtistCard';
import ArtistModal from './ArtistModal';

// Componente que muestra los artistas obtenidos a traves del hook useFetchArtists
function Artists() {
    const [page, setPage] = useState(1);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { artists, isLoading, isError, nextUrl} = useFetchArtists(page);

    const handleLoadMore = () => {
        if (nextUrl) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handleArtistClick = (artist) => {
        setSelectedArtist(artist);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div style={{ margin: '20px' }}>
            <Grid container spacing={2}>
                {artists.map((artist) => (
                    <Grid item xs={2.4} sm={2.4} md={2.4} lg={2.4} key={artist.id}>
                        <ArtistCard artist={artist} onClick={() => handleArtistClick(artist)} />
                    </Grid>
                ))}
            </Grid>
            {nextUrl && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <Button
                        onClick={handleLoadMore}
                        variant="contained"
                        sx={{ backgroundColor: '#1FDF64', '&:hover': { backgroundColor: '#189945' }, fontSize: '20px' }}
                    >
                        {isLoading ? "Cargando..." : "Mas Artistas"}
                    </Button>
                </div>
            )}
            {selectedArtist && (
                <ArtistModal
                    open={isModalOpen}
                    handleClose={handleCloseModal}
                    artist={selectedArtist}
                />
            )}
        </div>
    );
}

export default Artists;
