import React from 'react';
import BaseSongList from './BaseSongs';
import useFetchUserSongs from '../../hooks/useFetchUserSongs';
import useAddSong from '../../hooks/UseAddSong';
import useUpdateSong from '../../hooks/UseUpdateSong';
import useDeleteSong from '../../hooks/UseDeleteSong';
import { useAuth } from '../../contexts/AuthContext';

// Componente que muestra la lista de canciones que pertecenen al usuario logueado
function MySongs() {
    const { isAuthenticated } = useAuth("state");

    return (
        <BaseSongList
            useFetchSongs={useFetchUserSongs}
            useAddSong={useAddSong}
            useUpdateSong={useUpdateSong}
            useDeleteSong={useDeleteSong}
            isAuthenticated={isAuthenticated}
            noSongsMessage="No hay canciones aún."
        />
    );
}

export default MySongs;
