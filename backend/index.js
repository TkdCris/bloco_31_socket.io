const express = require('express');
const cors = require('cors');

const app = express();

const http = require('http').createServer(app);

const l = console.log;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  }
});

const port = 3000;
http.listen(port, () => l(`server listening on port: ${port}`));

io.on('connection', (socket) => {
  l('connected')
  socket.on('message', (evt) => {
    l(evt, 'linha 23')
    socket.broadcast.emit('message', evt)
  });

  socket.on('editing', (evt) => {
    l('=== editing ===')
    socket.broadcast.emit('editing',evt)
  });
});

app.use(cors());

app.use(express.static(__dirname));

io.on('disconnect', (evt) => {
  l('some people left')
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
