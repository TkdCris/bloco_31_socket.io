const express = require('express');
const cors = require('cors');

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
});

const port = 3000;

app.use(cors());

app.use(express.static(__dirname));

require('./sockets/server')(io);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(port, () => console.log(`server listening on port: ${port}`));