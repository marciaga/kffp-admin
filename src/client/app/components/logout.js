import React, { PropTypes } from 'react';

const Logout = ({ onLogoutClick }) => {
    return (
        <button onClick={() => onLogoutClick()}>Logout</button>
    );
};

Logout.propTypes = {
    onLogoutClick: PropTypes.func.isRequired
};

export { Logout };
