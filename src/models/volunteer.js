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
