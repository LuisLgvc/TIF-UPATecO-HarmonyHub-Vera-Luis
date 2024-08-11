import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const useFetchArtists = (page, filters) => {
    const { token } = useAuth("state");
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [nextUrl, setNextUrl] = useState(null);

    useEffect(() => {
        const fetchArtists = async () => {
            setIsLoading(true);
            setIsError(false);
            let query = new URLSearchParams({
                page,
                page_size: 15,
                ordering: '-created_at',
                ...filters,
            }).toString();

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/?${query}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                setArtists((prevArtists) => [...prevArtists, ...data.results]);
                setNextUrl(data.next);

            } catch (error) {
                setIsError(true);
                console.error('Error fetching artists:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArtists();
    }, [page, filters, token]);

    return { artists, isLoading, isError, nextUrl, setArtists };
};

export default useFetchArtists;
