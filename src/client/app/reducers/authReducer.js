import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    AUTH_VERIFICATION
} from '../constants';

const initialState = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('idToken') !== null
};

export default function authReducer (state = initialState, action) {

    switch (action.type) {

    case LOGIN_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
            isAuthenticated: false,
            user: creds
        });

    case LOGIN_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: true,
            email: action.data.email,
            errorMessage: ''
        });

    case LOGIN_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: false,
            errorMessage: action.data.message
        });

    case LOGOUT_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
            isAuthenticated: true
        });

    case LOGOUT_SUCCESS:
        return Object.assign({}, state, {
            isFetching: true,
            isAuthenticated: false,
            user: {}
        });

    case LOGOUT_FAILURE:

    case AUTH_VERIFICATION:
        return Object.assign({}, state, {
            isAuthenticated: action.data.verified,
            user: action.data
        });

    default:
        return state;
    }
}
