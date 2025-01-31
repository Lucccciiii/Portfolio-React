import React, {useState, useEffect} from 'react';

const ChatBar = ({socket}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Listen for new user response
        socket.on('newUserResponse', (data) => {
            setUsers(data);
        });

        // Listen for refreshed users list
        socket.on('refreshUsers', (data) => {
            setUsers(data);
        });

        // Cleanup on unmount
        return () => {
            socket.off('newUserResponse');
            socket.off('refreshUsers');
        };
    }, [socket]);

    return (
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

export default ChatBar;