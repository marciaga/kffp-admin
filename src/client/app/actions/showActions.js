import axios from 'axios';
import { push } from 'react-router-redux';
import { SHOW_SELECT, GET_SHOW } from '../constants';
import { getTokenFromLocalStorage } from '../utils/helperFunctions';

const receiveActiveShows = data => ({
    type: SHOW_SELECT,
    data
});

const getActiveShows = () => {
    const url = '/api/shows?isActive=true';
    const idToken = getTokenFromLocalStorage();

    return async (dispatch) => {
        try {
            const { data } = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });

            const result = data.map((s) => {
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
    };
};

const navigateToPlaylists = slug => (dispatch) => {
    const locationObject = {
        pathname: `/playlists/${slug}`
    };

    dispatch(push(locationObject));
};

const receiveShow = data => ({
    type: GET_SHOW,
    data
});

const getShow = show => dispatch => dispatch(receiveShow(show));

export { getActiveShows, getShow, navigateToPlaylists };
