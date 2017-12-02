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
    CLEAR_LOGIN_FORM,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL
} from '../constants';
import { getUserShows, getAllShows } from './showActions';
import { handleErrorModal, handlePasswordModal } from './feedbackActions';
import { API_ENDPOINT, GENERIC_ERROR_MESSAGE } from '../utils/constants';

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

const clearLoginForm = () => ({
    type: CLEAR_LOGIN_FORM
});

const loginUser = (creds) => {
    const { email, password } = creds;
    const url = `${API_ENDPOINT}/users/authenticate`;

    return async (dispatch) => {
        try {
            const { data } = await axios.post(url, {
                email,
                password
            });

            if (data.code === 401) {
                return dispatch(handlePasswordModal({
                    message: 'Login failed. Please try again.',
                    open: true,
                    passwordReset: true
                }));
            }

            const { idToken, id } = data;

            localStorage.setItem('idToken', idToken);

            dispatch(clearLoginForm());
            dispatch(getAllShows());
            dispatch(getUserShows(id));
            dispatch(receiveLogin(data));
            dispatch(push('/dashboard'));
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
        dispatch(handleErrorModal({
            message: GENERIC_ERROR_MESSAGE,
            open: true
        }));
    }
};

const verifyLogin = (isAuthenticated) => {
    if (!isAuthenticated) {
        return {
            type: AUTH_VERIFICATION,
            data: {
                verified: false
            }
        };
    }

    const url = `${API_ENDPOINT}/users/verify`;
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
            dispatch(handlePasswordModal({
                message: 'Token Expired. Please Log In Again.',
                open: true,
                isLogin: true
            }));

            dispatch(logoutUser());
        }
    };
};

const sendPasswordReset = email => async (dispatch) => {
    const url = `${API_ENDPOINT}/auth/forgot-password`;

    try {
        await axios.post(url, { email });
    }
    catch (e) {
        // no-op
    }
};

const handleResetPassword = ({ password, token }) =>
    async (dispatch) => {
        try {
            const url = `${API_ENDPOINT}/auth/reset-password`;
            const { data } = await axios.post(url, { password }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!data.success) {
                dispatch({
                    type: PASSWORD_RESET_FAIL,
                    data: {
                        passwordUpdated: false
                    }
                });
            }
            // send success action
            dispatch({
                type: PASSWORD_RESET_SUCCESS,
                data: {
                    passwordUpdated: true
                }
            });

        } catch (e) {
            dispatch({
                type: PASSWORD_RESET_FAIL,
                data: {
                    passwordUpdated: false
                }
            });
        }
    };

export {
    verifyLogin,
    loginUser,
    loginError,
    receiveLogin,
    requestLogin,
    logoutUser,
    loginInputChange,
    sendPasswordReset,
    handleResetPassword
};
