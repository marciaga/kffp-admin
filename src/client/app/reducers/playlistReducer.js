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
        }

    case ADD_PLAYLIST:
        return {
            ...state,
            currentPlaylist: action.data
        }

    case ADD_TRACK:
        return {
            ...state,
            currentPlaylist: {
                ...state.currentPlaylist,
                songs: [
                    action.data, ...state.currentPlaylist.songs
                ]
            }
        }

    case REORDER_SONGS:
        
        return state;
    default:
        return state;
    }
}
