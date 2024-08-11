import React from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
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

function ArtistModal({ open, handleClose, artist, handleOpenEdit, handleDelete, user__id }) {
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
                    {artist.name || 'Sin nombre'}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Bio: {artist.bio || 'Sin biografía'}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Website: {artist.website || 'Sin sitio web'}
                </Typography>
            </Box>
        </Modal>
    );
}

export default ArtistModal;
