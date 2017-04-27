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
import { getUserShows, getAllShows } from './showActions';
import { snackbarMessage } from './feedbackActions';
import { GENERIC_ERROR_MESSAGE } from '../utils/constants';

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

const receiveLogin = (data) => {
    const { verified, email, displayName, scope } = data;

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
            dispatch(snackbarMessage(GENERIC_ERROR_MESSAGE));
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
            const { data } = await axios.post(url, {
                email,
                password
            });

            if (data.code === 401) {
                return dispatch(snackbarMessage('Login failed. Please try again.'));
            }

            const { idToken, displayName } = data;

            localStorage.setItem('idToken', idToken);

            dispatch(clearLoginForm());
            dispatch(getAllShows());
            dispatch(getUserShows(displayName));
            dispatch(receiveLogin(data));
            dispatch(push('/'));
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
        dispatch(snackbarMessage(GENERIC_ERROR_MESSAGE));
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
