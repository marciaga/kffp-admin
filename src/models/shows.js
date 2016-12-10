import Joi from 'joi';
import Boom from 'boom';

const getShows = (request, reply) => {
    const db = request.server.plugins['hapi-mongodb'].db;
    db.collection('shows').find({}, async (err, cursor) => {
        if (err) {
            return reply(Boom.internal('Internal MongoDB error', err));
        }

        const shows = await cursor.toArray();

        return reply(shows);
    });
};

export { getShows };
