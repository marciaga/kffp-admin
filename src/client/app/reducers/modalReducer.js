import { TOGGLE_MODAL } from '../constants';

const initialState = {
    showModal: false
};

export default function modalReducer (state = initialState, action) {
    switch (action.type) {
    case TOGGLE_MODAL:
        return Object.assign({}, state, {
            showModal: action.data.showModal
        });
    default:
        return state;
    }
}
