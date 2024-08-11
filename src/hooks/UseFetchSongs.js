import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const useFetchSongs = (page, filters) => {
    const { token } = useAuth("state");
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [nextUrl, setNextUrl] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            setIsLoading(true);
            let query = new URLSearchParams({
                page,
                page_size: 15,
                ordering: '-created_at',
                ...filters,
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
                console.error("Error fetching songs:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSongs();
    }, [page, filters, token]);

    return { songs, isLoading, isError, nextUrl, setSongs };
};

export default useFetchSongs;
