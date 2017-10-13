import {
    UPDATE_VOLUNTEER_FIELD,
    CLEAR_VOLUNTEER_FIELDS,
    UPDATE_VOLUNTEER_RESULTS
} from '../constants';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_VOLUNTEER_FIELD:
        return {
            ...state,
            [action.data.fieldName]: action.data.value
        };

    case CLEAR_VOLUNTEER_FIELDS:
        return initialState;

    case UPDATE_VOLUNTEER_RESULTS:
        return {
            ...state,
            results: action.data
        };
    default:
        return state;
    }
};
