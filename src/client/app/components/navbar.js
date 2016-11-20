import React, { PropTypes } from 'react';
import Login from './login';
import { Logout } from './logout';

import { loginUser, logoutUser } from '../actions/loginActions';

const Navbar = ({ dispatch, errorMessage, isAuthenticated }) => {

    return (
        <nav>
            {!isAuthenticated &&
                <Login
                    errorMessage={errorMessage}
                    onLoginClick={ credentials => dispatch(loginUser(credentials)) }
                />
            }

            {isAuthenticated &&
                <Logout onLogoutClick={ () => dispatch(logoutUser()) } />
            }
        </nav>
    );
};

Navbar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
};

export { Navbar };
