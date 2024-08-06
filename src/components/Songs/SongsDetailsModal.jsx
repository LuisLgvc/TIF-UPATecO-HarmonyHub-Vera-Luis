import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function SongsDetails({ open, handleClose, song }) {
    if (!song) return null;

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
                    {song.title}
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
            </Box>
        </Modal>
    );
}

export default SongsDetails;