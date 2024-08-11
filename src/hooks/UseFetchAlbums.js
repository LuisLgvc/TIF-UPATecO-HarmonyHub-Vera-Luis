import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const useFetchAlbums = (page, filters) => {
    const { token } = useAuth("state");
    const [albums, setAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [nextUrl, setNextUrl] = useState(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            setIsLoading(true);
            setIsError(false);
            let query = new URLSearchParams({
                page,
                page_size: 15,
                ordering: '-created_at',
                ...filters,
            }).toString();

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/albums/?${query}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data.results) {
                    setAlbums((prevAlbums) => [...prevAlbums, ...data.results]);
                    setNextUrl(data.next);
                }
            } catch (error) {
                console.error("Error fetching albums:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAlbums();
    }, [page, filters, token]);

    return { albums, isLoading, isError, nextUrl, setAlbums };
};

export default useFetchAlbums;
