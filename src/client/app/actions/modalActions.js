import { TOGGLE_MODAL } from '../constants';

const handleModal = (showModal) => {
    const val = !showModal;

    return dispatch => dispatch(showOrHideModal(val));
};

const showOrHideModal = (val) => {
    return {
        type: TOGGLE_MODAL,
        data: {
            showModal: val
        }
    }
};

export { handleModal, showOrHideModal };
