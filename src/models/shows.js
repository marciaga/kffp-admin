import Joi from 'joi';
import Boom from 'boom';
import Promise from 'bluebird';

const showSchema = Joi.object().keys({
    _id: Joi.string(),
    showName: Joi.string().required(),
    users: Joi.array().items(Joi.string()).required(),
    dayOfWeek: Joi.string().required(),
    startTime: Joi.number().integer().required(),
    endTime: Joi.number().integer().required(),
    isActive: Joi.boolean().required(),
    slug: Joi.string().required(),
    description: Joi.string(),
    primaryImage: Joi.string()
});

const getShows = async (request, reply) => {
    const { db, ObjectID } = request.server.plugins.mongodb;
    const params = request.query || {};

    try {
        const result = await db.collection('shows').find(params).toArray();

        const transformedResult = result.map(async (doc) => {
            const objectIds = doc.users.map(id => new ObjectID(id));

            const users = await db.collection('users').find({
                _id: { $in: objectIds }
            }, {
                _id: 1,
                displayName: 1
            }).toArray();

            doc.users = users;

            return new Promise(resolve => resolve(doc));
        });

        Promise.all(transformedResult).then(r => reply(r));
    } catch (e) {
        console.log(e);
        return reply(Boom.internal('Internal MongoDB error', e));
    }
};

const updateShow = (request, reply) => {
    const { db, ObjectID } = request.server.plugins.mongodb;
    const show = request.payload;

    try {
        Joi.validate(show, showSchema, (err, value) => {
            if (err) {
                console.log(err);
                throw Boom.badRequest(err);
            }
            // if value === null, object is valid
            if (value === null) {
                return true;
            }
        });
    } catch (err) {
        return reply(err);
    }

    const showId = new ObjectID(show._id);
    // non-destructively assigns all properties to variable without _id
    const { _id, ...fieldsToUpdate } = show;

    db.collection('shows').update({ _id: showId }, fieldsToUpdate, (error, result) => {
        if (error) {
            return reply(Boom.internal('Internal MongoDB error', error));
        }
        // response, e.g. { ok: 1, nModified: 1, n: 1 }
        const response = result.toJSON();
        const { ok, nModified } = response;

        if (ok && nModified) {
            return reply({ success: true });
        }

        return reply({ success: false, message: 'Update was not successful' });
    });
};

const upsertShow = (request, reply) => {
    const { db } = request.server.plugins.mongodb;
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
                Joi.validate(newShow, showSchema, (validationErr, value) => {
                    if (validationErr) {
                        console.log(validationErr);
                        throw Boom.badRequest(validationErr);
                    }
                    // if value === null, object is valid
                    if (value === null) {
                        return true;
                    }
                });
            } catch (e) {
                return reply(e);
            }

            // insert the record
            db.collection('shows').insert(newShow, (error, doc) => {
                if (error) {
                    return reply(Boom.internal('Internal MongoDB error', error));
                }

                const { ops } = doc;
                const newDoc = ops.find((o, i) => (
                    i === 0
                ));

                return reply(newDoc);
            });
        }
    );
};

const removeShow = (request, reply) => {
    const { db, ObjectID } = request.server.plugins.mongodb;
    const { id } = request.query;
    const showId = new ObjectID(id);

    db.collection('shows').remove({ _id: showId }, { justOne: true }, (err, result) => {
        if (err) {
            return reply(Boom.internal('Internal MongoDB error', err));
        }
        // result, e.g. { ok: 1, n: 0 }
        const response = result.toJSON();
        const { ok, n } = response;

        if (ok && n) {
            return reply({ success: true });
        }

        return reply({ success: false, message: 'Update was not successful' });
    });
};

export { getShows, upsertShow, updateShow, removeShow };
