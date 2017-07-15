import axios from 'axios';
import {
    API_ENDPOINT,
    SPOTIFY_API_URL,
    GENERIC_ERROR_MESSAGE
} from './constants';
import { SEARCH_RESULTS, CLEAR_SEARCH_INPUT } from '../constants';
import { snackbarMessage, handleErrorModal } from '../actions/feedbackActions';

const getAlbumIds = (results) => {
    const { tracks } = results;
    if (!Array.isArray(tracks.items)) {
        return;
    }

    return tracks.items.map((item) => {
        const { id } = item && item.album ? item.album : '';

        return id;
    });
};

const parseSearchResults = (results, albums) => {
    const { tracks } = results;

    if (!Array.isArray(tracks.items) || !albums.length) {
        return;
    }

    return tracks.items.map((item) => {
        const { artists, album, name } = item;
        const artist = artists.length > 0 ? artists.shift().name : 'Artist Not Found';
        const albumName = album.name || 'Album Not Found';
        const { images, id } = album;
        const { release_date, label } = albums.find(a => a.id === id);

        return {
            artist,
            title: name || '',
            album: albumName,
            label,
            releaseDate: release_date,
            images
        };
    });
};

const getTokenFromServer = async (refresh, dispatch) => {
    // check local storage for spotify token
    const spotifyToken = window.localStorage ?
        localStorage.getItem('spotify_token') : null;

    if (!spotifyToken || refresh) {
        try {
            const url = `${API_ENDPOINT}/search/token`;
            const { data } = await axios.get(url);
            const { success, token } = data;

            if (window.localStorage && success) {
                localStorage.setItem('spotify_token', token);

                return token;
            }
        } catch (e) {
            return dispatch(handleErrorModal({
                message: 'Something went wrong on Spotify. Please try again.',
                open: true
            }));
        }
    }
    return spotifyToken;
};

const getSpotifyQuery = async (dispatch, searchUrl, token) => {
    const { data, status } = await axios.get(searchUrl, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const { tracks } = data;

    if (status !== 200) {
        return dispatch(handleErrorModal({
            message: GENERIC_ERROR_MESSAGE,
            open: true
        }));
    }

    if (!tracks.items.length) {
        const message = 'Song not found!';
        // no song found, so dispatch action to open new form
        dispatch({ type: CLEAR_SEARCH_INPUT });

        return dispatch(snackbarMessage(message));
    }

    const albumIds = getAlbumIds(data);
    const queryString = albumIds.join();
    const albumUrl = `${SPOTIFY_API_URL}/albums?ids=${queryString}`;
    const albumResults = await axios.get(albumUrl, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (albumResults.status !== 200) {
        return dispatch(snackbarMessage('No Album results... Please try again'));
    }

    const { albums } = albumResults.data;
    const parsedSearchResults = parseSearchResults(data, albums);

    dispatch({
        type: CLEAR_SEARCH_INPUT
    });

    dispatch({
        type: SEARCH_RESULTS,
        data: parsedSearchResults
    });
};

export { parseSearchResults, getAlbumIds, getTokenFromServer, getSpotifyQuery };
