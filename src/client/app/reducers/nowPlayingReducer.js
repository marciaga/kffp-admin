import { SET_NOW_PLAYING } from '../constants';

const initialState = { song: {} };

export default function nowPlayingReducer (state = initialState, action) {
    switch (action.type) {
    case SET_NOW_PLAYING:
        return {
            ...state,
            song: action.data
        };
    default:
        return state;
    }
}
