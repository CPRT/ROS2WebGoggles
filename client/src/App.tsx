import React, { useState, useEffect } from "react";
import "./App.css";

// Update the ENDPOINT to point to the NGINX server

function App() {
  const [response, setResponse] = useState("");
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    var io = require('socket.io-client');
    const socket = io('http://192.168.55.1', {
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

  useEffect(() => {
    fetch("http://192.168.55.1/api/topics")
      .then((res) => res.json())
      .then((data) => setTopics(data.topics.map((topic: string) => ({ id: topic, name: topic }))));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Current ROS msg: {response}
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