import io from 'socket.io';

exports.register = (server, options, next) => {
    const socket = io(server.listener);

    server.expose('socket', socket);

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
