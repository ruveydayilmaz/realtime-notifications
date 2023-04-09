var socket = io.connect('http://localhost:4000', {transports: ['websocket']});

var btn = document.getElementById('send'),
    output = document.getElementById('output'),
    input = document.getElementById('input'),
    btn2 = document.getElementById('send2'),
    input2 = document.getElementById('input2'),
    user = document.getElementById('user'),
    output2 = document.getElementById('output2'),
    chooseDiv = document.getElementById('choose-div'),
    choose = document.getElementById('choose-btn'),
    userId = document.getElementById('user-id'),
    container = document.getElementById('container')

choose.addEventListener('click', () => {
    socket.emit('new-user', userId.value);
    userId.value = "";
    container.style.display = 'flex';
    chooseDiv.style.display = 'none';
});

btn.addEventListener('click', () => {
    socket.emit('notification', {
        message: input.value,
        handle: "Admin",
        date: `${new Date().getHours()}:${new Date().getMinutes()}`
    });
    input.value = "";
});

btn2.addEventListener('click', () => {
    socket.emit('personal-notification', {
        message: input2.value,
        handle: "User",
        date: `${new Date().getHours()}:${new Date().getMinutes()}`,
        receiver: user.value
    });
    input2.value = "";
});

socket.on('notification', (data) => {
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + ' ' + data.date + '</p>';
});

socket.on('get-personal-notification', (data) => {
    console.log('dataa', data)
    output2.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + ' ' + data.date + '</p>';
});
