import { TOGGLE_PLAYLIST_DRAWER } from '../constants';

const initialState = {
    playlistDrawer: false
};

export default function playlistReducer (state = initialState, action) {
    switch (action.type) {

    case TOGGLE_PLAYLIST_DRAWER:
        const { playlistDrawer } = action.data;

        return {
            ...state,
            playlistDrawer: !playlistDrawer
        };

    default:
        return state;
    };
}
