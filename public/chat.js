// Make connection
var socket = io.connect('http://localhost:5000');

// Query DOM
var message = document.getElementById('message'),
   handle = document.getElementById('handle'),
   btn = document.getElementById('send'),
   output = document.getElementById('output'),
   feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function() {
   socket.emit('chat', {
      message: message.value,
      handle: handle.value
   });

   message.value = '';
});

// Execute a function when the user releases a key on the keyboard
message.addEventListener('keyup', function(event) {
   // Cancel the default action, if needed
   event.preventDefault();
   var enter = 'Enter';
   // Number 13 is the "Enter" key on the keyboard
   if (event.key === enter) {
      // Trigger the button element with a click
      document.getElementById('send').click();
   }
});

message.addEventListener('keypress', function() {
   socket.emit('typing', handle.value);
});

// Listen for events
socket.on('chat', function(data) {
   output.innerHTML +=
      '<p><strong>' + data.handle + '</strong><br>' + data.message + '</p>';
   feedback.innerHTML = '';
});

socket.on('typing', function(data) {
   feedback.innerHTML = '<p><em>' + data + ' is typing a message</em></p>';
});
