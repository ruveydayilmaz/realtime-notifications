var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(4000, function(){
    console.log('listening on port 4000');
});

app.use(express.static('public'));

var io = socket(server);
io.on('connection', (socket) => {

    console.log('made connection', socket.id);

    socket.on('notification', function(data){
        console.log(data);
        socket.broadcast.emit('notification', data);
    });

});
