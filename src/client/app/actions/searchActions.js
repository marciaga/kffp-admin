import axios from 'axios';
import { UPDATE_SEARCH_FIELD, SEARCH_RESULTS, CLEAR_SEARCH_INPUT } from '../constants';
import { API_URL, API_OFFSET, API_LIMIT, API_RESULT_TYPE } from '../utils/constants';
import { parseSearchResults } from '../utils/searchUtils';

export const searchInput = (val) => {
    return {
        type: UPDATE_SEARCH_FIELD,
        currentSearch: val
    }
};

export const searchForm = (val) => {
    if (val === '') {
        // dispatch validation error
        return;
    }
    const encodedQuery = encodeURIComponent(val);
    const url = `${API_URL}?query=${encodedQuery}&offset=${API_OFFSET}&limit=${API_LIMIT}&type=${API_RESULT_TYPE}`;

    return async (dispatch) => {
        try {
            const { data, status } = await axios.get(url);

            if (status !== 200) {
                console.log('Something went wrong...');
                // dispatch error message
                return;
            }

            const parsedSearchResults = parseSearchResults(data);

            dispatch({
                type: CLEAR_SEARCH_INPUT
            });

            dispatch({
                type: SEARCH_RESULTS,
                data: parsedSearchResults
            });
        } catch (err) {
            console.log(err);
        }
    }
};
