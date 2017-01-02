import Joi from 'joi';
import Boom from 'boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    displayName: Joi.string().required(),
    role: Joi.string().required()
}).and('email', 'password');

/* Route Handlers */
const loginHandler = (request, reply) => {
    const db = request.server.plugins['hapi-mongodb'].db;
    const password = request.payload.password;

    db.collection('users').findOne({ email: request.payload.email }, (err, user) => {
        if (err) {
            return reply(Boom.internal('Internal MongoDB error', err));
        }

        bcrypt.compare(password, user.password, (err, isValid) => {
            if (isValid) {
                const idToken = createToken(user);
                return reply({ email: user.email, verified: true, idToken});
            }
            return reply(Boom.create(401, 'Incorrect username or email!'));
        });
    });
};

// Fetch all users
const getUsers = (request, reply) => {
    const db = request.server.plugins['hapi-mongodb'].db;

    db.collection('users').find({}, { password: 0 }, async (err, cursor) => {
        if (err) {
            return reply(Boom.internal('Internal MongoDB error', err));
        }

        const users = await cursor.toArray();

        return reply(users);
    })
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

    const { email, password, role } = request.payload;

    hashPassword(password, (err, hash) => {
        if (err) {
            return reply(Boom.badRequest(err));
        }

        db.collection('users').insert({
            email: email,
            password: hash,
            role: role
        }, (err, user) => {
            if (err) {
                return reply(Boom.internal('Internal MongoDB error', err));
            }

            reply({ id_token: createToken(user) }).code(201);
        })
    })
};

/* Helper functions */
const hashPassword = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            return callback(err, hash);
        });
    });
};

const verifyToken = (request, reply) => {
    const { authorization } = request.headers;

    if (authorization) {
        const token = authorization.split(' ').pop();

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                // return error message to client
                /*
                err = {
                    name: 'TokenExpiredError',
                    message: 'jwt expired',
                    expiredAt: 1408621000
                }
                */
                const error = {
                    ...err,
                    code: 401
                };
                return reply(error);
            }

            return reply({ ...decoded, verified: true }).code(201);
        });
    } else {
        return reply({ verified: false });
    }
};

const verifyCredentials = (request, reply) => {
    const db = request.server.plugins['hapi-mongodb'].db;
    const password = request.payload.password;

    db.collection('users').findOne({ email: request.payload.email }, (err, user) => {
        if (err) {
            return reply(Boom.internal('Internal MongoDB error', err));
        }

        if (user) {
            bcrypt.compare(password, user.password, (err, isValid) => {
                if (isValid) {
                    return reply(user);
                }
                return reply(Boom.create(401, 'Incorrect username or email!'));
            });
        } else {
            return reply(Boom.create(401, 'Incorrect username or email!'));
        }
    });
}

const createToken = (user) => {
    const { _id, email, role } = user;
    const secret = process.env.JWT_SECRET_KEY;

    return jwt.sign(
        {
            id: _id,
            email: email,
            scope: role
        },
        secret,
        {
            algorithm: 'HS256',
            expiresIn: '7d'
        }
    );
};

const verifyUniqueUser = (request, reply) => {
    const db = request.server.plugins['hapi-mongodb'].db;
    const { email } = request.payload;

    db.collection('users').findOne({ $or: [{ email: email }] }, (err, user) => {
        if (user && (user.email === email)) {
            return reply(Boom.create(401, 'Email already taken!'));
        }

        return reply(req.payload);
    });
}

export { getUsers, verifyToken, createUser, loginHandler, verifyCredentials, verifyUniqueUser };
