import axios from 'axios';
import { getTokenFromLocalStorage } from '../utils/helperFunctions';
import { API_ENDPOINT } from '../utils/constants';
import { getShow } from './showActions';
import {
    GET_SHOW_PLAYLISTS,
    ADD_PLAYLIST,
    ADD_TRACK,
    CLEAR_SEARCH_RESULTS,
    REORDER_SONGS
} from '../constants';

const receiveTrack = data => ({
    type: ADD_TRACK,
    data
});

const receivePlaylist = data => ({
    type: ADD_PLAYLIST,
    data
});

const receivePlaylists = data => ({
    type: GET_SHOW_PLAYLISTS,
    data
});

const getShowPlaylists = pathname => async (dispatch) => {
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
};

const addNewPlaylist = showId => async (dispatch) => {
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
};

const addTrack = (track, playlistId) => async (dispatch) => {
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
};

const reorderSongs = data => ({
    type: REORDER_SONGS,
    data
});

export {
    getShowPlaylists,
    addNewPlaylist,
    receivePlaylist,
    addTrack,
    reorderSongs
};
