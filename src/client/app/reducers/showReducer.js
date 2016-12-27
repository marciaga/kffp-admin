import { SHOW_SELECT } from '../constants';

const initialState = [];

export default function showReducer (state = initialState, action) {
    switch (action.type) {

    case SHOW_SELECT:
        return {
            ...state,
            shows: action.data
        }

    default:
        return state;
    }
}
