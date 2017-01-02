import Boom from 'boom';

const userSearchHandler = (request, reply) => {
    const db = request.server.plugins['hapi-mongodb'].db;
    const { text } = request.query;

    db.collection('users').find({ email: { $regex: `${text}`, $options: "$i" }},
        { password: 0 }, async (err, cursor) => {
            if (err) {
                return reply(boom.internal('internal mongodb error', err));
            }

            const users = await cursor.toArray();

            return reply(users);
        }
    );
};

export { userSearchHandler };
