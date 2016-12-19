import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Logout = ({ onLogoutClick }) => {
    return (
        <RaisedButton onClick={() => onLogoutClick()} label="Logout" />
    );
};

Logout.propTypes = {
    onLogoutClick: PropTypes.func.isRequired
};

export { Logout };
