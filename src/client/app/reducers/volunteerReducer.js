import { UPDATE_VOLUNTEER_FIELD, CLEAR_VOLUNTEER_FIELDS } from '../constants';

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
    default:
        return state;
    }
};
