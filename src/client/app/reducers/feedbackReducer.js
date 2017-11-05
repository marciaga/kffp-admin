import { GENERIC_ERROR_MESSAGE } from '../utils/constants';
import {
    SNACKBAR_MESSAGE,
    CLOSE_SNACKBAR,
    TOGGLE_CONFIRM_DIALOG,
    TOGGLE_ERROR_MODAL
} from '../constants';

const initialState = {
    snackbar: {
        open: false,
        message: ''
    },
    confirmDialog: {
        open: false,
        data: null
    },
    error: {
        open: false,
        message: GENERIC_ERROR_MESSAGE
    }
};

export default function feedbackReducer (state = initialState, action) {
    switch (action.type) {

    case SNACKBAR_MESSAGE:
        return {
            ...state,
            snackbar: {
                message: action.data.message,
                open: true
            }
        };

    case CLOSE_SNACKBAR:
        return {
            ...state,
            snackbar: {
                open: false,
                message: ''
            }
        };

    case TOGGLE_CONFIRM_DIALOG:
        const { open, info } = action.data;

        return {
            ...state,
            confirmDialog: {
                info,
                open
            }
        };

    case TOGGLE_ERROR_MODAL:
        const { open: modalOpen, message, passwordReset } = action.data;

        return {
            ...state,
            error: {
                open: modalOpen,
                message,
                passwordReset
            }
        };

    default:
        return state;
    }
}
