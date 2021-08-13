module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('connected')

    socket.on('message', (evt) => {
      console.log(evt, 'linha 23')
      socket.broadcast.emit('message', evt)
    });

    socket.on('editing', (evt) => {
      console.log('=== editing ===')
      socket.broadcast.emit('editing', evt)
    });
  });

  io.on('disconnect', (evt) => {
    console.log('some people left')
  });
}