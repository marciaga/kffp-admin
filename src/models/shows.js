import Joi from 'joi';
import Boom from 'boom';

const showSchema = Joi.object().keys({
    showName: Joi.string().required(),
    users: Joi.array().items(Joi.string()).required(),
    dayOfWeek: Joi.string().required(),
    startTime: Joi.number().integer().required(),
    endTime: Joi.number().integer().required(),
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

const upsertShow = (request, reply) => {
    const db = request.server.plugins['hapi-mongodb'].db;
    const newShow = request.payload;

    db.collection('shows').find({ showName: newShow.showName },
        {}, { limit: 1 },
        async (err, cursor) => {
            if (err) {
                return reply(Boom.internal('Internal MongoDB error', err));
            }

            const existingShow = await cursor.toArray();

            if (existingShow.length) {
                const msg = {
                    code: 401,
                    message: 'A record with that show name already exists'
                };

                return reply(msg);
            }
            // Validate against the Show schema
            try {
                Joi.validate(newShow, showSchema, (err, value) => {
                    // if value === null, object is valid
                    if (err) {
                        console.log(err);
                        throw Boom.badRequest(err);
                    }

                    return true;
                });
            } catch (err) {
                return reply(err);
            }

            // insert the record
            db.collection('shows').insert(newShow, (err, doc) => {
                if (err) {
                    return reply(Boom.internal('Internal MongoDB error', err));
                }

                const { ops } =  doc;
                const newDoc = ops.find((o, i) => {
                    return i === 0;
                });

                return reply(newDoc);
            });
        }
    );
};

export { getShows, upsertShow };
