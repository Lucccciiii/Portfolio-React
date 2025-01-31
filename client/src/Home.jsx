import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Home = ({socket}) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userName', userName);
        // Sends the username and socket ID to the Node.js server
        socket.emit('newUser', {userName, socketID: socket.id});
        navigate('/chat');
    };
    return (
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
    );
};


export default Home;