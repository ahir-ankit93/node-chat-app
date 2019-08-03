var socket = io();

    // function scrollToBottom () {
        // Selectors
        // var message = jQuery('#messages');
 
        // Heights
        // var clientHeight = message.prop('clientHeight');
        // var scrollTop = message.prop()
    // }

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
            var formattedTime = moment(message.createdAt).format('h:mm a');
            var template = jQuery('#message-template').html();
            var html = Mustache.render(template, {
                text: message.text,
                from: message.from,
                createdAt: formattedTime

            });

            jQuery('#messages').append(html);
            // scrollToBottom();
       
            // console.log('newMessage', message);
        //    var formattedTime = moment(message.createdAt).format('h:mm a');
        //     var li = jQuery('<li></li>');
        //     li.text(`${message.from} ${formattedTime} : ${message.text}`);

        //     jQuery('#messages').append(li);
    });


        socket.on('newLocationMessage', function (message){
            var formattedTime = moment(message.createdAt).format('h:mm a');
            var template = jQuery('#location-message-template').html();
            var html = Mustache.render(template, {
                from: message.from,
                url: message.url,
                createdAt: formattedTime
            });

            jQuery('#messages').append(html);
            // scrollToBottom();

            // var formattedTime = moment(message.createdAt).format('h:mm a');
            // var li = jQuery('<li></li>');
            // var a = jQuery('<a target="_blank">My current location</a>');

            // li.text(`${message.from} ${formattedTime} : `);
            // a.attr('href', message.url);
            // li.append(a);

            // jQuery('#messages').append(li);
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