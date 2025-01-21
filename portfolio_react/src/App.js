// eslint-disable-next-line
import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes, NavLink} from "react-router-dom";

import "./index.css"

import Home from "./Home"
import About from "./About"
import Contact from "./Contact"

function App() {
    return (
        <Router>
            <div className="App bg-black min-h-screen text-purple-600">
                <h1 className="flex justify-center">A Simple SPA made using React</h1>
                <ul className="flex flex-row justify-evenly text-blue-600 ">
                    <li><NavLink to="/" exact>Home</NavLink></li>
                    <li><NavLink to="/about" exact>About</NavLink></li>
                    <li><NavLink to="/contact" exact>Contact</NavLink></li>
                    <li><NavLink to="/connect-four" exact>Connect-Four</NavLink></li>
                </ul>
                <div className="pageContent flex justify-center mt-10">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="/connect-four" element={<ConnectFour/>}/>
                    </Routes>
                </div>
                <footer className="bottom-0">
                    <ul className="text-blue-600">
                        <li><NavLink to="https://github.com/Lucccciiii">Github</NavLink></li>
                    </ul>
                </footer>
            </div>
        </Router>
    );
}

export default App;
