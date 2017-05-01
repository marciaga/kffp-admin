import {
    snackbarMessage,
    closeSnackbar,
    confirmOpen
} from '../../src/client/app/actions/feedbackActions';

describe('feedbackActions', () => {
    describe('snackbarMessage', () => {
        it('should return a type SNACKBAR_MESSAGE', () => {
            const { type } = snackbarMessage();

            expect(type).toBe('SNACKBAR_MESSAGE');
        });

        it('should pass the message as data', () => {
            const { data } = snackbarMessage('test');

            expect(data.message).toBe('test');
        });
    });

    describe('closeSnackbar', () => {
        it('should return a type CLOSE_SNACKBAR', () => {
            const { type } = closeSnackbar;

            expect(type).toBe('CLOSE_SNACKBAR');
        });
    });

    describe('confirmOpen', () => {
        it('should return type TOGGLE_CONFIRM_DIALOG', () => {
            const { type } = confirmOpen();

            expect(type).toBe('TOGGLE_CONFIRM_DIALOG');
        });

        it('should pass shouldOpen as data', () => {
            const { data } = confirmOpen('test');

            expect(data.open).toBe('test');
        });

        it('should pass info as data', () => {
            const { data } = confirmOpen(null, 'test');

            expect(data.info).toBe('test');
        });
    });
});

