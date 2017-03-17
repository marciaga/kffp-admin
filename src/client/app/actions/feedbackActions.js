import { SNACKBAR_MESSAGE, CLOSE_SNACKBAR } from '../constants';

const snackbarMessage = message => ({
    type: SNACKBAR_MESSAGE,
    data: { message }
});

const closeSnackbar = () => ({ type: CLOSE_SNACKBAR });

export { snackbarMessage, closeSnackbar };
