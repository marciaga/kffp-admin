import axios from 'axios';
import { push } from 'react-router-redux';
import { SHOW_SELECT, USER_SHOW_SELECT, GET_SHOW } from '../constants';
import { getTokenFromLocalStorage } from '../utils/helperFunctions';
import { API_ENDPOINT, GENERIC_ERROR_MESSAGE } from '../utils/constants';
import { handleErrorModal } from './feedbackActions';

const receiveUserShows = data => ({
    type: USER_SHOW_SELECT,
    data
});

const receiveAllShows = data => ({
    type: SHOW_SELECT,
    data
});

const getAllShows = () => {
    const url = `${API_ENDPOINT}/shows`;
    const idToken = getTokenFromLocalStorage();

    return async (dispatch) => {
        try {
            const { data } = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });

            dispatch(receiveAllShows(data));
        } catch (e) {
            dispatch(handleErrorModal({
                message: GENERIC_ERROR_MESSAGE,
                open: true
            }));
        }
    };
};

const getUserShows = (userId) => {
    const user = encodeURIComponent(userId);
    const url = `${API_ENDPOINT}/shows?isActive=true&users=${user}`;
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
            dispatch(handleErrorModal({
                message: GENERIC_ERROR_MESSAGE,
                open: true
            }));
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

export { getUserShows, getAllShows, getShow, navigateToPlaylists };
