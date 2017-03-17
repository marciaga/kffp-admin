import { SNACKBAR_MESSAGE, CLOSE_SNACKBAR } from '../constants';

const initialState = {
    snackbar: {
        open: false,
        message: ''
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

    default:
        return state;
    }
}
