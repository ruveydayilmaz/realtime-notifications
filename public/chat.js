var socket = io.connect('http://localhost:4000', {transports: ['websocket']});

var btn = document.getElementById('send'),
    output = document.getElementById('output')

btn.addEventListener('click', function(){
    socket.emit('notification', {
        message: "New notification",
        handle: "Admin",
        date: `${new Date().getHours()}:${new Date().getMinutes()}`
    });
    message.value = "";
});

socket.on('notification', function(data){
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + ' ' + data.date + '</p>';
});
