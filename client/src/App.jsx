import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import socketIO from 'socket.io-client';
import React from 'react'

const socket = socketIO.connect('http://localhost:4000');
import Home from "./Home.jsx";
import ChatPage from "./ChatPage.jsx";

function App() {

    return (
        <BrowserRouter>
            <div>
                <div>
                    <ul className="text-purple-700 flex-row flex justify-between">
                        <li><a href="/">Home</a></li>
                        <li><a href="/Contact">Contact</a></li>
                        <li><a href="/Cv">Cv</a></li>
                        <li><a href="/About">About</a></li>
                    </ul>
                </div>
                <Routes>
                    <Route path="/" element={<Home socket={socket}/>}></Route>
                    <Route path="/chat" element={<ChatPage socket={socket}/>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
