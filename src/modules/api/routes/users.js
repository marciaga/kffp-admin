import {
    createUser,
    loginHandler,
    verifyCredentials,
    verifyUniqueUser,
    verifyToken,
    getUsers
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
            auth: false, // change to 'jwt'
            pre: [
                { method: verifyUniqueUser }
            ],
            handler: createUser
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
