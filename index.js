var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(4000, () => {
    console.log('listening on port 4000');
});

app.use(express.static('public'));
var io = socket(server);

var activeUsers = [];
io.on('connection', (socket) => {
    socket.on("new-user", (userId) => {
        if (!activeUsers.some((user) => user.userId === userId)) {
          activeUsers.push({ userId: userId, socketId: socket.id });
          console.log("User Connected! userId: ", userId);
          console.log("All Users", activeUsers);
        }
    });

    socket.on('notification', (data) => {
        console.log("Sending to all users...", data);
        socket.broadcast.emit('notification', data);
    });

    socket.on('personal-notification', (data) => {
        const user = activeUsers.find((user) => user.userId === data.receiver);
        if(user) {
          console.log("Sending...", data);
          io.to(user.socketId).emit("get-personal-notification", data);
        }
    });

    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("User Disconnected! userId: ", socket.id);
      });
});
