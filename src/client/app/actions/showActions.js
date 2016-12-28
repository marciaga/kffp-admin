import axios from 'axios';
import { push } from 'react-router-redux';
import { SHOW_SELECT } from '../constants';
import { getTokenFromLocalStorage } from '../utils/helperFunctions';

const getActiveShows = () => {
    const url = `/api/shows?isActive=true`;
    const idToken = getTokenFromLocalStorage();

    return async (dispatch) => {
        try {
            const { data } = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });

            const result = data.map(s => {
                const { slug, showName } = s;

                return {
                    slug,
                    showName
                };
            });

            dispatch(receiveActiveShows(result));

        } catch (err) {
            console.log(err);
        }

    }
};

const navigateToPlaylists = (slug) => {
    return dispatch => {
        const locationObject = {
            pathname: `/playlists/${slug}`
        };

        dispatch(push(locationObject));
    }
};

const receiveActiveShows = (data) => {
    return {
        type: SHOW_SELECT,
        data: data
    }
};

export { getActiveShows, navigateToPlaylists };
