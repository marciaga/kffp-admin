const renderReactApp = (request, reply) => {
    reply.view('app');
};

exports.register = (server, options, next) => {
    server.route({
        path: '/css/{params*}',
        method: 'GET',
        handler: {
            directory: {
                path: 'public'
            }
        },
        config: { auth: false }
    });

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
