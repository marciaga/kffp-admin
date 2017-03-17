import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { handleModal } from '../actions/modalActions';
import Form from './form';

class Modal extends Component {
    constructor (props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose () {
        const { showModal } = this.props;

        this.props.dispatch(handleModal(showModal));
    }

    render () {
        const { showModal } = this.props;

        return (
            <Dialog
                modal={false}
                open={showModal}
                autoScrollBodyContent={true}
                onRequestClose={this.handleClose}
            >
                <Form />
            </Dialog>
        );
    }
}

export default Modal;
