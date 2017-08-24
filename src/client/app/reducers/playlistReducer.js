import {
    GET_SHOW_PLAYLISTS,
    ADD_PLAYLIST,
    ADD_PLAYLIST_TO_SIDEBAR,
    UPDATE_PLAYLIST_SONGS,
    ADD_TRACK,
    DELETE_TRACK,
    REORDER_SONGS,
    RESET_CURRENT_PLAYLIST,
    UPDATE_PLAYLIST_FIELD,
    DELETE_PLAYLIST
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

    case RESET_CURRENT_PLAYLIST:
        return {
            ...state,
            currentPlaylist: {
                songs: []
            }
        };

    case ADD_PLAYLIST_TO_SIDEBAR:
        return {
            ...state,
            playlists: [
                ...state.playlists,
                action.data
            ]
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

    case DELETE_TRACK:
        const trackId = action.data.id;
        const filteredSongs = state.currentPlaylist.songs.filter(s => s.id !== trackId);

        return {
            ...state,
            currentPlaylist: {
                ...state.currentPlaylist,
                songs: filteredSongs
            }
        };

    case UPDATE_PLAYLIST_SONGS:
        return {
            ...state // TODO @ma: this should actually replace the old song
        };

    case UPDATE_PLAYLIST_FIELD:
        const { playlistDate, playlistId } = action.data;

        return {
            ...state,
            currentPlaylist: {
                ...state.currentPlaylist,
                playlistDate
            },
            playlists: state.playlists.map((p) => {
                if (p.playlistId === playlistId) {
                    p.playlistDate = playlistDate;
                }

                return p;
            })
        };

    case DELETE_PLAYLIST:
        const { playlistId: pid } = action.data;

        return {
            ...state,
            currentPlaylist: {},
            playlists: state.playlists.map(p => p.playlistId !== pid)
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
