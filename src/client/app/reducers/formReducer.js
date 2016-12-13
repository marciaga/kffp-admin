import { SET_FORM_FIELDS, UPDATE_FORM_FIELD, SET_USER_AUTOCOMPLETE } from '../constants';

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

    case SET_USER_AUTOCOMPLETE:
        const { autocompleteResults } = action.data;

        return {
            ...state,
            fields: {
                ...state.fields,
                users: {
                    ...state.fields.users,
                    searchResults: autocompleteResults
                }
            }
        }

    default:
        return state;
    }
}
