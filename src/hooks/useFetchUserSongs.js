import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Hook que obtiene las canciones que pertenecen al usuario autenticado
const useFetchUserSongs = (page) => {
    const { token, user__id } = useAuth("state");
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [nextUrl, setNextUrl] = useState(null);

    useEffect(() => {
        const fetchUserSongs = async () => {
            setIsLoading(true);
            const query = new URLSearchParams({
                page,
                page_size: 15,
                ordering: '-created_at',
                owner: user__id,
            }).toString();

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/?${query}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data.results) {
                    setSongs((prevSongs) => [...prevSongs, ...data.results]);
                    setNextUrl(data.next);
                }
            } catch (error) {
                console.error("Error fetching user songs:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserSongs();
    }, [page, user__id, token]);

    return { songs, isLoading, isError, nextUrl, setSongs };
};

export default useFetchUserSongs;
