const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected'); 

     //without mocha testing 

    // socket.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'Welcome to the node chat app',
    //     createdAt: new Date().getTime()
    // });

    // socket.broadcast.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'New user joined',
    //     createdAt: new Date().getTime()
    // });

    // socket.on('createMessage',(message) => {
    //     console.log('createMessage', message);
    //     io.emit('newMessage', {
    //         from: message.from,
    //         text: message.text,
    //         createdAt: new Date().getTime()
    // });



    //with mocha testing 
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the node chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    // socket.on('createMessage',(message) => {
    //     console.log('createMessage', message);
    //     io.emit('newMessage', generateMessage(message.from, message.text));

    socket.on('createMessage',(message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();

    // socket.broadcast.emit('newMessage', {
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    // });
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage ('Admin', coords.latitude, coords.longitude)); 
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});


server.listen(port, ()=>{
    console.log(`Server is up on ${port}`);
});



// console.log(__dirname + '/../public');
// console.log();