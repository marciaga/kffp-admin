import {
    createUser,
    loginHandler,
    verifyCredentials,
    verifyUniqueUser,
    verifyToken,
    getUsers,
    updateUser,
    deleteUser,
    resetPassword,
    updateUserField,
    verifyPassword
} from '../../../models/user';
import { API_BASE_URL } from '../constants';

const userRoutes = [
    {
        path: `${API_BASE_URL}/users`,
        method: 'GET',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            handler: getUsers
        }
    },
    {
        path: `${API_BASE_URL}/users`,
        method: 'POST',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            pre: [
                { method: verifyUniqueUser }
            ],
            handler: createUser
        }
    },
    {
        path: `${API_BASE_URL}/users`,
        method: 'PUT',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            handler: updateUser
        }
    },
    {
        path: `${API_BASE_URL}/users/{id?}`,
        method: 'PATCH',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'dj', 'reports']
            },
            pre: [
                { method: verifyPassword, assign: 'result' }
            ],
            handler: updateUserField
        }
    },
    {
        path: `${API_BASE_URL}/users`,
        method: 'DELETE',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            handler: deleteUser
        }
    },
    {
        path: `${API_BASE_URL}/users/verify`,
        method: 'GET',
        config: {
            auth: false,
            handler: verifyToken
        }
    },
    {
        path: `${API_BASE_URL}/users/authenticate`,
        method: 'POST',
        config: {
            auth: false,
            pre: [
                { method: verifyCredentials, assign: 'user' }
            ],
            handler: loginHandler
        }
    },
    {
        path: `${API_BASE_URL}/users/reset/{id?}`,
        method: 'POST',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            handler: resetPassword
        }
    }
];

export default userRoutes;
