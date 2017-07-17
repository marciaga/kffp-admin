import axios from 'axios';
import { push } from 'react-router-redux';
import {
    getTokenFromLocalStorage,
    cleanPathname,
    pathHasPlaylistId,
    removePlaylistIdFromPath
} from '../utils/helperFunctions';
import { API_ENDPOINT, GENERIC_ERROR_MESSAGE } from '../utils/constants';
import { getShow } from './showActions';
import {
    handleErrorModal,
    snackbarMessage,
    confirmOpen
} from './feedbackActions';
import {
    GET_SHOW_PLAYLISTS,
    ADD_PLAYLIST,
    ADD_PLAYLIST_TO_SIDEBAR,
    ADD_TRACK,
    DELETE_TRACK,
    CLEAR_SEARCH_RESULTS,
    REORDER_SONGS,
    UPDATE_PLAYLIST_SONGS,
    UPDATE_PLAYLIST_FIELD,
    RESET_CURRENT_PLAYLIST,
    DELETE_PLAYLIST
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

const deletePlaylist = (playlistId, slug) => async (dispatch) => {
    const idToken = getTokenFromLocalStorage();
    const url = `${API_ENDPOINT}/playlists/${playlistId}`;

    try {
        const { data } = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        if (data.success) {
            const message = 'Playlist deleted successfully!';

            dispatch(snackbarMessage(message));

            dispatch({
                type: DELETE_PLAYLIST,
                data: {
                    playlistId
                }
            });

            dispatch(confirmOpen(false));

            dispatch(push(`/playlists/${slug}`));
        } else {
            const errorMessage = 'Playlist delete failed';

            dispatch(handleErrorModal({
                message: errorMessage,
                open: true
            }));
        }
    } catch (err) {
        dispatch(handleErrorModal({
            message: GENERIC_ERROR_MESSAGE,
            open: true
        }));
    }
};

const getShowPlaylists = pathname => async (dispatch) => {
    const idToken = getTokenFromLocalStorage();
    const pathHasId = pathHasPlaylistId(pathname);
    const showPath = pathHasId ? removePlaylistIdFromPath(pathname) : pathname;
    const path = cleanPathname(pathname);
    const url = `${API_ENDPOINT}${showPath}`;

    try {
        const { data } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });
        const { show, playlists } = data;

        dispatch(getShow(show));
        dispatch(receivePlaylists(playlists));
        // if there's a playlist ID, set the current Playlist
        if (pathHasPlaylistId(path)) {
            const playlistId = path.split('/').pop();
            const playlist = playlists.find(p => p.playlistId === playlistId);

            dispatch(receivePlaylist(playlist));
        }
    } catch (err) {
        dispatch(handleErrorModal({
            message: GENERIC_ERROR_MESSAGE,
            open: true
        }));
    }
};

const receiveSongs = data => ({
    type: UPDATE_PLAYLIST_SONGS,
    data
});

const receivePlaylistFieldUpdate = data => ({
    type: UPDATE_PLAYLIST_FIELD,
    data
});

const updatePlaylistDate = (date, playlistId) => async (dispatch) => {
    const idToken = getTokenFromLocalStorage();
    const url = `${API_ENDPOINT}/playlists/${playlistId}`;
    const isoDate = date.toISOString();
    const payload = { playlistDate: isoDate };

    try {
        const { data } = await axios.patch(url, payload, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        const { success, message } = data;

        if (success) {
            dispatch(snackbarMessage(message));

            return dispatch(receivePlaylistFieldUpdate({ playlistId,
                playlistDate: isoDate
            }));
        }

        dispatch(snackbarMessage(message));
    } catch (err) {
        dispatch(handleErrorModal({
            message: GENERIC_ERROR_MESSAGE,
            open: true
        }));
    }
};

const updatePlaylistSong = (song, playlistId) => async (dispatch) => {
    const idToken = getTokenFromLocalStorage();
    const url = `${API_ENDPOINT}/playlists/${playlistId}/tracks`;
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
        dispatch(handleErrorModal({
            message: GENERIC_ERROR_MESSAGE,
            open: true
        }));
    }
};

const addNewPlaylist = (showId, slug) => async (dispatch) => {
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

        const { playlistId } = data;

        dispatch(receivePlaylist(data));

        dispatch(push(`/playlists/${slug}/${playlistId}`));

        dispatch(addNewPlaylistToSidebar(data));
    } catch (err) {
        dispatch(handleErrorModal({
            message: GENERIC_ERROR_MESSAGE,
            open: true
        }));
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
            dispatch(handleErrorModal({
                message: 'Add was unsuccessful. Please try again.',
                open: true
            }));
        }
    } catch (err) {
        dispatch(handleErrorModal({
            message: GENERIC_ERROR_MESSAGE,
            open: true
        }));
    }

    dispatch({
        type: CLEAR_SEARCH_RESULTS
    });
};

const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS
});

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

            dispatch(handleErrorModal({
                message: errorMessage,
                open: true
            }));
        }
        dispatch(confirmOpen(false, null));
    } catch (err) {
        dispatch(handleErrorModal({
            message: GENERIC_ERROR_MESSAGE,
            open: true
        }));
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

            dispatch(handleErrorModal({
                message: errorMessage,
                open: true
            }));
        }
    } catch (err) {
        dispatch(handleErrorModal({
            message: GENERIC_ERROR_MESSAGE,
            open: true
        }));
    }
};

const reorderSongs = data => ({
    type: REORDER_SONGS,
    data
});

const removeAirbreak = id => ({
    type: DELETE_TRACK,
    data: { id }
});

export {
    getShowPlaylists,
    addNewPlaylist,
    receivePlaylist,
    addTrack,
    addAirBreak,
    removeAirbreak,
    reorderSongs,
    reorderSongsSave,
    updatePlaylistSong,
    deleteSongFromPlaylist,
    receiveSongs,
    resetCurrentPlaylist,
    updatePlaylistDate,
    deletePlaylist,
    clearSearchResults
};
