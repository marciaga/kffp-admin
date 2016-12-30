import { GET_SHOW_PLAYLISTS } from '../constants';

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

    default:
        return state;
    }
}
