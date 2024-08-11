import React from 'react';
import { Modal, Box, Typography, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#101010',
    color: '#FFFFFF',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    border: '2px solid #000',
};

function AlbumModal({ open, handleClose, album, handleOpenEdit, handleDelete, user__id }) {
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
                    {album.title || 'Sin título'}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Artista: {album.artistName || 'Desconocido'}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Año: {album.releaseYear || 'Desconocido'}
                </Typography>
                {/* <Typography sx={{ mt: 2 }}>
                    Canciones: {album.songs.length || 0}
                </Typography> */}                
            </Box>
        </Modal>
    );
}

export default AlbumModal;
