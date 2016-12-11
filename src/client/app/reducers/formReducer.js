import { SET_FORM_FIELDS, UPDATE_FORM_FIELD } from '../constants';

const initialstate = {};

export default function formReducer (state = initialstate, action) {
    switch (action.type) {

    case SET_FORM_FIELDS:
        const { fields, modelName, formType } = action.data;
        return {
            ...state,
            fields,
            modelName,
            formType
        };

    case UPDATE_FORM_FIELD:
        const { fieldName, value } = action.data;

        return {
            ...state,
            fields: {
                ...state.fields,
                [fieldName]: {
                    ...state.fields[fieldName],
                    value
                }
            }
        }

    default:
        return state;
    }
}
