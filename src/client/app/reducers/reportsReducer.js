import { UPDATE_DATE_FIELD, REPORT_RESULTS } from '../constants';

const initialState = {
    results: []
};

export default (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_DATE_FIELD:
        return {
            ...state,
            ...action.data
        };
    case REPORT_RESULTS:
        return {
            ...state,
            results: action.data
        };
    default:
        return state;
    }
};
