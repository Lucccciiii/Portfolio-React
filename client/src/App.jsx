// Importing necessary modules from libraries or files in your project
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";  // For routing and navigation links
import './App.css';  // CSS file for styling the App component
import socketIO from 'socket.io-client';  // WebSocket client for connecting to a server
import React from 'react'  // Importing main module for using JSX syntax

// Connecting to a WebSocket server at local host on port 4000
const socket = socketIO.connect('http://localhost:4000');

// Importing components (pages) from different files in your project
import Home from "./Home.jsx";    // Home page component
import ChatPage from "./ChatPage.jsx";  // Chat page component
import Contact from "./Contact.jsx";  // Contact page component
import About from "./About.jsx";   // About page component

function App() {  // Main app component
    return (
        // BrowserRouter is a context wrapper that provides the routing functionality to its children
        <BrowserRouter>
            <div>
                <div>
                    <ul className="text-purple-700 flex-row flex justify-between">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/Contact">Contact</NavLink></li>
                        <li><NavLink to="/About">About</NavLink></li>
                    </ul>

                    <div className="pageContent flex justify-center mt-20">
                        <Routes>
                            <Route path="/" element={<Home socket={socket}/>}></Route>  // Home page route
                            <Route path="/chat" element={<ChatPage socket={socket}/>}></Route>  // Chat page route
                            <Route path="/Contact" element={<Contact socket={socket}/>}></Route>  // Contact page route
                            <Route path="/About" element={<About socket={socket}/>}></Route>  // About page route
                        </Routes>
                    </div>
                </div>
            </div>
            <footer className="bottom-0">
                <ul className="text-blue-600">
                    <li><NavLink to="https://github.com/Lucccciiii">Github</NavLink></li>
                </ul>
            </footer>
        </BrowserRouter>
    )
}

export default App  // Exporting the main app component for use in other files
