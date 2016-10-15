$(document).ready(function() {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    var notifications = $('#notifications');
    var currentConnected = 0;
    
    
    var addMessage = function(message) {
        messages.prepend('<div>' + message + '</div>');
    };
    
    var greet = function(count) {
        notifications.text('Welcome!');
        setTimeout(function() {
            notifications.text('Clients connected: ' + count);
        }, 2000);
    };
    
    var notifyConnect = function(count) {
        notifications.text('New Connection!');
        setTimeout(function() {
            notifications.text('Clients connected: ' + count);
        }, 2000);
    };
    
    var notifyDisconnect = function(count) {
        notifications.text('Connection Left!');
        setTimeout(function() {
            notifications.text('Clients connected: ' + count);
        }, 2000);
    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = input.val();
        addMessage(message);
        socket.emit('message', message);
        input.val('');
    });
    
    socket.on('message', addMessage);
    socket.on('newConnect', notifyConnect);
    socket.on('countdown', notifyDisconnect);
    socket.on('welcome', greet);
    socket.emit('enter');
    
    
    
});