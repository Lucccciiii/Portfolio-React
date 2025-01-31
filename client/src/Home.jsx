// Importing necessary modules from libraries or files in your project
import React, {useState} from 'react';   // Main React module and hook for state management
import {useNavigate} from 'react-router-dom';  // Hook for programmatically changing routes (navigation)

const Home = ({socket}) => {    // Home component takes socket as a prop
    const navigate = useNavigate();   // Hook to get access to the history object inside of your function components that allows you to manipulate the current history stack, navigate programmatically and redirect users.

    // State hook for userName with initial value set to empty string
    const [userName, setUserName] = useState('');

    // Function to handle form submission event
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevents the default action of the event from happening

        localStorage.setItem('userName', userName);  // Stores username in browser's local storage

        // Emits a newUser event to Node.js server with current username and socket id
        socket.emit('newUser', {userName, socketID: socket.id});

        navigate('/chat');  // Navigates to the chat page after form submission
    };

    return (
        <div className="text-purple-600">
            <h2 className="flex justify-center mt-20">This is the Homepage of this website</h2>


            <form className="home__container text-purple-600" onSubmit={handleSubmit}>
                <h2 className="home__header text-purple-600">Sign in to Open Chat</h2>

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    minLength={6}
                    name="username"
                    id="username"
                    className="username__input"
                    value={userName}

                    onChange={(e) => setUserName(e.target.value)}
                />

                <button className="home__cta">SIGN IN</button>
            </form>
        </div>
    );
};

export default Home;  // Exporting the component as a default export.
