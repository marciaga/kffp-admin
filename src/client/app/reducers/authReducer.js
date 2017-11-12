import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    AUTH_VERIFICATION,
    UPDATE_LOGIN_FORM,
    CLEAR_LOGIN_FORM
} from '../constants';

const initialState = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('idToken') !== null,
    user: { scope: null },
    loginForm: {}
};

export default function authReducer (state = initialState, action) {
    switch (action.type) {

    case LOGIN_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
            isAuthenticated: false,
            user: action.data.creds
        });

    case LOGIN_SUCCESS:
        const { isFetching, isAuthenticated, user } = action.data;

        return {
            ...state,
            isFetching,
            isAuthenticated,
            user,
            errorMessage: ''
        };

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
        return {
            ...state
        };

    case AUTH_VERIFICATION:
        return {
            ...state,
            isAuthenticated: action.data.verified,
            user: action.data
        };

    case UPDATE_LOGIN_FORM:
        const { fieldName, text } = action.data;
        return {
            ...state,
            loginForm: {
                ...state.loginForm,
                [fieldName]: text
            }
        };

    case CLEAR_LOGIN_FORM:
        return {
            ...state,
            loginForm: {}
        };

    default:
        return state;
    }
}
