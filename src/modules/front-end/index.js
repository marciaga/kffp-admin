const renderReactApp = (request, reply) => {
    reply.view('app');
};

const renderStaticFiles = (request, reply) => {
    const filename = request.path;

    reply.file(`./public${filename}`);
};


exports.register = (server, options, next) => {
    server.route({
        path: '/css/{params*}',
        method: 'GET',
        handler: renderStaticFiles,
        config: { auth: false }
    });

    server.route({
        path: '/js/{params*}',
        method: 'GET',
        handler: renderStaticFiles,
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
