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

    renderActionButton = () => (
        <FlatButton
            label="Try Again"
            primary
            onTouchTap={this.handleClose}
        />
    );

    renderGenericButton = () => (
        <FlatButton
            label="Got It"
            primary={true}
            onTouchTap={this.handleClose}
        />
    );

    messageContent = ({ passwordReset, message }) => {
        if (passwordReset) {
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

        return (
            <div>
                <div>{message}</div>
                <div>{this.renderGenericButton()}</div>
            </div>
        );
    }

    render () {
        const { open, passwordReset, message, isLogin } = this.props.error;
        const { showForm } = this.state;

        return (
            <Dialog
                modal={false}
                title="Error"
                titleStyle={{ color: 'red' }}
                open={open}
            >
                {this.messageContent({ passwordReset, message, isLogin })}
                {showForm &&
                    <PasswordReset dispatch={this.props.dispatch} />
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
