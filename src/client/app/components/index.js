import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SnackbarMessage from './feedback/snackbar';
import Navbar from './navbar';
import Modal from './modal';
import ErrorModal from './feedback/errorModal';

const mapStateToProps = state => ({
    auth: state.auth,
    modal: state.modal,
    error: state.feedback.error
});

const styles = {
    forgotPassword: {
        fontSize: '12px',
        cursor: 'pointer',
        textAlign: 'right',
        marginRight: '10px'
    }
}
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
            <p
                onClick={() => console.log('s')}
                style={styles.forgotPassword}
            >
                Forgot password?
            </p>

                {isAuthenticated &&
                    <div className="main-container">
                        {props.children}
                        <Modal showModal={modal.showModal} dispatch={dispatch} />
                    </div>
                }
                <ErrorModal
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
