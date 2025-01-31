// Importing necessary modules from libraries or files in your project
import React, { useState }  from 'react';   // Main React module and hook to handle state

const ChatFooter = ({ socket }) => {    // ChatFooter component takes one prop: socket

    const [message, setMessage]  = useState('');    // State for storing current message being typed by user. Initial value is an empty string.

    // Function to handle typing event
    const handleTyping = () => {
        socket.emit('typing', `${localStorage.getItem('userName')} is typing`);   // Emit 'typing' event with user name to server
    }

    // Function to handle sending message
    const handleSendMessage  = (e) => {
        e.preventDefault();   // Prevents form from submitting normally which would refresh the page

        if(message.trim() && localStorage.getItem('userName')){   // Checking if there's a message and user name in local storage
            socket.emit('message', {    // Emit 'message' event with current message, user name, random id and socket id to server
                text: message,
                name: localStorage.getItem('userName'),
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
            });
        }

        setMessage('');   // Clearing message after sending it
    };

    return (
        <div className="chat__footer">
            <form className="form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Write message"
                    className="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleTyping}
                />
                <button className="sendBtn">SEND</button>
            </form>
        </div>
    );
};

export default ChatFooter;   // Exporting the component as a default export.
