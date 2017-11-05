import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PasswordReset from '../password';
import { handleErrorModal } from '../../actions/feedbackActions';

class PasswordResetModal extends Component {
    constructor (props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.renderActionButton = this.renderActionButton.bind(this);
    }

    state = {
        showForm: false
    }

    toggleForm = () => this.setState({ showForm: !this.state.showForm });

    handleClose () {
        const data = {
            open: false,
            passwordReset: false,
            message: ''
        };

        this.setState({ showForm: false });
        this.props.dispatch(handleErrorModal(data));
    }

    renderActionButton () {
        return (
            <FlatButton
                label="Try Again"
                primary
                onTouchTap={this.handleClose}
            />
        );
    }

    messageContent = () => {
        return (
            <div>
                The password you entered didn't match our records.
                {this.renderActionButton()}
                <FlatButton
                    label="Do you need to reset your password?"
                    secondary
                    onTouchTap={this.toggleForm}
                />
            </div>
        );
    }

    render () {
        const { open } = this.props.error;
        const { showForm } = this.state;

        return (
            <Dialog
                modal={false}
                title="Error"
                titleStyle={{ color: 'red' }}
                open={open}
            >
                {this.messageContent()}
                {showForm &&
                    <PasswordReset />
                }
            </Dialog>
        );
    }
}

PasswordResetModal.propTypes = {
    dispatch: PropTypes.func,
    error: PropTypes.object
};

export default PasswordResetModal;
