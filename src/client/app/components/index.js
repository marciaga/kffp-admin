import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SnackbarMessage from './feedback/snackbar';
import Navbar from './navbar';
import Modal from './modal';

const mapStateToProps = state => ({
    auth: state.auth,
    modal: state.modal
});

const App = (props) => {
    const { dispatch, auth, modal } = props;
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
                {isAuthenticated &&
                    <div className="main-container">
                        {props.children}
                        <Modal showModal={modal.showModal} dispatch={dispatch} />
                    </div>
                }
                <SnackbarMessage />
            </div>
        </MuiThemeProvider>
    );
};

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object,
    children: PropTypes.object,
    modal: PropTypes.object
};

export default connect(mapStateToProps)(App);
