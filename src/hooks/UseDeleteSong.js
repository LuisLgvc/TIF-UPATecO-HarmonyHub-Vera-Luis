import { useState } from 'react';

const useDeleteSong = (token, setSongs) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteSong = async (songId) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/${songId}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la canción');
            }

            setSongs(prevSongs => prevSongs.filter(song => song.id !== songId));
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { deleteSong, isLoading, error };
};

export default useDeleteSong;