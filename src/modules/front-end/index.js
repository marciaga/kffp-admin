import Boom from 'boom';
import User from '../../models/user';
import { verifyCredentials, verifyUniqueUser, hashPassword } from '../../models/utils';

const loginHandler = (request, reply) => {
    // responds with user object
    reply(request.pre.user).code(201);
    // reply({ idToken: createToken(user) }).code(201);
};

const createUser = (request, reply) => {
    const db = request.server.plugins['hapi-mongodb'].db;
    const user = new User();
    let { email, password } = request.payload;

    hashPassword(password, (err, hash) => {
        if (err) {
            throw Boom.badRequest(err);
        }

        user.password = hash;

        db.collection('users').insert({
            email: email,
            password: hash
        }, (err, user) => {
            if (err) {
                return reply(Boom.internal('Internal MongoDB error', err));
            }

            return reply({yolo: true}).code(201);
            // reply({ id_token: createToken(user) }).code(201);
        })
    })
};

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
