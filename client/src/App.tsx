import React, { useState, useEffect } from "react";
import "./App.css";

// Update the ENDPOINT to point to the NGINX server

function App() {
  const [response, setResponse] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    var io = require('socket.io-client');
    const socket = io('http://192.168.2.10', {
      path: '/mysock'
    });
    socket.on("rosMsg", (data: React.SetStateAction<any>) => {
      setResponse(data);
    });

    // Clean up socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);
  
  const elements = Object.entries(response).map(([key, value]) => <div key={key}>{`${key}: ${value}`}</div>);

  return (
    <div className="App">
      <header className="App-header">
        <div>Current ROS msg: {elements} </div>
      </header>
      <h2>Available topics</h2>
      <ul>
      {topics.map((item: any) => (
        <li key={item.id}>{item.name}</li>
      ))}
      </ul>
    </div>
  );
}

export default App;