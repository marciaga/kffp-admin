import hapiJwt from 'hapi-auth-jwt2';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.register = (server, options, next) => {
    server.register(hapiJwt);

    server.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET_KEY,
        validateFunc: (decoded, request, callback) => callback(null, true), // replace this with something better
        verifyOptions: { algorithms: ['HS256'] }
    });

    server.auth.default('jwt');
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
