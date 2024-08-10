import React from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    border: '2px solid #000',
};

function SongsDetails({ open, handleClose, song, handleOpenEdit, handleDelete, user__id }) {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" component="h2">
                    {song.title || 'Sin título'}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Artista: {song.artistName || 'Desconocido'}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Año: {song.year || 'Desconocido'}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Duración: {song.duration ? `${song.duration} segundos` : 'Desconocido'}
                </Typography>
                {song.song_file && (
                    <audio controls style={{ width: '100%', marginTop: '20px' }}>
                        <source src={song.song_file} type="audio/mpeg" />
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                )}
                {String(song.owner) === String(user__id) && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOpenEdit}
                            sx={{ backgroundColor: '#1FDF64', '&:hover': { backgroundColor: '#189945' } }}
                        >
                            Editar
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleDelete}
                            sx={{ backgroundColor: '#FF4C4C', '&:hover': { backgroundColor: '#D32F2F' } }}
                        >
                            Eliminar
                        </Button>
                    </Box>
                )}
            </Box>
        </Modal>
    );
}

export default SongsDetails;