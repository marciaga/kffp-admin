import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './navbar';
import Modal from './modal';

const mapStateToProps = state => ({
    auth: state.auth,
    modal: state.modal
});

class App extends Component {
    render () {
        const { dispatch, auth, modal } = this.props;
        const { isAuthenticated, errorMessage } = auth;

        return (
            <MuiThemeProvider>
                <div>
                    <Navbar
                        isAuthenticated={isAuthenticated}
                        errorMessage={errorMessage}
                        dispatch={dispatch}
                    />
                    {isAuthenticated &&
                        <div>
                            {this.props.children}
                            <Modal showModal={modal.showModal} dispatch={dispatch} />
                        </div>
                    }
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(App);
