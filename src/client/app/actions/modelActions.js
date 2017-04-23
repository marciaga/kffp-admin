import axios from 'axios';
import Models from '../data';
import { SET_MODEL, UPDATE_MODEL } from '../constants';
import { getTokenFromLocalStorage } from '../utils/helperFunctions';
import { snackbarMessage } from './feedbackActions';
import { GENERIC_ERROR_MESSAGE } from '../utils/constants';

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

    const url = `/api/${modelName}`;
    const idToken = getTokenFromLocalStorage();

    return async (dispatch) => {
        try {
            const { data } = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });

            model.data = data;
            model.name = modelName;
            model.type = type;

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

export { setModel, updateModelData };
