import Models from '../data';
import { SET_FORM_FIELDS } from '../constants';

const setFormData = (formType, model) => {
    const fields = Models[model][formType]['fields'];

    return {
        type: SET_FORM_FIELDS,
        data: {
            fields,
            model,
            type: formType
        }
    }
};

export { setFormData };
