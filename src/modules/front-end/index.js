// const renderStaticFiles = (request, reply) => {
//     const filename = request.path;
//     reply.file(`./public/${filename}`);
// };

const loginHandler = (request, reply) => {

    reply({ idToken: createToken(user) }).code(201);
};

const renderReactApp = (request, reply) => {
    reply.view('app');
};
exports.register = function (server, options, next) {

    server.route({
        path: '/api/users/login',
        method: 'POST',
        handler: loginHandler,
        config: { auth: false }
    });

    /*
    server.route({
        path: '/js/{params*}',
        method: 'GET',
        handler: renderStaticFiles
    });

    server.route({
        path: '/css/{params*}',
        method: 'GET',
        handler: renderStaticFiles
    });
    */

    server.route({
        method: 'GET',
        path: '/{params*}',
        handler: renderReactApp,
        config: { auth: false }
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
