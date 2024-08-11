import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import useFetchAlbums from '../../hooks/UseFetchAlbums';
import AlbumCard from './AlbumCard';
import AlbumModal from './AlbumModal';
import { useAuth } from '../../contexts/AuthContext';

function Albums() {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { albums, isLoading, isError, nextUrl, setAlbums } = useFetchAlbums(page, filters);

    const handleLoadMore = () => {
        if (nextUrl) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handleAlbumClick = (album) => {
        setSelectedAlbum(album);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div style={{ margin: '20px' }}>
            <Grid container spacing={2}>
                {albums.map((album) => (
                    <Grid item xs={2.4} sm={2.4} md={2.4} lg={2.4} key={album.id}>
                        <AlbumCard album={album} onClick={() => handleAlbumClick(album)} />
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
                        {isLoading ? "Cargando..." : "Mas Albumes"}
                    </Button>
                </div>
            )}
            {selectedAlbum && (
                <AlbumModal
                    open={isModalOpen}
                    handleClose={handleCloseModal}
                    album={selectedAlbum}
                />
            )}
        </div>
    );
}

export default Albums;
