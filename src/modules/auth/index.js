import hapiJwt from 'hapi-auth-jwt2';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const people = {
    1: {
        id: 1,
        name: 'Jen Jones'
    }
};

const validate = (decoded, request, callback) => {
    if (!people[decoded.id]) {
        return callback(null, false);
    }

    return callback(null, true);
};

exports.register = (server, options, next) => {
    server.register(hapiJwt);

    server.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET_KEY,
        validateFunc: validate,
        verifyOptions: { algorithms: ['HS256'] }
    });

    server.auth.default('jwt');
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
