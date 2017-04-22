import models from '../data';

const validator = (form) => {
    const { modelType, modelName, fields } = form;
    // an object in which each key is a field and its value is an object of attributes
    const modelFields = models[modelName][modelType].fields;

};

export default validator;
