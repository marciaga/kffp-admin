import axios from 'axios';
import { getTokenFromLocalStorage } from '../utils/helperFunctions';
import { API_ENDPOINT } from '../utils/constants';
import { getShow } from './showActions';
import {
    GET_SHOW_PLAYLISTS,
    ADD_PLAYLIST,
    ADD_TRACK,
    CLEAR_SEARCH_RESULTS
} from '../constants';

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
            dispatch(receivePlaylists(playlists));
        } catch (err) {
            console.log(err);
        }
    }
}

const addNewPlaylist = (showId) => {
    return async (dispatch) => {
        const idToken = getTokenFromLocalStorage();
        const url = `${API_ENDPOINT}/playlists`;
        const showData = {
            showId
        };

        try {
            const { data } = await axios.post(url, showData, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });

            dispatch(receivePlaylist(data));
        } catch (err) {
            console.log(err);
        }
    }
};

const addTrack = (track, playlistId) => {
    return async (dispatch) => {
        try {
            const idToken = getTokenFromLocalStorage();
            const url = `${API_ENDPOINT}/playlist/${playlistId}`;
            const { data } = await axios.put(url, track, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });

            if (data.success) {
                dispatch(receiveTrack(track));
            } else {
                // dispatch error message
                console.log('add was unsuccessful');
            }

        } catch (err) {
            console.log(err);
        }

        dispatch({
            type: CLEAR_SEARCH_RESULTS
        });
    }
};

const receiveTrack = (data) => {
    return {
        type: ADD_TRACK,
        data
    }
};

const receivePlaylist = (data) => {
    return {
        type: ADD_PLAYLIST,
        data
    }
}

const receivePlaylists = (data) => {
    return {
        type: GET_SHOW_PLAYLISTS,
        data
    }
};

export { getShowPlaylists, addNewPlaylist, receivePlaylist, addTrack };
