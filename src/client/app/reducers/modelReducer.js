import { SET_MODEL, UPDATE_MODEL } from '../constants';

const initialstate = {};

export default function modelReducer (state = initialstate, action) {
    switch (action.type) {

    case SET_MODEL:
        const { model } = action.data;
        const { fields, data, name, type } = model;

        return {
            ...state,
            fields,
            data,
            name,
            type
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
    data: {}
}
*/
