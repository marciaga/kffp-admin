import axios from 'axios';
import moment from 'moment';
import { API_ENDPOINT } from '../utils/constants';
import { getTokenFromLocalStorage } from '../utils/helperFunctions';
import { receiveSongs } from './playlistActions';
import { SET_NOW_PLAYING } from '../constants';

const setNowPlaying = data => ({
    type: SET_NOW_PLAYING,
    data
});

const updateNowPlaying = params => async (dispatch) => {
    const { song, playlistId } = params;

    try {
        const idToken = getTokenFromLocalStorage();
        const url = `${API_ENDPOINT}/now-playing`;
        const now = moment().toISOString();
        const songData = {
            song,
            playlistId,
            playedAt: now
        };
        const { data } = await axios.put(url, songData, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        if (data.success) {
            dispatch(receiveSongs({
                ...song,
                playedAt: now
            }));
            // TODO @ma: should this also update the form?

            return dispatch(setNowPlaying(data.value));
        }
    } catch (e) {
        console.log(e);
    }
};

export { updateNowPlaying, setNowPlaying };