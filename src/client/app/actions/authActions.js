import axios from 'axios';
import { push } from 'react-router-redux';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_REQUEST,
    AUTH_VERIFICATION,
    UPDATE_LOGIN_FORM,
    CLEAR_LOGIN_FORM
} from '../constants';
import { getActiveShows } from './showActions';

const loginInputChange = data => ({
    type: UPDATE_LOGIN_FORM,
    data
});

const requestLogin = creds => ({
    type: LOGIN_REQUEST,
    data: {
        isFetching: true,
        isAuthenticated: false,
        creds
    }
});

const receiveLogin = (response) => {
    const { verified, email, displayName, scope } = response.data;

    return {
        type: LOGIN_SUCCESS,
        data: {
            isFetching: false,
            isAuthenticated: true,
            user: {
                verified,
                email,
                displayName,
                scope
            }
        }
    };
};

const loginError = message => ({
    type: LOGIN_FAILURE,
    data: {
        isFetching: false,
        isAuthenticated: false,
        message
    }
});

const verifyLogin = (isAuthenticated) => {
    if (!isAuthenticated) {
        return {
            type: AUTH_VERIFICATION,
            data: {
                verified: false
            }
        };
    }

    const url = '/api/users/verify';
    const idToken = localStorage.getItem('idToken');

    return async (dispatch) => {
        try {
            const { data } = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });

            if (data.code === 401) {
                return dispatch(loginError(data.message));
            }

            dispatch({
                type: AUTH_VERIFICATION,
                data
            });
        } catch (err) {
            console.log(err);
        }
    };
};

const clearLoginForm = () => ({
    type: CLEAR_LOGIN_FORM
});

const loginUser = (creds) => {
    const { email, password } = creds;
    const url = '/api/users/authenticate';

    return async (dispatch) => {
        try {
            const response = await axios.post(url, {
                email,
                password
            });

            const { data } = response;
            localStorage.setItem('idToken', data.idToken);

            dispatch(clearLoginForm());
            dispatch(getActiveShows());
            dispatch(receiveLogin(response));
        } catch (err) {
            const error = { ...err };
            const message = error.response.data.message;

            if (err.statusCode !== 201) {
                return dispatch(loginError(message));
            }
        }
    };
};

const receiveLogout = () => ({
    type: LOGOUT_SUCCESS,
    data: {
        isFetching: false,
        isAuthenticated: false
    }
});

const requestLogout = () => ({
    type: LOGOUT_REQUEST,
    data: {
        isFetching: true,
        isAuthenticated: true
    }
});

const logoutUser = () => (dispatch) => {
    dispatch(requestLogout());

    try {
        localStorage.removeItem('idToken');
        dispatch(push('/'));
        return dispatch(receiveLogout());
    } catch (err) {
        console.log(err);
    }
};

export {
    verifyLogin,
    loginUser,
    loginError,
    receiveLogin,
    requestLogin,
    logoutUser,
    loginInputChange
};
