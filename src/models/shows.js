import Joi from 'joi';
import Boom from 'boom';
import Promise from 'bluebird';
import moment from 'moment';

const showSchema = Joi.object().keys({
    _id: Joi.string(),
    showName: Joi.string().required(),
    users: Joi.array().items(Joi.string()).required(),
    dayOfWeek: Joi.string().required(),
    startTime: Joi.number().integer().required(),
    endTime: Joi.number().integer().required(),
    isActive: Joi.boolean().required(),
    slug: Joi.string().required(),
    description: Joi.string().allow(''),
    primaryImage: Joi.string().allow('')
});

const daysOfWeek = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];

const nextDayGenerator = day => moment().day(day).add(1, 'day').format('dddd');

const determineSortOrderByDay = (startDay) => {
    let start = startDay;

    const ary = [start];

    let i = 0;

    for (i; i < daysOfWeek.length - 1;) {
        start = nextDayGenerator(start);
        ary.push(start);
        i += 1;
    }

    return ary.reduce((memo, key, index) => {
        memo[key.toLowerCase()] = index + 1;

        return memo;
    }, {});
};

const determineDayOrder = (start, data) => {
    const sortOrder = determineSortOrderByDay(start);

    const sortedByDay = data.sort((a, b) => {
        const day1 = a.dayOfWeek.toLowerCase();
        const day2 = b.dayOfWeek.toLowerCase();

        return sortOrder[day1] - sortOrder[day2];
    });

    const filteredResults = sortedByDay.filter(d => (d.endTime || d.startTime));

    // create an object keyed according to sortOrder so as to obtain
    daysOfWeek.forEach((day) => {
        sortOrder[day] = filteredResults.filter(d => d.dayOfWeek.toLowerCase() === day)
        .sort((a, b) => a.startTime - b.startTime);
    });

    // then sort within each array by startTime
    const finalSort = Object.keys(sortOrder).reduce((cur, prev) => {
        cur.push(sortOrder[prev]);

        return cur;
    }, []);
    // lastly, flatten the arrays
    return finalSort.reduce((a, b) => [...a, ...b]);
};

const getShows = async (request, reply) => {
    const { db, ObjectID } = request.server.plugins.mongodb;
    const { id } = request.params;
    const queryParams = request.query;
    const { startWeek } = queryParams;

    // exclude shows that startTime: 0 and endTime: 0
    const query = {
        ...queryParams,
        startWeek: undefined
    };
    const userIds = queryParams.users ? queryParams.users.split(',') : null;

    if (userIds) {
        query.users = userIds.map(e => new ObjectID(e.trim()));
    }

    const objId = id ? new ObjectID(id) : null;

    if (objId) {
        query._id = objId;
    }

    try {
        const result = await db.collection('shows').find(query).toArray();

        const transformedResult = result.map(async (doc) => {
            const objectIds = doc.users.map(showId => new ObjectID(showId));

            const users = await db.collection('users').find({
                _id: { $in: objectIds }
            }, {
                _id: 1,
                displayName: 1
            }).toArray();

            doc.users = users;

            return new Promise(resolve => resolve(doc));
        });

        Promise.all(transformedResult).then((r) => {
            const returnVal = startWeek ? determineDayOrder(startWeek, r) : r;

            reply(returnVal);
        });
    } catch (e) {
        console.log(e);
        return reply(Boom.serverUnavailable());
    }
};

const updateShow = (request, reply) => {
    const { db, ObjectID } = request.server.plugins.mongodb;
    const show = request.payload;

    const { err } = Joi.validate(show, showSchema);

    if (err) {
        console.log(err);

        return reply({
            success: false,
            message: 'Validation Failed'
        });
    }

    const showId = new ObjectID(show._id);
    // non-destructively assigns all properties to variable without _id
    const { _id, ...fieldsToUpdate } = show;

    db.collection('shows').update({ _id: showId }, fieldsToUpdate, (error, result) => {
        if (error) {
            console.log(error);
            return reply(Boom.serverUnavailable());
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
        async (e, cursor) => {
            if (e) {
                console.log(e);
                return reply(Boom.serverUnavailable());
            }

            const existingShow = await cursor.toArray();

            if (existingShow.length) {
                return reply(Boom.unauthorized('A record with that show name already exists'));
            }

            const { err } = Joi.validate(newShow, showSchema);

            if (err) {
                console.log(err);

                return reply({
                    success: false,
                    message: 'Validation Failed'
                });
            }
            // insert the record
            db.collection('shows').insert(newShow, (error, doc) => {
                if (error) {
                    console.log(error);
                    return reply(Boom.serverUnavailable());
                }

                const { ops } = doc;
                const newDoc = ops.find((o, i) => (
                    i === 0
                ));

                return reply(newDoc).code(201);
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
            console.log(err);
            return reply(Boom.serverUnavailable());
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
