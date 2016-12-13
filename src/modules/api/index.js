import Boom from 'boom';
import {
    createUser,
    loginHandler,
    verifyCredentials,
    verifyUniqueUser,
    verifyToken,
    getUsers
} from '../../models/user';
import { userSearchHandler } from '../../models/search';

import { getShows } from '../../models/shows';

import Playlist from '../../models/playlist';

exports.register = function (server, options, next) {
    server.route({
        path: '/api/users',
        method: 'GET',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            handler: getUsers
        }
    });

    server.route({
        path: '/api/users/verify',
        method: 'GET',
        config: {
            auth: false,
            handler: verifyToken
        }
    });

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
            auth: false, // change to 'jwt'
            pre: [
                { method: verifyUniqueUser }
            ],
            handler: createUser
        }
    });
    // get all shows
    server.route({
        path: '/api/shows',
        method: 'GET',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            handler: getShows
        }
    });
    // create a show
    server.route({
        path: '/api/shows',
        method: 'POST',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            handler: () => console.log('')
        }
    });

    // users search endpoint
    server.route({
        path: '/api/search/users',
        method: 'GET',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            handler: userSearchHandler
        }
    });

    server.route({
        method: 'POST',
        path: '/api/v1/playlist/{id}',
        handler: (request, reply) => {
            const { showId, title, description, img } = request.payload;

            Playlist.create(showId, title, description, img, (err, playlist) => {
                if (err) {
                    return reply(Boom.wrap(err));
                }

                return reply({
                    success: true,
                    playlist: playlist
                });
            });
        }
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
