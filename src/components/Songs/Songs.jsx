import React from 'react';
import BaseSongList from './BaseSongs';
import useFetchSongs from '../../hooks/UseFetchSongs';
import useAddSong from '../../hooks/UseAddSong';
import useUpdateSong from '../../hooks/UseUpdateSong';
import useDeleteSong from '../../hooks/UseDeleteSong';
import { useAuth } from '../../contexts/AuthContext';

// Componente que muestra toda la lista de canciones
function SongList() {
    const { isAuthenticated } = useAuth("state");

    return (
        <BaseSongList
            useFetchSongs={useFetchSongs}
            useAddSong={useAddSong}
            useUpdateSong={useUpdateSong}
            useDeleteSong={useDeleteSong}
            isAuthenticated={isAuthenticated}
            noSongsMessage="No se encontraron canciones."
        />
    );
}

export default SongList;
