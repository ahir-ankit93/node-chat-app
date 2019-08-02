var socket = io();

        socket.on('connect', () => {
            console.log('Connected to server');
        });
            //above inside code
          // socket.emit('createMessage', {
            //     from: 'aka',
            //     text: 'yup..! That works for me.'
            // });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        socket.on('newMessage', function (message) {
            console.log('newMessage', message);
            var li = jQuery('<li></li>');
            li.text(`${message.from}: ${message.text}`);

            jQuery('#messages').append(li);
        });

        socket.on('newLocationMessage', function (message){
            var li = jQuery('<li></li>');
            var a = jQuery('<a target="_blank">My current location</a>');

            li.text(`${message.from}: `);
            a.attr('href', message.url);
            li.append(a);

            jQuery('#messages').append(li);
        });

        // socket.emit('createMessage', {
        //     from: 'Frank',
        //     text: 'Hi'
        // }, function (data) {
        //     console.log('Got it', data);
        // });

        jQuery('#message-form').on('submit', function (e) {
            e.preventDefault();

            var messageTextbox = jQuery('[name=message]');

            socket.emit('createMessage', {
                from: 'User',
                text: messageTextbox.val()
            }, function(){
                messageTextbox.val('')
            });
        });


        var locationButton = jQuery('#send-location');
        locationButton.on('click', function (){
            if (!navigator.geolocation){
                return alert('Geolocation not supported by your browser.');
            }

            locationButton.attr('disabled', 'disabled').text('Sending location...');

            navigator.geolocation.getCurrentPosition(function (position){
                locationButton.removeAttr('disabled').text('Send location');
                socket.emit('createLocationMessage', {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });

                // console.log(position);
            }, function (){
                locationButton.removeAttr('disabled').text('Send location');
                alert('Unable to fetch location.');
            });
        });