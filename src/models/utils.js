import Boom from 'boom';
import bcrypt from 'bcrypt';

const hashPassword = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            return callback(err, hash);
        });
    });
};

const verifyCredentials = (request, reply) => {
    const db = request.server.plugins['hapi-mongodb'].db;
    const password = request.payload.password;

    db.collection('users').findOne({ email: request.payload.email }, (err, user) => {
        if (err) {
            return reply(Boom.internal('Internal MongoDB error', err));
        }

        bcrypt.compare(password, user.password, (err, isValid) => {
            if (isValid) {
                return reply(user);
            }
            return reply(Boom.badRequest('Incorrect username or email!'));
        });
    });
}

const verifyUniqueUser = (request, reply) => reply(request.payload);
export { verifyCredentials, hashPassword, verifyUniqueUser };
