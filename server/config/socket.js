const cache = require('./cache');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Connected to Socket');

        socket.on('disconnect', () => {
            cache.deleteSocketSession(socket.id);
        });

        socket.on('saveSession', (username) => {
            cache.storeSocketSession(username, socket.id);
        });
    });

    return io;
};
