import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { handleErrorModal } from '../../actions/feedbackActions';

class ErrorModal extends Component {
    constructor (props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.renderActionButton = this.renderActionButton.bind(this);
    }

    handleClose () {
        const data = {
            open: false,
            message: ''
        };

        this.props.dispatch(handleErrorModal(data));
    }

    renderActionButton () {
        return (
            <FlatButton
                label="Got It"
                primary={true}
                onTouchTap={this.handleClose}
            />
        );
    }

    render () {
        const { open, message, passwordReset } = this.props.error;

        if (!passwordReset) {
            return (
                <Dialog
                    modal={false}
                    title="Error"
                    titleStyle={{ color: 'red' }}
                    open={open}
                    actions={[this.renderActionButton()]}
                >
                    {message}
                </Dialog>
            );
        }

        return <span />;
    }
}

ErrorModal.propTypes = {
    dispatch: PropTypes.func,
    error: PropTypes.object
};

export default ErrorModal;
