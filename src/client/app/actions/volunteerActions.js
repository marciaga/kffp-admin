import axios from 'axios';
import {
    API_ENDPOINT,
    GENERIC_ERROR_MESSAGE
} from '../utils/constants';
import { getTokenFromLocalStorage } from '../utils/helperFunctions';
import { UPDATE_VOLUNTEER_FIELD, CLEAR_VOLUNTEER_FIELDS } from '../constants';
import { snackbarMessage, handleErrorModal } from './feedbackActions';

export const updateField = (fieldName, value) => ({
    type: UPDATE_VOLUNTEER_FIELD,
    data: {
        fieldName,
        value
    }
});

export const volunteerFormSubmit = (formData) => {
    // validate formData
    const url = `${API_ENDPOINT}/volunteer/hours`;
    const idToken = getTokenFromLocalStorage();

    return async (dispatch) => {
        try {
            const { data } = await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });

            !data.success && // eslint-disable-line
                dispatch(handleErrorModal({
                    open: true,
                    message: GENERIC_ERROR_MESSAGE
                }));

            dispatch({
                type: CLEAR_VOLUNTEER_FIELDS
            });

            dispatch(snackbarMessage('Volunteer Hours Submitted Successfully'));
        } catch (error) {
            dispatch(handleErrorModal({
                open: true,
                message: GENERIC_ERROR_MESSAGE
            }));
        }
    };
};
