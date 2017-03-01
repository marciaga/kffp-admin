import Boom from 'boom';
import { userSearchHandler } from '../../models/search';
import Playlist from '../../models/playlist';
import showRoutes from './routes/shows';
import userRoutes from './routes/users';

exports.register = function (server, options, next) {
    // register routes
    showRoutes.map(r => server.route(r));
    userRoutes.map(r => server.route(r));

    // users search endpoint for autocomplete
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

    // refactor this
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
