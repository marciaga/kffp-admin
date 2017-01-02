import {
    UPDATE_SEARCH_FIELD,
    SEARCH_RESULTS,
    CLEAR_SEARCH_INPUT,
    CLEAR_SEARCH_RESULTS
} from '../constants';

const initialState = {
    currentSearch: '',
    searchResults: []
};

export default function searchReducer (state = initialState, action) {
    switch(action.type) {

    case UPDATE_SEARCH_FIELD:
        const { currentSearch } = action.data;

        return {
            ...state,
            currentSearch
        }
    case SEARCH_RESULTS:
        return {
            ...state,
            searchResults: action.data
        }

    case CLEAR_SEARCH_INPUT:
        return {
            ...state,
            currentSearch: ''
        }

    case CLEAR_SEARCH_RESULTS:
        return {
            ...state,
            searchResults: []
        }

    default:
        return state;
    }
}
