import { TOGGLE_MODAL } from '../constants';

const showOrHideModal = val => ({
    type: TOGGLE_MODAL,
    data: {
        showModal: val
    }
});

const handleModal = (showModal) => {
    const val = !showModal;

    return dispatch => dispatch(showOrHideModal(val));
};

export { handleModal, showOrHideModal };
