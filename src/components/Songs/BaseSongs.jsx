import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import SongsCards from './SongsCards';
import SongsDetails from './SongsDetailsModal';
import EditSongModal from './EditSongModal';
import AddSongModal from './AddSongModal';
import DeleteSongModal from './DeleteSongModal';
import { useAuth } from '../../contexts/AuthContext';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


// Componente base para manipular las canciones respecto a las props que se envien de los otros componentes (Mysongs y Songs)
function BaseSongs({
    useFetchSongs,
    useAddSong,
    useUpdateSong,
    useDeleteSong,
    isAuthenticated,
    noSongsMessage,
}) {
    const { token, user__id } = useAuth("state");
    const [page, setPage] = useState(1);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const { songs, isLoading, isError, nextUrl, setSongs } = useFetchSongs(page);

    const { addSong } = useAddSong(token, setSongs);
    const { updateSong } = useUpdateSong(token, setSongs);
    const { deleteSong } = useDeleteSong(token, setSongs);

    useEffect(() => {
        if (isError) {
            setSnackbarMessage('Error al cargar las canciones.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    }, [isError]);

    const handleLoadMore = () => {
        if (nextUrl) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handleSongClick = (song) => {
        setSelectedSong(song);
        setIsModalOpen(true);
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
        addSong(newForm)
            .then(() => {
                setSnackbarMessage('Canción añadida correctamente.');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
            })
            .catch(() => {
                setSnackbarMessage('Error al añadir la canción.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            });
        handleCloseAddModal();
    };

    const handleUpdateSong = (updatedForm) => {
        updateSong(updatedForm)
            .then(() => {
                setSnackbarMessage('Canción actualizada correctamente.');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
            })
            .catch(() => {
                setSnackbarMessage('Error al actualizar la canción.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            });
        handleCloseEditModal();
    };

    const handleDeleteSong = () => {
        if (!selectedSong) return;
        deleteSong(selectedSong.id)
            .then(() => {
                setSnackbarMessage('Canción eliminada correctamente.');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
            })
            .catch(() => {
                setSnackbarMessage('Error al eliminar la canción.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            });
        setIsConfirmDeleteModalOpen(false);
        setIsModalOpen(false);
    };

    const handleOpenConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(true);
    };

    const handleCloseConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(false);
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <div style={{ margin: '20px' }}>
            {songs.length === 0 ? (
                <Typography variant="h3" align="center" color="white">
                    {noSongsMessage}
                </Typography>
            ) : (
                <>
                    <Grid container spacing={2}>
                        {songs.map((song) => (
                            <Grid item xs={2.4} sm={2.4} md={2.4} lg={2.4} key={song.id}>
                                <SongsCards song={song} onClick={() => handleSongClick(song)} />
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
                                {isLoading ? "Cargando..." : "Más Canciones"}
                            </Button>
                        </div>
                    )}
                </>
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
                    <SongsDetails
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
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default BaseSongs;
