module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('connected')

    socket.on('message', (evt) => {
      socket.broadcast.emit('message', evt)
    });

    socket.on('editing', (evt) => {
      socket.broadcast.emit('editing', evt)
    });
  });

  io.on('disconnect', (evt) => {
    console.log('some people left')
  });
}