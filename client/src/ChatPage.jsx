// Importing necessary modules from libraries or files in your project
import React, {useEffect, useState, useRef} from 'react';   // For using hooks and JSX syntax
import ChatBar from './ChatBar';  // Chat bar component for displaying chat info
import ChatBody from './ChatBody';  // Chat body component for showing messages
import ChatFooter from './ChatFooter';  // Chat footer component for inputting new messages

// Main ChatPage Component that takes a socket prop
const ChatPage = ({socket}) => {
    const [messages, setMessages] = useState([]);  // State for storing chat messages
    const [typingStatus, setTypingStatus] = useState('');  // State for typing status message

    // Effect to listen for 'messageResponse' event from server and update state with new messages
    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);

    // Effect to listen for 'typingResponse' event from server and update typing status
    useEffect(() => {
        socket.on('typingResponse', (data) => setTypingStatus(data))
    }, [socket]);

    return (
        <div className="chat">
            <ChatBar socket={socket}/>
            <div className="chat__main">
                <ChatBody messages={messages} typingStatus={typingStatus}/>
                <ChatFooter socket={socket}/>
            </div>
        </div>
    );
};

export default ChatPage;  // Exporting the main chat page component for use in other files
