import Joi from 'joi';
import Boom from 'boom';
import { hashPassword } from './utils';

const userSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
}).and('email', 'password');


const loginHandler = (request, reply) => {
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

    // TODO respond with a JWT
    reply(request.pre.user).code(201);
    // reply({ idToken: createToken(user) }).code(201);
};

// CREATE user method
const createUser = (request, reply) => {
    const db = request.server.plugins['hapi-mongodb'].db;

    try {
        Joi.validate(request.payload, userSchema, (err, value) => {
            // if value === null, object is valid
            if (err) {
                throw Boom.badRequest(err);
            }

            return true;
        });
    } catch (err) {
        return reply(err);
    }

    const { email, password } = request.payload;

    hashPassword(password, (err, hash) => {
        if (err) {
            return reply(Boom.badRequest(err));
        }

        db.collection('users').insert({
            email: email,
            password: hash
        }, (err, user) => {
            if (err) {
                return reply(Boom.internal('Internal MongoDB error', err));
            }

            return reply({yolo: true}).code(201);
            // TODO create a JWT and return it
            // reply({ id_token: createToken(user) }).code(201);
        })
    })
};

export { createUser, loginHandler };
