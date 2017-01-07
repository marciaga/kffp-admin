import Joi from 'joi';
import Boom from 'boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = Joi.object().keys({
    _id: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string(),
    displayName: Joi.string().required(),
    role: Joi.string().required()
});

const createToken = (user) => {
    const { _id, email, role } = user;
    const secret = process.env.JWT_SECRET_KEY;

    return jwt.sign(
        {
            id: _id,
            email,
            scope: role
        },
        secret,
        {
            algorithm: 'HS256',
            expiresIn: '7d'
        }
    );
};

/* Route Handlers */
const loginHandler = (request, reply) => {
    const { db } = request.server.plugins['hapi-mongodb'];
    const password = request.payload.password;

    db.collection('users').findOne({ email: request.payload.email }, (err, user) => {
        if (err) {
            return reply(Boom.internal('Internal MongoDB error', err));
        }

        bcrypt.compare(password, user.password, (error, isValid) => {
            if (isValid) {
                const idToken = createToken(user);
                return reply({ email: user.email, verified: true, idToken });
            }

            return reply(Boom.create(401, 'Incorrect username or email!'));
        });
    });
};

// Fetch all users
const getUsers = (request, reply) => {
    const { db } = request.server.plugins['hapi-mongodb'];

    db.collection('users').find({}, { password: 0 }, async (err, cursor) => {
        if (err) {
            return reply(Boom.internal('Internal MongoDB error', err));
        }

        const users = await cursor.toArray();

        return reply(users);
    });
};

const hashPassword = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (error, hash) => callback(error, hash));
    });
};

// CREATE user method
const createUser = (request, reply) => {
    const { db } = request.server.plugins['hapi-mongodb'];

    try {
        Joi.validate(request.payload, userSchema, (err, value) => {
            if (err) {
                throw Boom.badRequest(err);
            }
            // if value === null, object is valid
            if (value === null) {
                return true;
            }
        });
    } catch (e) {
        return reply(e);
    }

    const { email, password, role, displayName } = request.payload;

    hashPassword(password, (error, hash) => {
        if (error) {
            return reply(Boom.badRequest(error));
        }

        db.collection('users').insert({
            displayName,
            email,
            password: hash,
            role
        }, (mongoErr, user) => {
            if (mongoErr) {
                return reply(Boom.internal('Internal MongoDB error', mongoErr));
            }

            reply({ id_token: createToken(user) }).code(201);
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
    const { db } = request.server.plugins['hapi-mongodb'];
    const password = request.payload.password;

    db.collection('users').findOne({ email: request.payload.email }, (err, user) => {
        if (err) {
            return reply(Boom.internal('Internal MongoDB error', err));
        }

        if (user) {
            bcrypt.compare(password, user.password, (error, isValid) => {
                if (isValid) {
                    return reply(user);
                }
                return reply(Boom.create(401, 'Incorrect username or email!'));
            });
        } else {
            return reply(Boom.create(401, 'Incorrect username or email!'));
        }
    });
};

const verifyUniqueUser = (request, reply) => {
    const { db } = request.server.plugins['hapi-mongodb'];
    const { email } = request.payload;

    db.collection('users').findOne({ $or: [{ email }] }, (err, user) => {
        if (user && (user.email === email)) {
            return reply(Boom.create(401, 'Email already taken!'));
        }

        return reply(request.payload);
    });
};

const updateUser = (request, reply) => {
    const { db, ObjectID } = request.server.plugins['hapi-mongodb'];
    const user = request.payload;

    try {
        Joi.validate(user, userSchema, (err, value) => {
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

    const userId = new ObjectID(user._id);
    const { ...fieldsToUpdate } = user;

    db.collection('users').update({ _id: userId },
        fieldsToUpdate,
        (err, result) => {
            if (err) {
                return reply(Boom.internal('Internal MongoDB error', err));
            }
            // response, e.g. { ok: 1, nModified: 1, n: 1 }
            const response = result.toJSON();
            const { ok, nModified } = response;

            if (ok && nModified) {
                return reply({ success: true });
            }

            return reply({ success: false, message: 'Update was not successful' });
        }
    );
};

const deleteUser = (request, reply) => {
    const { db, ObjectID } = request.server.plugins['hapi-mongodb'];
    const { id } = request.query;
    const userId = new ObjectID(id);

    db.collection('users').remove({ _id: userId }, { justOne: true }, (err, result) => {
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

export {
    getUsers,
    verifyToken,
    createUser,
    updateUser,
    deleteUser,
    loginHandler,
    verifyCredentials,
    verifyUniqueUser
};
