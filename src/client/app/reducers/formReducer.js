import {
    FORM_SUCCESS,
    SUBMIT_ERROR,
    SET_FORM_FIELDS,
    UPDATE_FORM_FIELD,
    SET_USER_AUTOCOMPLETE
} from '../constants';

const initialState = {
    errors: []
};

export default function formReducer (state = initialState, action) {
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

    case FORM_SUCCESS:
        return {
            ...state,
            errors: []
        }

    case SUBMIT_ERROR:
        return {
            ...state,
            errors: [...state.errors, action.data.message]
        }

    default:
        return state;
    }
}
