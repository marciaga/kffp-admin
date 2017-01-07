import hapiJwt from 'hapi-auth-jwt2';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const validate = (decoded, request, callback) => {
    /*
    {
        id: '',
        email: '',
        scope: 'admin',
        iat: 1480563674,
        exp: 1481168474
    }
    */
    const { scope } = decoded;

    if (scope === 'admin') {
        return callback(null, true);
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
