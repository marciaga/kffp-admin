import axios from 'axios';
import moment from 'moment';
import { API_ENDPOINT } from '../utils/constants';
import { getTokenFromLocalStorage } from '../utils/helperFunctions';
import { UPDATE_DATE_FIELD, REPORT_RESULTS } from '../constants';
import { handleErrorModal } from './feedbackActions';

export const updateDateField = (field, date) => ({
    type: UPDATE_DATE_FIELD,
    data: { [field]: date }
});

export const submitReport = o => async (dispatch) => {
    const idToken = getTokenFromLocalStorage();
    const { startDate, endDate } = o;
    const s = moment(startDate).format('YYYY-MM-DD');
    const e = moment(endDate).format('YYYY-MM-DD');

    const url = `${API_ENDPOINT}/report?startDate=${s}&endDate=${e}`;

    try {
        const { data } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        dispatch({
            type: REPORT_RESULTS,
            data
        });
    } catch (err) {
        const errorMessage = 'Fetching reports failed. Please try again.';

        dispatch(handleErrorModal({
            message: errorMessage,
            open: true
        }));
    }
};
