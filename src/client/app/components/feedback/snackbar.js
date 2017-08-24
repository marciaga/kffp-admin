import React, { Component, PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { closeSnackbar } from '../../actions/feedbackActions';

const mapStateToProps = state => ({
    feedback: state.feedback
});

class SnackbarMessage extends Component {
    constructor (props) {
        super(props);

        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleRequestClose () {
        this.props.dispatch(closeSnackbar());
    }

    render () {
        const { snackbar } = this.props.feedback;
        const { message, open } = snackbar;

        return (
            <Snackbar
                open={open}
                message={message}
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
            />
        );
    }
}

export default connect(mapStateToProps)(SnackbarMessage);

SnackbarMessage.propTypes = {
    feedback: PropTypes.shape({
        snackbar: PropTypes.object
    }),
    dispatch: PropTypes.func
};
