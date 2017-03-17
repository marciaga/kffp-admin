import Boom from 'boom';

const userSearchHandler = (request, reply) => {
    const { db } = request.server.plugins.mongodb;
    const { text } = request.query;

    db.collection('users').find({ email: { $regex: `${text}`, $options: '$i' } },
        { password: 0 }, async (err, cursor) => {
            if (err) {
                return reply(Boom.internal('internal mongodb error', err));
            }

            const users = await cursor.toArray();

            return reply(users);
        }
    );
};

export default userSearchHandler;
