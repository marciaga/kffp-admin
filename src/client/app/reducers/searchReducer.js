import { UPDATE_SEARCH_FIELD, SEARCH_RESULTS } from '../constants';

const initialState = {};

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

    default:
        return state;
    }
}
