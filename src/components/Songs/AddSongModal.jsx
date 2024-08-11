import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
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

// Modal para agregar una canción con la comprobacion del usuario autenticado
function AddSongModal({ open, handleClose, onSave, isAuthenticated }) {
    if (!isAuthenticated) {
        return null;
    }

    const [formData, setFormData] = useState({
        title: '',
        year: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [songFile, setSongFile] = useState(null);

    // Este efecto se realiza cuando el modal se abre
    useEffect(() => {
        if (open) {
            setFormData({ title: '', year: '' });
            setImageFile(null);
            setSongFile(null);
        }
    }, [open]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (event.target.accept.includes('image/*')) {
            setImageFile(file);
        } else if (event.target.accept.includes('audio/*')) {
            setSongFile(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newForm = new FormData();
        newForm.append('title', formData.title);
        newForm.append('year', formData.year);
        if (imageFile) {
            newForm.append('cover', imageFile);
        }
        if (songFile) {
            newForm.append('song_file', songFile);
        }
        onSave(newForm);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" component="h2">
                    Agregar Canción
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Subir imagen
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Button>
                    {imageFile && (
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            Imagen seleccionada: {imageFile.name}
                        </Typography>
                    )}
                    <TextField
                        label="Título"
                        required
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Año"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Subir canción
                        <input
                            type="file"
                            hidden
                            accept="audio/*"
                            onChange={handleFileChange}
                        />
                    </Button>
                    {songFile && (
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            Archivo seleccionado: {songFile.name}
                        </Typography>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ backgroundColor: '#1FDF64', '&:hover': { backgroundColor: '#189945' } }}
                        >
                            Guardar
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}

export default AddSongModal;
