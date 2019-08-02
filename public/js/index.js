var socket = io();

        socket.on('connect', () => {
            console.log('Connected to server');

            socket.emit('createMessage', {
                from: 'aka',
                text: 'yup..! That works for me.'
            });
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        socket.on('newMessage', function (message) {
            console.log('newMessage', message);
        });