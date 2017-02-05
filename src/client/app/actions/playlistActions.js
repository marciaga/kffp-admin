import axios from 'axios';
import { getTokenFromLocalStorage } from '../utils/helperFunctions';
import { API_ENDPOINT } from '../utils/constants';
import { getShow } from './showActions';
import { snackbarMessage } from './feedbackActions';
import {
    GET_SHOW_PLAYLISTS,
    ADD_PLAYLIST,
    ADD_PLAYLIST_TO_SIDEBAR,
    ADD_TRACK,
    DELETE_TRACK,
    CLEAR_SEARCH_RESULTS,
    REORDER_SONGS,
    UPDATE_PLAYLIST_SONGS,
    RESET_CURRENT_PLAYLIST
} from '../constants';

const receiveTrack = data => ({
    type: ADD_TRACK,
    data
});

const resetCurrentPlaylist = () => ({
    type: RESET_CURRENT_PLAYLIST
});

const receivePlaylist = data => ({
    type: ADD_PLAYLIST,
    data
});

const receivePlaylists = data => ({
    type: GET_SHOW_PLAYLISTS,
    data
});

const removeTrackFromPlaylist = id => ({
    type: DELETE_TRACK,
    data: { id }
});

const addNewPlaylistToSidebar = data => ({
    type: ADD_PLAYLIST_TO_SIDEBAR,
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

        const { success, message } = data;

        if (success) {
            dispatch(snackbarMessage(message));
            return dispatch(receiveSongs(song));
        }

        dispatch(snackbarMessage(message));
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
        dispatch(addNewPlaylistToSidebar(data));
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
            dispatch(receiveTrack(data.track));
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

const addAirBreak = data => ({
    type: ADD_TRACK,
    data
});

const deleteSongFromPlaylist = (song, playlistId) => async (dispatch) => {
    const { id } = song;
    try {
        const idToken = getTokenFromLocalStorage();
        const url = `${API_ENDPOINT}/playlists/${playlistId}/tracks/${id}`;
        const { data } = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        if (data.success) {
            const message = 'Track deleted successfully!';

            dispatch(removeTrackFromPlaylist(id));
            dispatch(snackbarMessage(message));
        } else {
            const errorMessage = 'Track delete failed';

            dispatch(snackbarMessage(errorMessage));
        }
    } catch (err) {
        console.log(err);
    }
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
    addAirBreak,
    reorderSongs,
    reorderSongsSave,
    updatePlaylistSong,
    deleteSongFromPlaylist,
    receiveSongs,
    resetCurrentPlaylist
};
