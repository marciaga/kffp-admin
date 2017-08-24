import {
    SNACKBAR_MESSAGE,
    CLOSE_SNACKBAR,
    TOGGLE_CONFIRM_DIALOG,
    TOGGLE_ERROR_MODAL
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

const handleErrorModal = data => ({
    type: TOGGLE_ERROR_MODAL,
    data
});

export {
    snackbarMessage,
    closeSnackbar,
    confirmOpen,
    handleErrorModal
};
