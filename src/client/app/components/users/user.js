import React from 'react';

const UserListItem = ({ user }) => {

    return (
        <li>{user.email}</li>
    );
};

export { UserListItem };
