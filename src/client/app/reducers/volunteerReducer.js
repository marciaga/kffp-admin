import {
    UPDATE_VOLUNTEER_FIELD,
    CLEAR_VOLUNTEER_FIELDS,
    UPDATE_VOLUNTEER_RESULTS,
    CLEAR_OWN_VOULUNTEER_HOURS,
    SET_VOLUNTEER_ID,
    SET_CURRENT_HOURS,
    CLEAR_STALE_RESULTS,
    SET_TYPE
} from '../constants';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_VOLUNTEER_FIELD:
        return {
            ...state,
            [action.data.fieldName]: action.data.value
        };

    case CLEAR_OWN_VOULUNTEER_HOURS:
    case CLEAR_VOLUNTEER_FIELDS:
        return initialState;

    case SET_VOLUNTEER_ID:
        return {
            ...state,
            userId: action.data.value
        };
    case SET_TYPE:
        return {
            ...state,
            type: action.data
        };
    case UPDATE_VOLUNTEER_RESULTS:
        return {
            ...state,
            results: action.data
        };
    case SET_CURRENT_HOURS:
        return {
            ...state,
            currentHours: action.data
        };
    case CLEAR_STALE_RESULTS:
        return {
            ...state,
            results: []
        };
    default:
        return state;
    }
};
