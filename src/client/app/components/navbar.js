import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';

import Login from './login';
import { loginUser, logoutUser } from '../actions/authActions';

const Menu = ({ dispatch }) => (
    <IconMenu
        iconButtonElement={
            <IconButton><MoreVertIcon color={'white'} /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
        <MenuItem primaryText="Shows" onTouchTap={() => dispatch(push('/shows'))} />
        <MenuItem primaryText="Users" onTouchTap={() => dispatch(push('/users'))} />
        <MenuItem primaryText="Sign out" onTouchTap={() => dispatch(logoutUser())} />
    </IconMenu>
);

const renderLoginElement = (errorMessage, isAuthenticated, dispatch) => {
    if (!isAuthenticated) {
        return (
            <Login
                errorMessage={errorMessage}
                onLoginClick={credentials => dispatch(loginUser(credentials))}
            />
        );
    }

    return (
        <Menu dispatch={dispatch} />
    );
};

const Navbar = ({ dispatch, errorMessage, isAuthenticated }) => (
    <AppBar
        title="KFFP Admin"
        showMenuIconButton={false}
        onTitleTouchTap={() => dispatch(push('/'))}
        iconElementRight={renderLoginElement(errorMessage, isAuthenticated, dispatch)}
    />
);

Navbar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
};

export default Navbar;
