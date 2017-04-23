import {
    SNACKBAR_MESSAGE,
    CLOSE_SNACKBAR,
    TOGGLE_CONFIRM_DIALOG
} from '../constants';

const snackbarMessage = message => ({
    type: SNACKBAR_MESSAGE,
    data: { message }
});

const closeSnackbar = () => ({ type: CLOSE_SNACKBAR });

const confirmOpen = (shouldOpen, info) => ({
    type: TOGGLE_CONFIRM_DIALOG,
    data: {
        open: shouldOpen,
        info
    }
});

export { snackbarMessage, closeSnackbar, confirmOpen };
