import Joi from 'joi';
import Boom from 'boom';

const showSchema = Joi.object().keys({
    showName: Joi.string().string().required(),
    users: Joi.array().items(Joi.string()).required(),
    daysOfWeek: Joi.string().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    isActive: Joi.boolean().required()
});


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
