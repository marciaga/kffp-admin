import axios from 'axios';
import Fuse from 'fuse.js';
import Models from '../data';
import { SET_MODEL, UPDATE_MODEL, UPDATE_FILTER_RESULTS } from '../constants';
import { getTokenFromLocalStorage } from '../utils/helperFunctions';
import { snackbarMessage } from './feedbackActions';
import { GENERIC_ERROR_MESSAGE, API_ENDPOINT } from '../utils/constants';

const receiveModelData = model => ({
    type: SET_MODEL,
    data: {
        model
    }
});

const setModel = (user, modelName, type) => {
    const model = Models[modelName][type];

    if (user.role !== 'admin') {
        // redirect to root path
    }

    const url = `${API_ENDPOINT}/${modelName}`;
    const idToken = getTokenFromLocalStorage();

    return async (dispatch) => {
        try {
            const { data } = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });
            const options = {
                keys: Object.keys(model.fields)
            };
            const fuse = new Fuse(data, options);

            model.data = data;
            model.name = modelName;
            model.type = type;
            model.fuse = fuse;

            dispatch(receiveModelData(model));
        } catch (err) {
            dispatch(snackbarMessage(GENERIC_ERROR_MESSAGE));
        }
    };
};

const updateModelData = data => ({
    type: UPDATE_MODEL,
    data
});

const filterResults = data => (dispatch, getState) => {
    const { model } = getState();
    const fuse = model.fuse;
    const result = fuse.search(data);

    dispatch({
        type: UPDATE_FILTER_RESULTS,
        data: result
    });
};

export { setModel, updateModelData, filterResults };
