const SocketIo = require('socket.io');
let io;

const InitializeSocket = (server) => {
  io = SocketIo(server, {
    cors: {
      origin: 'http://localhost:8173',
    },
  });
};

const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

module.exports = { InitializeSocket, getIo };
