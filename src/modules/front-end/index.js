const renderReactApp = (request, reply) => {
    reply.view('app');
};

exports.register = function (server, options, next) {

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
