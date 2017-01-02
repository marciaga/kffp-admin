import { GET_SHOW, SHOW_SELECT } from '../constants';

const initialState = {
    currentShow: {},
    shows: []
};

export default function showReducer (state = initialState, action) {
    switch (action.type) {

    case GET_SHOW:
        return {
            ...state,
            currentShow: action.data
        }

    case SHOW_SELECT:
        return {
            ...state,
            shows: action.data
        }

    default:
        return state;
    }
}
