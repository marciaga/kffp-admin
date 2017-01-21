import userSearchHandler from '../../models/search';
import showRoutes from './routes/shows';
import userRoutes from './routes/users';
import playlistRoutes from './routes/playlists';
import nowPlayingRoutes from './routes/nowPlaying';

exports.register = (server, options, next) => {
    // register routes
    showRoutes.map(r => server.route(r));
    userRoutes.map(r => server.route(r));
    playlistRoutes.map(r => server.route(r));
    nowPlayingRoutes.map(r => server.route(r));

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

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
