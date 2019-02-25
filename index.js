const express = require("express");
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

io.emit('some event', {
  for: 'everyone'
});

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
    console.log('chat message ' + msg)
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});