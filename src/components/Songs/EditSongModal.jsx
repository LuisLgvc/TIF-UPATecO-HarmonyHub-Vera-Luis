import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

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

function EditSongModal({ open, handleClose, song, token, onSave }) {
    const [formData, setFormData] = useState({
        id: song.id,
        title: song.title,
        year: song.year,
        song_file: song.song_file,
        owner: song.owner,
    });
    const [songFile, setSongFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setSongFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedForm = new FormData();
        updatedForm.append('id', formData.id);
        updatedForm.append('title', formData.title);
        updatedForm.append('year', formData.year);
        updatedForm.append('owner', formData.owner);
        if (songFile) {
            updatedForm.append('song_file', songFile);
        }

        onSave(updatedForm);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box component="form" onSubmit={handleSubmit} sx={style}>
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
                    Editar Canción
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Título"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="year"
                    label="Año"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                />
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    onChange={handleFileChange}
                >
                    Elegir archivo de canción
                    <VisuallyHiddenInput type="file" accept="audio/*"/>
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
            </Box>
        </Modal>
    );
}

export default EditSongModal;