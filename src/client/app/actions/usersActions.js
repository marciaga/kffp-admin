import axios from 'axios';
import { GET_USERS } from '../constants';

const getUsers = (user) => {

    if (user.role !== 'admin') {
        // redirect to root path
    }

    const url = '/api/users';
    const idToken = localStorage.getItem('idToken');

    return async (dispatch) => {
        try {
            const { data } = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });

            dispatch(receiveUsers(data));

        } catch (err) {
            console.log(err);
        }
    }
};

const receiveUsers = (data) => {
    return {
        type: GET_USERS,
        data: data
    }
};

export { getUsers };
