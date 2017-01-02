import {
    createUser,
    loginHandler,
    verifyCredentials,
    verifyUniqueUser,
    verifyToken,
    getUsers,
    updateUser,
    deleteUser
} from '../../../models/user';

const userRoutes = [
    {
        path: '/api/users',
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
        path: '/api/users',
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
        path: '/api/users',
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
        path: '/api/users',
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
        path: '/api/users/verify',
        method: 'GET',
        config: {
            auth: false,
            handler: verifyToken
        }
    },
    {
        path: '/api/users/authenticate',
        method: 'POST',
        config: {
            auth: false,
            pre: [
                { method: verifyCredentials, assign: 'user' }
            ],
            handler: loginHandler
        }
    }
];

export default userRoutes;
