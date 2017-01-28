import io from 'socket.io';

exports.register = (server, options, next) => {
    const socket = io(server.listener);


    socket.on('connection', (s) => {
        s.emit('now-playing', {
            title: 'Test',
            artist: 'Demo' 
        });
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
