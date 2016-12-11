import { SET_FORM_FIELDS, UPDATE_FORM_FIELD } from '../constants';
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

export { setFormData, updateFormField };
