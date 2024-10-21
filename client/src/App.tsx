import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import socketIO from "socket.io-client";
import { Socket } from "dgram";

const WS = "http://localhost:8080";

function App() {
  useEffect(() => {
    socketIO(WS);
  }, []);
  return (
    <div className="App">
      <button>Start New Meeting</button>
    </div>
  );
}

export default App;
