$(function (e) {
    e.preventDefault();
    //make connection 
    var socket = io();

    //buttons and inputs
    var message = $("#message")
    var username = $("#username")
    var send_message = $("#send_message")
    var send_username = $("#send_username")
    var chatroom = $("#chatroom")

    //emit a message
    send_message.click(function(){
        socket.emit('new_message', {message: message.val()})
    })

    //listen on new_message
    socket.on("new_message", (data) =>{
        console.log(data)
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })

    //emit a username
    send_username.click(function() {
        console.log(username.val())
        socket.emit('change_username', {username : username.val()})
    })


    //NOG EEN ANDERE SITE
    // $('form').submit(function (e) {
    //     e.preventDefault(); // prevents page reloading
    //     socket.emit('chat message', $('#m').val());
    //     $('#m').val('');
    //     return false;
    // });
    // socket.on('chat message', function (msg) {
    //     $('#messages').append($('<li>').text(msg));
    // });
});


