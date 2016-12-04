import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { handleModal } from '../actions/modalActions';

class Modal extends Component {
    constructor (props) {
        super(props);

        this.actions = [];
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
                title="Dialog With Actions"
                actions={this.actions}
                modal={false}
                open={showModal}
                onRequestClose={this.handleClose}
            >
              The actions in this window were passed in as an array of React objects.
            </Dialog>
        );
    }
};

export { Modal };
