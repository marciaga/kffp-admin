import axios from 'axios';
import { getTokenFromLocalStorage } from '../utils/helperFunctions';
import { API_ENDPOINT } from '../utils/constants';
import { getShow } from './showActions';
import { GET_SHOW_PLAYLISTS } from '../constants';

const getShowPlaylists = (pathname) => {
    return async (dispatch) => {
        const idToken = getTokenFromLocalStorage();
        const url = `${API_ENDPOINT}${pathname}`;
        try {
            const { data } = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });
            const { show, playlists } = data;

            dispatch(getShow(show));
            dispatch(receivePlaylist(playlists));
        } catch (e) {
            console.log(e);
        }
    }
}

const receivePlaylist = (data) => {
    return {
        type: GET_SHOW_PLAYLISTS,
        data
    }
};

export { getShowPlaylists };
