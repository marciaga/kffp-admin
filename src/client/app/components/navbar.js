import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Login from './login';
import { Logout } from './logout';

import { loginUser, logoutUser } from '../actions/authActions';

const renderLoginElement = (errorMessage, isAuthenticated, dispatch)  => {
    if (!isAuthenticated) {
        return (
            <Login
                errorMessage={errorMessage}
                onLoginClick={ credentials => dispatch(loginUser(credentials)) }
            />
        );
    }
    return (
        <Logout onLogoutClick={ () => dispatch(logoutUser()) } />
    );
};

const Navbar = ({ dispatch, errorMessage, isAuthenticated }) => {

    return (
        <AppBar
            title="KFFP"
            iconElementRight={renderLoginElement(errorMessage, isAuthenticated, dispatch)}
        />
    );
};

Navbar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
};

export { Navbar };
