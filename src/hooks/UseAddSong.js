import { useState } from 'react';

const useAddSong = (token, setSongs) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const addSong = async (newForm) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/`, {
                method: 'POST',
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: newForm,
            });

            if (!response.ok) {
                throw new Error('Error al guardar la canción');
            }

            const data = await response.json();
            setSongs(prevSongs => [data, ...prevSongs]);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { addSong, isLoading, error };
};

export default useAddSong;