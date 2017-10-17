import {
    UPDATE_VOLUNTEER_FIELD,
    CLEAR_VOLUNTEER_FIELDS,
    UPDATE_VOLUNTEER_RESULTS,
    CLEAR_OWN_VOULUNTEER_HOURS,
    SET_VOLUNTEER_ID
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
    case UPDATE_VOLUNTEER_RESULTS:
        return {
            ...state,
            results: action.data
        };
    default:
        return state;
    }
};
