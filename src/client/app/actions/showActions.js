import axios from 'axios';
import { push } from 'react-router-redux';
import { SHOW_SELECT, GET_SHOW } from '../constants';
import { getTokenFromLocalStorage } from '../utils/helperFunctions';

const receiveUserShows = data => ({
    type: SHOW_SELECT,
    data
});

const getUserShows = (userName) => {
    const user = encodeURIComponent(userName);
    const url = `/api/shows?isActive=true&users=${user}`;
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

            dispatch(receiveUserShows(result));
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

export { getUserShows, getShow, navigateToPlaylists };
