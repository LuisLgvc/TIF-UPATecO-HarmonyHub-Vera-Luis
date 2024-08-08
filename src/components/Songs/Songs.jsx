import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import SongsCards from './SongsCards';
import SongsDetailsModal from './SongsDetailsModal';

function Songs() {
    const [songs, setSongs] = useState([]);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [nextUrl, setNextUrl] = useState(null);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const doFetch = async () => {
        setIsLoading(true);
        let query = new URLSearchParams({
            page: page,
            page_size: 15,
            ordering: `-created_at`,
            ...filters,
        }).toString();

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/?${query}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.results) {
                setSongs((prevSongs) => [...prevSongs, ...data.results]);
                setNextUrl(data.next);
            }
        } catch (error) {
            console.error("Error fetching songs:", error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchArtistName = async (artistId) => {
        if (artistId) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/${artistId}/`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const artistData = await response.json();
                return artistData.name;
            } catch (error) {
                console.error("Error fetching artist:", error);
            }
        }
    };

    const handleSongClick = async (song) => {
        const artistId = song.artists[0]; // Asumiendo que el primer ID en el array es el ID del artista principal
        const artistName = await fetchArtistName(artistId);
        song.artistName = artistName; // Añadir el nombre del artista a la canción
        setSelectedSong(song);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSong(null);
    };

    useEffect(() => {
        doFetch();
    }, [page, filters]);

    return (
        <div style={{ margin: '20px' }}>
            <Grid container spacing={2}>
                {songs.map((song, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={index}>
                        <SongsCards song={song} onClick={() => handleSongClick(song)} />
                    </Grid>
                ))}
            </Grid>
            {nextUrl && (
                <div style={{ textAlign: "center", margin: "20px" }}>
                    <Button
                        onClick={() => setPage(page + 1)}
                        disabled={isLoading}
                        variant="contained"
                        color="success"
                        size="large"
                    >
                        {isLoading ? "Cargando..." : "Cargar más"}
                    </Button>
                </div>
            )}
            {isError && <div>Error al cargar las canciones.</div>}
            <SongsDetailsModal open={isModalOpen} handleClose={handleCloseModal} song={selectedSong} />
        </div>
    );
}

export default Songs;