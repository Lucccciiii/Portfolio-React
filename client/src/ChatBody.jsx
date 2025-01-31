// Importing necessary modules from libraries or files in your project
import React from 'react';   // Main React module
import { useNavigate } from 'react-router-dom';  // Hook to programmatically navigate around your application

const ChatBody = ({ messages, typingStatus }) => {  // ChatBody component takes two props: messages and typingStatus
    const navigate = useNavigate();   // hook for navigation

    // Function to handle leaving chat event
    const handleLeaveChat = () => {
        localStorage.removeItem('userName');   // Removes username from browser's local storage
        navigate('/');  // Navigates to the homepage after leaving chat
        window.location.reload();  // Reloads the page so that user is redirected to homepage and not in a previous chat room
    };

    return (
        <>

            <header className="chat__mainHeader">
                <p>Main Chat</p>


                <button className="leaveChat__btn" onClick={handleLeaveChat}>
                    LEAVE CHAT
                </button>
            </header>


            <div className="message__container">

                {messages.map((message) =>
                    message.name === localStorage.getItem('userName') ? (
                        <div className="message__chats" key={message.id}>
                            <p className="sender__name">You</p>


                            <div className="message__sender">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="message__chats" key={message.id}>


                            <p>{message.name}</p>


                            <div className="message__recipient">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    )
                )}

                <div className="message__status">
                    <p>{typingStatus}</p>
                </div>
            </div>
        </>
    );
};

export default ChatBody;  // Exporting the component as a default export.
