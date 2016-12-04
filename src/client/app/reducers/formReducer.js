import { SET_FORM_FIELDS } from '../constants';

const initialState = {
    fields: {},
    model: null,
    type: null
};

export default function formReducer (state = initialState, action) {
    switch (action.type) {
    case SET_FORM_FIELDS:
        const { fields, model, type } = action.data;
        return Object.assign({}, state, {
            fields,
            model,
            type
        });
    default:
        return state;
    }
}
