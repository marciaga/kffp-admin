import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
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
                onRequestClose={this.handleClose}
            >
                <Form />
            </Dialog>
        );
    }
};

export { Modal };
