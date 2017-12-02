import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SnackbarMessage from './feedback/snackbar';
import Navbar from './navbar';
import Modal from './modal';
import ErrorModal from './feedback/errorModal';
import PasswordResetModal from './feedback/passwordResetModal';

const mapStateToProps = state => ({
    auth: state.auth,
    modal: state.modal,
    error: state.feedback.error
});

const App = (props) => {
    const { dispatch, auth, modal, error } = props;
    const { isAuthenticated, errorMessage, user } = auth;

    return (
        <MuiThemeProvider>
            <div>
                <Navbar
                    isAuthenticated={isAuthenticated}
                    user={user}
                    errorMessage={errorMessage}
                    dispatch={dispatch}
                />
                <div className="main-container">
                    {props.children}
                    <Modal showModal={modal.showModal} dispatch={dispatch} />
                </div>
                <ErrorModal
                    error={error}
                    dispatch={dispatch}
                />
                <PasswordResetModal
                    error={error}
                    dispatch={dispatch}
                />
                <SnackbarMessage />
            </div>
        </MuiThemeProvider>
    );
};

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object,
    children: PropTypes.object,
    modal: PropTypes.object,
    error: PropTypes.object
};

export default connect(mapStateToProps)(App);
