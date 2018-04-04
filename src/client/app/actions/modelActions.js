import axios from 'axios';
import Fuse from 'fuse.js';
import Models from '../data';
import {
    ADD_MODEL,
    SET_MODEL,
    UPDATE_MODEL,
    UPDATE_FILTER_RESULTS
} from '../constants';
import { getTokenFromLocalStorage } from '../utils/helperFunctions';
import { handleErrorModal } from './feedbackActions';
import { GENERIC_ERROR_MESSAGE, API_ENDPOINT } from '../utils/constants';

const receiveModelData = model => ({
    type: SET_MODEL,
    data: {
        model
    }
});

const setModel = (user, modelName, type, options = {}) => {
    const model = Models[modelName][type];

    if (user.role !== 'admin') {
        // redirect to root path
    }

    const baseUrl = `${API_ENDPOINT}/${modelName}`;
    const url = !options.query ? baseUrl : `${baseUrl}${options.query}`;

    const idToken = getTokenFromLocalStorage();

    return async (dispatch) => {
        try {
            const { data } = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });
            const opts = {
                keys: Object.keys(model.fields)
            };
            const fuse = new Fuse(data, opts);

            model.data = data;
            model.name = modelName;
            model.type = type;
            model.fuse = fuse;

            dispatch(receiveModelData(model));
        } catch (err) {
            dispatch(handleErrorModal({
                message: GENERIC_ERROR_MESSAGE,
                open: true
            }));
        }
    };
};

const updateModelData = data => ({
    type: UPDATE_MODEL,
    data
});

const addModelData = data => ({
    type: ADD_MODEL,
    data
});

const filterResults = data => (dispatch, getState) => {
    const showAll = typeof data === 'boolean';

    const { model = [] } = getState();
    const fuse = model.fuse;
    const result = showAll ? model.data : fuse.search(data);

    dispatch({
        type: UPDATE_FILTER_RESULTS,
        data: result
    });
};

const addModelFuse = data => (dispatch, getState) => {
    const { model } = getState();

    model.filteredResults = [
        ...model.filteredResults,
        data
    ];
    model.fuse.list = model.data;
    return dispatch(receiveModelData(model));
};

const removeModelFuse = id => (dispatch, getState) => {
    const { model } = getState();

    model.filteredResults = model.filteredResults.filter(result =>
        result._id !== id
    );

    model.fuse.list = model.data;

    return dispatch(receiveModelData(model));
};

const updateModelFuse = data => (dispatch, getState) => {
    // data is the updatedShow object
    const { model } = getState();

    model.filteredResults = model.filteredResults.map((f) => {
        if (f._id === data._id) {
            return data;
        }

        return f;
    });

    model.fuse.list = model.data;
    return dispatch(receiveModelData(model));
};

export {
    setModel,
    addModelData,
    updateModelData,
    filterResults,
    updateModelFuse,
    addModelFuse,
    removeModelFuse
};
