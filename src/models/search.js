import Boom from 'boom';

const userSearchHandler = (request, reply) => {
    const { db } = request.server.plugins.mongodb;
    const { text } = request.query;

    db.collection('users').find({
        $or: [{
            email: {
                $regex: `${text}`, $options: '$i'
            }
        }, {
            firstName: {
                $regex: `${text}`, $options: '$i'
            }
        }, {
            lastName: {
                $regex: `${text}`, $options: '$i'
            }
        }]
    },
        { password: 0 }, async (err, cursor) => {
            if (err) {
                console.log(err);
                return reply(Boom.serverUnavailable());
            }

            const users = await cursor.toArray();

            return reply(users);
        }
    );
};

export default userSearchHandler;
