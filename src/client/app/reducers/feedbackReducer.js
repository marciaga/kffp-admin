import {
    SNACKBAR_MESSAGE,
    CLOSE_SNACKBAR,
    TOGGLE_CONFIRM_DIALOG
} from '../constants';

const initialState = {
    snackbar: {
        open: false,
        message: ''
    },
    confirmDialog: {
        open: false,
        data: null
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
                open,
                info
            }
        };

    default:
        return state;
    }
}
