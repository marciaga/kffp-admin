import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';

import Login from './login';
import { loginUser, logoutUser } from '../actions/authActions';

const renderAdminMenuItem = (scope, text, location, dispatch) => {
    if (scope === 'admin') {
        const path = `/${location}`;

        return (
            <MenuItem primaryText={text} onTouchTap={() => dispatch(push(path))} />
        );
    }
};

const Menu = ({ dispatch, user }) => {
    const { scope } = user;

    return (
        <IconMenu
            iconButtonElement={
                <IconButton><MoreVertIcon color={'white'} /></IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
            {renderAdminMenuItem(scope, 'Shows', 'shows', dispatch)}
            {renderAdminMenuItem(scope, 'Users', 'users', dispatch)}
            {renderAdminMenuItem(scope, 'Reports', 'reports', dispatch)}
            <MenuItem
                primaryText={'Settings'}
                onTouchTap={() => dispatch(push('settings'))}
            />
            <MenuItem
                primaryText={'Sign out'}
                onTouchTap={() => dispatch(logoutUser())}
            />
        </IconMenu>
    );
};

const renderLoginElement = (errorMessage, isAuthenticated, user, dispatch) => {
    if (!isAuthenticated) {
        return (
            <Login
                dispatch={dispatch}
                errorMessage={errorMessage}
                onLoginClick={credentials => dispatch(loginUser(credentials))}
            />
        );
    }

    return (
        <Menu
            dispatch={dispatch}
            user={user}
        />
    );
};

const Navbar = ({ dispatch, errorMessage, user, isAuthenticated }) => {
    const { displayName } = user;
    const title = user.displayName ? `KFFP Admin / ${displayName}` : 'KFFP Admin';

    return (
        <AppBar
            title={<span style={{ cursor: 'pointer' }}>{title}</span>}
            showMenuIconButton={false}
            onTitleTouchTap={() => dispatch(push('/'))}
            iconElementRight={renderLoginElement(errorMessage, isAuthenticated, user, dispatch)}
        />

    );
};

Menu.propTypes = {
    dispatch: PropTypes.func,
    user: PropTypes.object
};

Navbar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    user: PropTypes.object
};

export default Navbar;
