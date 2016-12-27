import axios from 'axios';
import { SHOW_SELECT } from '../constants';
import { getTokenFromLocalStorage } from '../utils/helperFunctions';

const getActiveShows = () => {
    const url = `/api/shows?isActive=true`;
    const idToken = getTokenFromLocalStorage();

    return async (dispatch) => {
        try {
            const { data } = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });

            const result = data.map(s => {
                const { _id, showName } = s;

                return {
                    _id,
                    showName
                };
            });

            dispatch(receiveActiveShows(result));

        } catch (err) {
            console.log(err);
        }

    }
};

const receiveActiveShows = (data) => {
    return {
        type: SHOW_SELECT,
        data: data
    }
};

export { getActiveShows };
