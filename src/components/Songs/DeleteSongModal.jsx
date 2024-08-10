import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

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

function DeleteSongModal({ open, handleClose, handleConfirm }) {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                    Confirmar Eliminación
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    ¿Estás seguro de que deseas eliminar esta canción?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClose}
                        sx={{ backgroundColor: '#1FDF64', '&:hover': { backgroundColor: '#189945' } }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleConfirm}
                        sx={{ backgroundColor: '#FF4C4C', '&:hover': { backgroundColor: '#D32F2F' } }}
                    >
                        Eliminar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default DeleteSongModal;