import { UPDATE_SEARCH_FIELD, SEARCH_RESULTS, CLEAR_SEARCH_INPUT } from '../constants';

const initialState = {
    currentSearch: '',
    searchResults: []
};

export default function searchReducer (state = initialState, action) {
    switch(action.type) {

    case UPDATE_SEARCH_FIELD:
        return Object.assign({}, state, {
            currentSearch: action.currentSearch
        });

    case SEARCH_RESULTS:
        return Object.assign({}, state, {
            searchResults: action.data
        });

    case CLEAR_SEARCH_INPUT:
        return Object.assign({}, state, {
            currentSearch: ''
        });

    default:
        return state;
    }
}
