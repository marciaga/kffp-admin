import axios from 'axios';
import {
    UPDATE_SEARCH_FIELD,
    SEARCH_RESULTS,
    CLEAR_SEARCH_INPUT
} from '../constants';
import {
    GENERIC_ERROR_MESSAGE,
    API_URL,
    API_OFFSET,
    API_LIMIT,
    API_RESULT_TYPE
} from '../utils/constants';
import { snackbarMessage } from './feedbackActions';
import { parseSearchResults, getAlbumIds } from '../utils/searchUtils';

export const searchInput = val => ({
    type: UPDATE_SEARCH_FIELD,
    data: {
        currentSearch: val
    }
});

export const searchForm = (val) => {
    if (val === '') {
        return snackbarMessage('Please enter a search!');
    }
    const encodedQuery = encodeURIComponent(val);
    const searchUrl = `${API_URL}/search?query=${encodedQuery}&offset=${API_OFFSET}&limit=${API_LIMIT}&type=${API_RESULT_TYPE}`;

    return async (dispatch) => {
        try {
            const { data, status } = await axios.get(searchUrl);
            const { tracks } = data;

            if (status !== 200) {
                return dispatch(snackbarMessage(GENERIC_ERROR_MESSAGE));
            }

            if (!tracks.items.length) {
                const message = 'Song not found!';
                // no song found, so dispatch action to open new form
                dispatch({ type: CLEAR_SEARCH_INPUT });
                return dispatch(snackbarMessage(message));
            }

            const albumIds = getAlbumIds(data);
            const queryString = albumIds.join();
            const albumUrl = `${API_URL}/albums?ids=${queryString}`;
            const albumResults = await axios.get(albumUrl);

            if (albumResults.status !== 200) {
                return dispatch(snackbarMessage('No Album results... Please try again'));
            }

            const { albums } = albumResults.data;
            const parsedSearchResults = parseSearchResults(data, albums);

            dispatch({
                type: CLEAR_SEARCH_INPUT
            });

            dispatch({
                type: SEARCH_RESULTS,
                data: parsedSearchResults
            });
        } catch (err) {
            return dispatch(snackbarMessage(GENERIC_ERROR_MESSAGE));
        }
    };
};
