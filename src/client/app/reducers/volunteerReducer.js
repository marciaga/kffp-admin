import { UPDATE_VOLUNTEER_FIELD } from '../constants';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_VOLUNTEER_FIELD:
        return {
            ...state,
            [action.data.fieldName]: action.data.value
        };
    default:
        return state;
    }
};
