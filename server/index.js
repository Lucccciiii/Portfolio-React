const express = require('express'); // Require Express library
const app = express(); // Create an instance of the Express application
const PORT = 4000; // Define the port number for the server to listen on

// New imports
const http = require('http').Server(app); // Import Http Server from Node.js core modules, and create a new HTTP Server with Express app as handler
const cors = require('cors'); // Require CORS library to handle cross-origin requests
const socketIO = require('socket.io')(http, {  // Require Socket.io and connect it to the http server instance
    cors: {
        origin: "http://localhost:5173" // Define allowed origins for CORS
    }});

let users = []; // Initialize an empty array to store user data

app.use(cors()); // Use middleware to handle Cross-Origin Resource Sharing (CORS)

socketIO.on('connection', socket => {  // Define event listener for new connections
    console.log(`⚡: ${socket.id} user just connected`); // Log a message with the ID of the newly connected client

    socket.on('message', data => {  // Define event listener for 'message' events from clients
        socketIO.emit('messageResponse', data); // Broadcast incoming messages to all other clients
    });

    socket.on('typing', data => {  // Define event listener for 'typing' events from clients
        socket.broadcast.emit('typingResponse', data); // Broadcast typing status updates to all other clients
    });

    socket.on('newUser', data => { // Define event listener for new user joins
        if (!users.some(user => user.socketID === data.socketID)) {  // Check if the joining user has already joined before
            users.push(data); // If not, add the new user to active users list
        } else {
            socket.disconnect(true); // If yes, disconnect the duplicate user
        }

        socketIO.emit('newUserResponse', users); // Broadcast updated user list to all clients
    });

    const refreshInterval = setInterval(() => {  // Set an interval to broadcast active user list every 5 seconds
        socket.emit('refreshUsers', users);
    }, 5000);

    socket.on('disconnect', () => { // Define event listener for client disconnection
        console.log('🔥: A user disconnected'); // Log a message when a client disconnects
        users = users.filter(user => user.socketID !== socket.id);  // Update the active users list to remove the disconnected one
        socketIO.emit('newUserResponse', users); // Broadcast updated user list to all clients

        clearInterval(refreshInterval); // Clear the interval for refreshing users list after a client disconnects
    });
});

app.get('/api', (req, res) => {  // Define route handler for HTTP GET requests at '/api' path
    res.json({ message: 'Hello world' }); // Respond with a JSON object containing a simple message
});

http.listen(PORT, () => {  // Start the server listening on PORT number
    console.log(`Server listening on ${PORT}`); // Log a message when the server starts successfully
});
