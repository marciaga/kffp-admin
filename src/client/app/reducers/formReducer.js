import {
    FORM_SUCCESS,
    SUBMIT_ERROR,
    SET_FORM_FIELDS,
    UPDATE_FORM_FIELD,
    SET_USER_AUTOCOMPLETE,
    SET_SONG_FORM,
    UPDATE_SONG_FORM,
    UPDATE_USER_SETTINGS_FIELD,
    CLEAR_INPUT_FIELDS,
    ADD_FILE
} from '../constants';

const initialState = {
    errors: [],
    fields: {}
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
        };

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
        };

    case FORM_SUCCESS:
        return {
            ...state,
            errors: []
        };

    case SUBMIT_ERROR:
        return {
            ...state,
            errors: [...state.errors, action.data.message]
        };

    case SET_SONG_FORM:
        return {
            ...state,
            songs: action.data
        };

    case UPDATE_SONG_FORM:
        const { val, songId, field } = action.data;
        const newSongs = state.songs.map((s) => {
            if (s.id === songId) {
                s[field] = val;
            }
            return s;
        });

        return {
            ...state,
            songs: newSongs
        };

    case UPDATE_USER_SETTINGS_FIELD:
        return {
            ...state,
            fields: {
                ...state.fields,
                [action.data.name]: action.data.value
            }
        };

    case CLEAR_INPUT_FIELDS:
        return {
            ...state,
            fields: {}
        };

    case ADD_FILE:
        return {
            ...state
        };

    default:
        return state;
    }
}
