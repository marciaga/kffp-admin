import {
    GET_SHOW_PLAYLISTS,
    ADD_PLAYLIST,
    ADD_TRACK,
    REORDER_SONGS
} from '../constants';

const initialState = {
    playlists: []
};

export default function playlistReducer (state = initialState, action) {
    switch (action.type) {

    case GET_SHOW_PLAYLISTS:
        return {
            ...state,
            playlists: action.data
        };

    case ADD_PLAYLIST:
        return {
            ...state,
            currentPlaylist: action.data
        };

    case ADD_TRACK:
        return {
            ...state,
            currentPlaylist: {
                ...state.currentPlaylist,
                songs: [
                    action.data, ...state.currentPlaylist.songs
                ]
            }
        };

    case REORDER_SONGS:
        const { id, index } = action.data;
        const { songs } = state.currentPlaylist;
        const currentSong = songs.find(song => id === song.id);
        const currentSongIndex = songs.indexOf(currentSong);
        // check whether anything actually changed
        if (index === currentSongIndex) {
            return state;
        }

        // otherwise, reorder the songs accordingly
        const newSongs = [
            ...songs.slice(0, currentSongIndex),
            ...songs.slice(currentSongIndex + 1)
        ];

        newSongs.splice(index, 0, currentSong);

        return {
            ...state,
            currentPlaylist: {
                ...state.currentPlaylist,
                songs: newSongs
            }
        };

    default:
        return state;
    }
}
