import { SET_MODEL } from '../constants';

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
