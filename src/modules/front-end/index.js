const renderStaticFiles = (request, reply) => {
    const filename = request.path;
    reply.file(`./public/${filename}`);
};

const renderReactApp = (request, reply) => {
    reply.view('app');
};
exports.register = function (server, options, next) {

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

    server.route({
        method: 'GET',
        path: '/{params*}',
        handler: renderReactApp
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
