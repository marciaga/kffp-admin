import Boom from 'boom';
import { createUser, loginHandler } from '../../models/user';
import { verifyCredentials, verifyUniqueUser } from '../../models/utils';

const renderReactApp = (request, reply) => {
    reply.view('app');
};

exports.register = function (server, options, next) {

    server.route({
        path: '/api/users/authenticate',
        method: 'POST',
        config: {
            auth: false,
            pre: [
                { method: verifyCredentials, assign: 'user' }
            ],
            handler: loginHandler
        }
    });

    server.route({
        path: '/api/users/create',
        method: 'POST',
        config: {
            auth: false,
            pre: [
                { method: verifyUniqueUser }
            ],
            handler: createUser
        }
    });

    server.route({
        method: 'GET',
        path: '/{params*}',
        handler: renderReactApp,
        config: { auth: false }
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
