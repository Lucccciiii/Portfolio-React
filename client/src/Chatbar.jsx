import React, {useState, useEffect} from 'react';  // Import required libraries

const ChatBar = ({socket}) => {   // Define a functional component named `ChatBar` that takes a socket object as its prop
    const [users, setUsers] = useState([]);  // Initialize an empty array to store user data using the useState hook

    useEffect(() => {   // Use the useEffect hook to listen for new users and refreshed users list after initial render
        // Listen for new user response from server
        socket.on('newUserResponse', (data) => {
            setUsers(data);  // Update state with data received from server
        });

        // Listen for refreshed users list from server
        socket.on('refreshUsers', (data) => {
            setUsers(data);  // Update state with data received from server
        });

        // Cleanup function to remove event listeners on component unmount
        return () => {
            socket.off('newUserResponse');  // Remove the listener for new user response when component unmounts
            socket.off('refreshUsers');  // Remove the listener for refreshed users list when component unmounts
        };
    }, [socket]);  // Dependency array, update effect on changes to 'socket' prop

    return (   // Return JSX that renders a div with active user information
        <div className="chat__sidebar">
            <h4 className="chat__header">ACTIVE USERS</h4>
            <div className="text-purple-700 flex flex-col space-evenly">
                {users.map((user) => (
                    <p key={user.socketID}>{user.userName}</p>
                ))}
            </div>
        </div>
    );
};

export default ChatBar;  // Export the component as a default export
