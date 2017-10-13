import Joi from 'joi';
import R from 'ramda';
import Boom from 'boom';

const volunteerFormSchema = Joi.object().keys({
    userId: Joi.string().required(),
    category: Joi.string().required(),
    date: Joi.date().iso().required(),
    type: Joi.string().required(),
    hours: Joi.number().required(),
    comments: Joi.string().optional()
});

export const postVolunteerForm = (request, reply) => {
    const { db } = request.server.plugins.mongodb;
    const { payload } = request;

    const { error } = Joi.validate(payload, volunteerFormSchema);
    // send to sentry: error.details[0].message
    const handleError = () => reply(Boom.badRequest('Failed validation'));

    const addSubmission = async () => {
        try {
            const { result } = await db.collection('volunteerhours').insert(payload);

            const res = R.ifElse(
                () => result.ok === 1,
                () => reply({ success: true }),
                () => reply({ success: false })
            );

            return res(result);
        } catch (e) {
            // send to sentry
            reply(Boom.badRequest('Failed to insert document'));
        }
    };

    const validation = R.ifElse(
        R.isNil,
        addSubmission,
        handleError
    );

    validation(error);
};

export const getVolunteerReport = async (request, reply) => {
    const { credentials } = request.auth;
    const { db } = request.server.plugins.mongodb;
    const { startDate, endDate, userId } = request.query;

    const dates = startDate && endDate ? {
        date: {
            $gte: new Date(startDate).toISOString(),
            $lte: new Date(endDate).toISOString()
        } } :
        false;

    const includeUserId = credentials.scope === 'dj' ? credentials.id : userId;
    /* eslint-disable no-nested-ternary */
    const criteria = dates && includeUserId ? {
        ...dates,
        userId: includeUserId
    } : includeUserId ? {
        userId: includeUserId
    } : dates ? { ...dates } : {};
    /* eslint-enable no-nested-ternary */

    try {
        const result = await db.collection('volunteerhours')
        .find(criteria)
        .sort({ date: 1 })
        .toArray();

        reply(result);
    } catch (err) {
        console.log(err);
        return reply(Boom.internal('Failed to generate volunteer report.'));
    }
};
