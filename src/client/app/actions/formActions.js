import axios from 'axios';
import { SET_FORM_FIELDS, UPDATE_FORM_FIELD, SET_USER_AUTOCOMPLETE } from '../constants';
import Models from '../data';

const updateFormField = (fieldName, value) => {
    return {
        type: UPDATE_FORM_FIELD,
        data: {
            fieldName,
            value
        }
    }
};

const setFormData = (formType, modelName) => {
    const fields = Models[modelName][formType]['fields'];
    const formMetadata = {
        fields,
        modelName,
        formType
    };

    if (formType === 'new') {

        return receiveFormData(formMetadata);
    }

};

const receiveFormData = (data) => {
    return {
        type: SET_FORM_FIELDS,
        data
    }
};

const getUserAutoComplete = (text) => {
    const url = `/api/search/users?text=${text}`;
    const idToken = localStorage.getItem('idToken');

    return async (dispatch) => {
        try {
            const { data } = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });

            dispatch(receiveUserAutocomplete(data));
        } catch (e) {
            console.log(e);
        }
    };
};

const receiveUserAutocomplete = (data) => {
    return {
        type: SET_USER_AUTOCOMPLETE,
        data: {
            autocompleteResults: data
        }
    }
};

export { setFormData, updateFormField, getUserAutoComplete };
