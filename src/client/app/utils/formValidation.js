import models from '../data';

export const priceValidator = (price) => {
    if (typeof price !== 'string') {
        return false;
    }

    if (price.startsWith('-') || price.includes('$')) {
        return false;
    }

    const parsedPrice = price.split('.');

    if (parsedPrice.length === 1) {
        return false;
    }

    if (parsedPrice[1] === '') {
        return false;
    }

    if (parsedPrice[1].length !== 2) {
        return false;
    }

    return true;
};
/**
* To add new validation, add a validation key to the client-side model in data.js
* Add a mapping to the validationTypeToExpectation object below
* Add error attribute to field component
*/
const validationTypeToExpectation = {
    string: val => typeof val === 'string',
    required: val => val !== '' || typeof val !== 'undefined',
    array: val => Array.isArray(val),
    number: val => Number.isInteger(val),
    boolean: val => typeof val === 'boolean',
    price: val => priceValidator(val)
};

const validateModelForm = (modelName, type, formData) => {
    // an object in which each key is a field and its value is an object of attributes
    const modelFields = models[modelName][type].fields;

    let errors = [];

    Object.keys(modelFields).forEach((field) => {
        const validations = modelFields[field].validation;
        const actualValue = formData[field];

        if (validations && validations.length) {
            errors = validations.map((validationItem) => {
                const result = validationTypeToExpectation[validationItem](actualValue);

                if (!result) {
                    return {
                        [field]: validationItem
                    };
                }
            })
            .filter(f => f);
        }
    });

    return errors;
};

export default validateModelForm;
