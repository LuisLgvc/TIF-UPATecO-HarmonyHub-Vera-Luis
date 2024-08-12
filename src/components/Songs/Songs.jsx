import React from 'react';
import BaseSongList from './BaseSongs';
import useFetchSongs from '../../hooks/UseFetchSongs';
import useAddSong from '../../hooks/UseAddSong';
import useUpdateSong from '../../hooks/UseUpdateSong';
import useDeleteSong from '../../hooks/UseDeleteSong';
import { useAuth } from '../../contexts/AuthContext';

// Componente que muestra toda la lista de canciones
function SongList() {
    return (
        <BaseSongList
            useFetchSongs={useFetchSongs}
            useAddSong={useAddSong}
            useUpdateSong={useUpdateSong}
            useDeleteSong={useDeleteSong}
            isAuthenticated={false} // Lo paso como falso asi se deshabilita el agregar canciones en Songs y solo queda para Mysongs 
            noSongsMessage="No se encontraron canciones."
        />
    );
}
export default SongList;
