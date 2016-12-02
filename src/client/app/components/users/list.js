import React from 'react';
import { UserListItem } from './user';
import cuid from 'cuid';

const UserList = ({ users }) => {

    return (
        <ul>
            {users && users.map(user => {
                return <UserListItem key={cuid()} user={user} />
            })}
        </ul>
    );
};

export { UserList };
