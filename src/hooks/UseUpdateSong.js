import { useState } from 'react';

const useUpdateSong = (token, setSongs) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateSong = async (updatedForm) => {
        setIsLoading(true);
        setError(null);

        try {
            if (!updatedForm.has('id')) {
                throw new Error('ID de la canción no proporcionado');
            }

            const songId = updatedForm.get('id');
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/${songId}/`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: updatedForm,
            });

            if (!response.ok) {
                throw new Error('Error al actualizar la canción');
            }

            const data = await response.json();
            setSongs(prevSongs => prevSongs.map(song => song.id === data.id ? data : song));
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { updateSong, isLoading, error };
};

export default useUpdateSong;