import {
    ADD_MODEL,
    SET_MODEL,
    UPDATE_MODEL,
    DELETE_MODEL,
    UPDATE_FILTER_RESULTS
} from '../constants';

const initialstate = {
    filteredResults: []
};

export default function modelReducer (state = initialstate, action) {
    switch (action.type) {

    case SET_MODEL:
        const { model } = action.data;
        const { fields, data, name, type, fuse } = model;

        return {
            ...state,
            fields,
            data,
            name,
            type,
            fuse
        };

    case ADD_MODEL:
        return {
            ...state,
            data: [
                ...state.data,
                action.data
            ]
        };
    case UPDATE_MODEL:
        const updatedModel = action.data;
        const modelIndex = state.data.map(m => m._id).indexOf(updatedModel._id);
        const newModelData = state.data.map((m, i) => {
            if (i === modelIndex) {
                return updatedModel;
            }
            return m;
        });

        return {
            ...state,
            data: newModelData
        };

    case DELETE_MODEL:
        const { id } = action.data;
        const idx = state.data.map(m => m._id).indexOf(id);
        const filteredModelData = state.data.filter((m, i) => {
            if (i !== idx) {
                return m;
            }
        });

        return {
            ...state,
            data: filteredModelData
        };

    case UPDATE_FILTER_RESULTS:
        return {
            ...state,
            filteredResults: action.data
        };

    default:
        return state;
    }
}

/*
model: {
    name: 'Shows',
    fields: {
        new: {},
        show: {},
        edit: {}
    },
    type: 'new',
    data: []
}
*/
