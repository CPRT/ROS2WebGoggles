import React, { useState, useEffect } from "react";
import "./App.css";

// Update the ENDPOINT to point to the NGINX server

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    var io = require('socket.io-client');
    const socket = io('http://192.168.2.10', {
      path: '/mysock'
    });
    socket.on("rosMsg", (data: React.SetStateAction<string>) => {
      setResponse(data);
    });

    // Clean up socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Current ROS msg: {response}
      </header>
    </div>
  );
}

export default App;