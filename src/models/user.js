import Joi from 'joi';
import Boom from 'boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = Joi.object().keys({
    _id: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string(),
    displayName: Joi.string().required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    role: Joi.string().required()
});

const getUserById = async (id, db) => {
    try {
        const result = await db.collection('users').findOne({ _id: id });

        return result;
    } catch (e) {
        console.log(e);
    }
};

const createToken = (user) => {
    const { _id, email, role, displayName } = user;
    const secret = process.env.JWT_SECRET_KEY;

    return jwt.sign(
        {
            id: _id,
            email,
            displayName,
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
    const { db } = request.server.plugins.mongodb;
    const password = request.payload.password;

    db.collection('users').findOne({ email: request.payload.email }, (err, user) => {
        if (err) {
            return reply(Boom.internal('Internal MongoDB error', err));
        }

        bcrypt.compare(password, user.password, (error, isValid) => {
            if (isValid) {
                const idToken = createToken(user);
                const { email, displayName, role } = user;

                return reply({
                    email,
                    displayName,
                    idToken,
                    scope: role,
                    verified: true
                });
            }

            return reply(Boom.create(401, 'Incorrect username or email!'));
        });
    });
};

// Fetch all users
const getUsers = (request, reply) => {
    const { db } = request.server.plugins.mongodb;

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
    const { db } = request.server.plugins.mongodb;

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
    const { db } = request.server.plugins.mongodb;
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
    const { db } = request.server.plugins.mongodb;
    const { email } = request.payload;

    db.collection('users').findOne({ $or: [{ email }] }, (err, user) => {
        if (user && (user.email === email)) {
            return reply(Boom.create(401, 'Email already taken!'));
        }

        return reply(request.payload);
    });
};

const updateUser = (request, reply) => {
    const { db, ObjectID } = request.server.plugins.mongodb;
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
    const { _id, ...fieldsToUpdate } = user;

    db.collection('users').update({ _id: userId },
        { $set: fieldsToUpdate },
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
    const { db, ObjectID } = request.server.plugins.mongodb;
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

const verifyPassword = async (request, reply) => {
    const { db, ObjectID } = request.server.plugins.mongodb;
    const { id } = request.params;
    const { name, fields } = request.payload;
    // if it's not the changePassword request, continue
    if (name !== 'changePassword') {
        return reply.continue();
    }

    const { newPasswordFirst, newPasswordSecond } = fields;
    // if it is the changePassword request, verify the relevant fields match
    if (newPasswordFirst !== newPasswordSecond) {
        return reply({
            success: false,
            message: 'New password entries do not match.'
        });
    }

    const userId = new ObjectID(id);
    try {
        const user = await getUserById(userId, db);
        const { currentPassword } = fields;

        bcrypt.compare(currentPassword, user.password, (e, isValid) => {
            if (e) {
                return reply(Boom.internal('Something went wrong with encryption...', e));
            }
            if (isValid) {
                // hash the password and return it to the route handler
                return hashPassword(newPasswordFirst, (err, hash) => {
                    if (err) {
                        return reply({
                            success: false,
                            message: 'Something went wrong...'
                        });
                    }
                    return reply({
                        success: true,
                        password: hash
                    });
                });
            }

            return reply({
                success: false,
                message: 'Current password is incorrect.'
            });
        });
    } catch (e) {
        console.log(e);
    }
};

const updateField = async (id, fieldName, value, db, ObjectID) => {
    const userId = new ObjectID(id);

    try {
        const result = await db.collection('users').update(
            { _id: userId },
            { $set: {
                [fieldName]: value
            } }
        );

        return result.toJSON();
    } catch (e) {
        console.log(e);
    }
};

const updateUserField = async (request, reply) => {
    const { db, ObjectID } = request.server.plugins.mongodb;
    const { result } = request.pre;
    const { id } = request.params;
    const { name, fields } = request.payload;

    if (result && result.success) {
        try {
            const response = await updateField(
                id,
                'password',
                result.password,
                db,
                ObjectID
            );
            const { ok, nModified } = response;

            if (ok && nModified) {
                return reply({ success: true });
            }

            return reply({ success: false, message: 'Update was not successful' });
        } catch (e) {
            console.log(e);
        }
    }

    if (result && !result.success) {
        return reply(result.message);
    }
    // @ma: currently, this block isn't being used, but it probably will later on
    try {
        const key = Object.keys(fields).find(f => fields[f]);
        const value = fields[key];
        const response = await updateField(
            id,
            name,
            value,
            db,
            ObjectID
        );
        const { ok, nModified } = response;

        if (ok && nModified) {
            return reply({ success: true });
        }

        return reply({ success: false, message: 'Update was not successful' });
    } catch (e) {
        console.log(e);
    }
};

export {
    getUsers,
    verifyToken,
    createUser,
    updateUser,
    deleteUser,
    loginHandler,
    verifyCredentials,
    verifyUniqueUser,
    verifyPassword,
    updateUserField
};
