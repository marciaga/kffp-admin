import axios from 'axios';
import moment from 'moment';
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

export const submitReport = (startDate, endDate) => async (dispatch) => {
    const idToken = getTokenFromLocalStorage();

    const s = moment(startDate).format('YYYY-MM-DD');
    const e = moment(endDate).format('YYYY-MM-DD');

    // TODO add userId if selected

    const url = `${API_ENDPOINT}/volunteer/report?startDate=${s}&endDate=${e}`;

    try {
        const { data } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        console.log(data);
        // TODO dispatch something with data

    } catch (err) {
        const errorMessage = 'Fetching reports failed. Please try again.';

        dispatch(handleErrorModal({
            message: errorMessage,
            open: true
        }));
    }
};

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
