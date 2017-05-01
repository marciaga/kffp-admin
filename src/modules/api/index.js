import imageUpload from '../../models';
import userSearchHandler from '../../models/search';
import showRoutes from './routes/shows';
import userRoutes from './routes/users';
import playlistRoutes from './routes/playlists';
import nowPlayingRoutes from './routes/nowPlaying';
import { API_BASE_URL } from './constants';

exports.register = (server, options, next) => {
    // register routes
    showRoutes.map(r => server.route(r));
    userRoutes.map(r => server.route(r));
    playlistRoutes.map(r => server.route(r));
    nowPlayingRoutes.map(r => server.route(r));

    server.route({
        path: `${API_BASE_URL}/health`,
        method: 'GET',
        config: {
            handler: (request, reply) => {
                reply({ status: 'OK' });
            },
            auth: {
                strategy: 'jwt',
                scope: ['admin'],
                mode: 'optional'
            }
        }
    });
    // generic upload route
    server.route({
        path: `${API_BASE_URL}/upload`,
        method: 'POST',
        config: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                maxBytes: 52428800
            },
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            handler: imageUpload
        }
    });
    // users search endpoint for autocomplete
    server.route({
        path: `${API_BASE_URL}/search/users`,
        method: 'GET',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            handler: userSearchHandler
        }
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
