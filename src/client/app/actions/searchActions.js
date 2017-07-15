import {
    UPDATE_SEARCH_FIELD
} from '../constants';
import {
    SPOTIFY_API_URL,
    SPOTIFY_API_OFFSET,
    SPOTIFY_API_LIMIT,
    SPOTIFY_API_RESULT_TYPE,
    GENERIC_ERROR_MESSAGE
} from '../utils/constants';
import { snackbarMessage, handleErrorModal } from './feedbackActions';
import {
    getTokenFromServer,
    getSpotifyQuery
} from '../utils/searchUtils';

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
    const searchUrl = `${SPOTIFY_API_URL}/search?query=${encodedQuery}&offset=${SPOTIFY_API_OFFSET}&limit=${SPOTIFY_API_LIMIT}&type=${SPOTIFY_API_RESULT_TYPE}`;

    return async (dispatch) => {
        let counter = 0;

        const f = async (refresh = false) => {
            try {
                const token = await getTokenFromServer(refresh, dispatch);

                return await getSpotifyQuery(dispatch, searchUrl, token);
            } catch (err) {
                const { response } = err;

                if ((response && (response.status === 401)) && counter < 5) {
                    counter++;
                    // our token is expired, so get a new one and try the search again
                    const getNewToken = true;
                    return await f(getNewToken, dispatch);
                }

                return dispatch(handleErrorModal({
                    message: GENERIC_ERROR_MESSAGE,
                    open: true
                }));
            }
        };

        try {
            return await f();
        } catch (e) {
            return dispatch(handleErrorModal({
                message: GENERIC_ERROR_MESSAGE,
                open: true
            }));
        }
    };
};
