import axios from 'axios';
import { getTokenFromLocalStorage } from '../utils/helperFunctions';
import { API_ENDPOINT } from '../utils/constants';
import { getShow } from './showActions';
import { snackbarMessage } from './feedbackActions';
import {
    GET_SHOW_PLAYLISTS,
    ADD_PLAYLIST,
    ADD_TRACK,
    CLEAR_SEARCH_RESULTS,
    REORDER_SONGS,
    UPDATE_PLAYLIST_SONGS
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

const receiveSongs = data => ({
    type: UPDATE_PLAYLIST_SONGS,
    data
});

const updatePlaylistSong = (song, playlistId) => async (dispatch) => {
    const idToken = getTokenFromLocalStorage();
    const url = `${API_ENDPOINT}/playlists/${playlistId}`;
    const songData = song;

    try {
        const { data } = await axios.patch(url, songData, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        dispatch(receiveSongs(data));
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
        const url = `${API_ENDPOINT}/playlists/${playlistId}`;
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

const reorderSongsSave = (songs, id) => async (dispatch) => {
    const validatedSongData = songs; // TODO actually validate

    try {
        const idToken = getTokenFromLocalStorage();
        const url = `${API_ENDPOINT}/playlists/${id}/tracks`;
        const { data } = await axios.put(url, validatedSongData, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        if (data.success) {
            const message = 'Track reorder successful!';

            dispatch(snackbarMessage(message));
        } else {
            const errorMessage = 'Track reordering failed';

            dispatch(snackbarMessage(errorMessage));
        }
    } catch (err) {
        console.log(err);
    }
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
    reorderSongs,
    reorderSongsSave,
    updatePlaylistSong
};
