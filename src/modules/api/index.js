import Playlist from '../../models/playlist';

exports.register = function (server, options, next) {

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
