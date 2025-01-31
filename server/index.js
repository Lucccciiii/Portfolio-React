const express = require('express');
const app = express();
const PORT = 4000;

// New imports
const http = require('http').Server(app);
const cors = require('cors');
const socketIO = require('socket.io')(http, {
    cors: {
        // Change port and origin when changing from dev to release
        origin: "http://localhost:5173"
    }
});

let users = [];

app.use(cors());

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('message', (data) => {
        socketIO.emit('messageResponse', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typingResponse', data);
    });

    // Listen for new users
    socket.on('newUser', (data) => {
        // Check if user already exists before adding
        if (!users.some(user => user.socketID === data.socketID)) {
            // Add the new user to the list of active users
            users.push(data);
        } else {
            socket.disconnect(true); // Disconnect the duplicate user
        }

        // Send the list of users to the clients
        socketIO.emit('newUserResponse', users);
    });

    const refreshInterval = setInterval(() => {
        socket.emit('refreshUsers', users);
    }, 5000);

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        // Updates the list of active users when a user disconnects
        users = users.filter((user) => user.socketID !== socket.id);
        // Sends the list of users to all users to update the list
        socketIO.emit('newUserResponse', users); // Fixed the typo here

        clearInterval(refreshInterval);
    });
});

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});