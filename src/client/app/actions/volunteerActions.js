import axios from 'axios';
import moment from 'moment';
import {
    API_ENDPOINT,
    GENERIC_ERROR_MESSAGE
} from '../utils/constants';
import { getTokenFromLocalStorage } from '../utils/helperFunctions';
import {
    UPDATE_VOLUNTEER_FIELD,
    CLEAR_VOLUNTEER_FIELDS,
    UPDATE_VOLUNTEER_RESULTS,
    CLEAR_OWN_VOULUNTEER_HOURS,
    SET_VOLUNTEER_ID,
    SET_CURRENT_HOURS
} from '../constants';
import { snackbarMessage, handleErrorModal } from './feedbackActions';

export const updateField = (fieldName, value) => ({
    type: UPDATE_VOLUNTEER_FIELD,
    data: {
        fieldName,
        value
    }
});

export const submitReport = (startDate, endDate, userId, action) => async (dispatch) => {
    const idToken = getTokenFromLocalStorage();

    const s = moment(startDate).format('YYYY-MM-DD');
    const e = moment(endDate).format('YYYY-MM-DD');

    const url = `${API_ENDPOINT}/volunteer/report`;
    const params = userId ? { userId } : {};

    params.startDate = s;
    params.endDate = e;

    try {
        const { data } = await axios.get(url, {
            params,
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        const fn = action || handleUpdateVolunteerResults;

        return dispatch(fn(data));
    } catch (err) {
        const errorMessage = 'Fetching reports failed. Please try again.';

        dispatch(handleErrorModal({
            message: errorMessage,
            open: true
        }));
    }
};

const hoursThisMonth = (results = []) => results.reduce((acc, o) => (acc + o.hours), 0);

const setCurrentHours = d => {
    const data = hoursThisMonth(d);
    return ({
        type: SET_CURRENT_HOURS,
        data
    });
};

const handleUpdateVolunteerResults = data => ({
    type: UPDATE_VOLUNTEER_RESULTS,
    data
});

export const clearOwnVolunteerHours = () => ({ type: CLEAR_OWN_VOULUNTEER_HOURS });

const determineCurrentMonthRange = () => {
    const startDate = moment().startOf('month').format('YYYY-MM-DD');
    const endDate = moment().endOf('month').format('YYYY-MM-DD');

    return {
        startDate,
        endDate
    };
};

export const getCurrentMonthVolunteer = (userId) => {
    const { startDate, endDate } = determineCurrentMonthRange();

    return submitReport(startDate, endDate, userId, setCurrentHours);
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

export const setVolunteerId = data => ({
    type: SET_VOLUNTEER_ID,
    data
});
