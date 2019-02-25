const express = require('express');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

//listen on every connection
io.on('connection', socket => {
    console.log('a user connected');

    //default username
    socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) =>{
      socket.username = data.username
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('chat message',  msg => {
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });
});

server.listen(process.env.PORT || 3000);
console.log('Server running...');