import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import useFetchSongs from '../../hooks/UseFetchSongs';
import useUpdateSong from '../../hooks/UseUpdateSong';
import useAddSong from '../../hooks/UseAddSong';
import useDeleteSong from '../../hooks/UseDeleteSong';
import SongCard from './SongCard';
import SongModal from './SongModal';
import EditSongModal from './EditSongModal';
import AddSongModal from './AddSongModal';
import DeleteSongModal from './DeleteSongModal';
import { useAuth } from '../../contexts/AuthContext';

function SongList() {
    const { token, user__id, isAuthenticated } = useAuth("state");
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const [selectedSong, setSelectedSong] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

    const { songs, isLoading, isError, nextUrl, setSongs } = useFetchSongs(page, filters);

    const { addSong } = useAddSong(token, setSongs);
    const { updateSong } = useUpdateSong(token, setSongs);
    const { deleteSong } = useDeleteSong(token, setSongs);

    const handleLoadMore = () => {
        if (nextUrl) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handleSongClick = async (song) => {
        try {
            setSelectedSong(song);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching artist name:', error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenEditModal = (song) => {
        setSelectedSong(song);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedSong(null);
    };

    const handleAddSongClick = () => {
        setSelectedSong(null);
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleSaveSong = (newForm) => {
        addSong(newForm);
        handleCloseAddModal();
    };

    const handleUpdateSong = (updatedForm) => {
        updateSong(updatedForm);
        handleCloseEditModal();
    };

    const handleDeleteSong = async () => {
        if (!selectedSong) return;
        await deleteSong(selectedSong.id);
        setIsConfirmDeleteModalOpen(false);
        setIsModalOpen(false);
    };

    const handleOpenConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(true);
    };

    const handleCloseConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(false);
    };

    return (
        <div style={{ margin: '20px' }}>
            <Grid container spacing={2}>
                {songs.map((song) => (
                    <Grid item xs={2.4} sm={2.4} md={2.4} lg={2.4} key={song.id}>
                        <SongCard song={song} onClick={() => handleSongClick(song)} />
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
                        {isLoading ? "Cargando..." : "Mas Canciones"}
                    </Button>
                </div>
            )}
            {isAuthenticated && (
                <Button
                    onClick={handleAddSongClick}
                    variant="contained"
                    sx={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        borderRadius: '30%',
                        minWidth: '70px',
                        minHeight: '70px',
                        fontSize: '35px',
                        backgroundColor: '#1FDF64',
                        '&:hover': {
                            backgroundColor: '#189945',
                        },
                    }}
                >
                    +
                </Button>
            )}
            {selectedSong && (
                <>
                    <SongModal
                        open={isModalOpen}
                        handleClose={handleCloseModal}
                        song={selectedSong}
                        handleOpenEdit={handleOpenEditModal}
                        handleDelete={handleOpenConfirmDeleteModal}
                        user__id={user__id}
                    />
                    <EditSongModal
                        open={isEditModalOpen}
                        handleClose={handleCloseEditModal}
                        song={selectedSong}
                        token={token}
                        onSave={handleUpdateSong}
                    />
                    <DeleteSongModal
                        open={isConfirmDeleteModalOpen}
                        handleClose={handleCloseConfirmDeleteModal}
                        handleConfirm={handleDeleteSong}
                    />
                </>
            )}
            <AddSongModal
                open={isAddModalOpen}
                handleClose={handleCloseAddModal}
                onSave={handleSaveSong}
                isAuthenticated={isAuthenticated}
            />
        </div>
    );
}

export default SongList;
