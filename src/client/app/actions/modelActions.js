import axios from 'axios';
import Models from '../data';
import { SET_MODEL, UPDATE_MODEL } from '../constants';

const setModel = (user, modelName, type) => {
    const model = Models[modelName][type];

    if (user.role !== 'admin') {
        // redirect to root path
    }

    const url = `/api/${modelName}`;
    const idToken = localStorage.getItem('idToken');

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
            console.log(err);
        }
    }
};

const receiveModelData = (model) => {
    return {
        type: SET_MODEL,
        data: {
            model
        }
    }
};

const updateModelData = (data) => {
    return {
        type: UPDATE_MODEL,
        data
    }
};

export { setModel, updateModelData };
