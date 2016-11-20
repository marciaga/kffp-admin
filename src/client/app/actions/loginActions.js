import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
} from '../constants';

const requestLogin = (creds) => {
    return {
        type: LOGIN_REQUEST,
        data: {
            isFetching: true,
            isAuthenticated: false,
            creds
        }
    };
};

const receiveLogin = (user) => {
    return {
        type: LOGIN_SUCCESS,
        data: {
            isFetching: false,
            isAuthenticated: true,
            idToken: user.idToken
        }
    };
};

const loginError = (message) => {
    return {
        type: LOGIN_FAILURE,
        data: {
            isFetching: false,
            isAuthenticated: false,
            message
        }
    };
};

const loginUser = (creds) => {
    return {
        type: LOGIN_SUCCESS
    }
    // call to server to auth
    // if error, dispatch errorMessage
    // otherwise, set token in local storage and dispatch receiveLogin
};

const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS,
        data: {
            isFetching: false,
            isAuthenticated: false
        }
    }
};

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST,
        data: {
            isFetching: true,
            isAuthenticated: true
        }
    }
};

const logoutUser = (creds) => {
    // call requestLogout, remove idToken from localStorage, dispatch receiveLogout

    return {
        type: LOGOUT_SUCCESS
    }
    // call to server to auth
    // if error, dispatch errorMessage
    // otherwise, set token in local storage and dispatch receiveLogin
};


export { loginUser, loginError, receiveLogin, requestLogin, logoutUser };
