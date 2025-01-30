import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');
import Home from "./Home.jsx";
import ChatPage from "./Chat-Page.jsx";

function App() {

  return (
    <BrowserRouter>
        <div>
            <Routes>
                <Route path="/" element={<Home socket={socket} />}></Route>
                <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
            </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
