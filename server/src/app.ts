import express from "express";
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import './ros'

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    path: '/mysock',
    cors: {
      origin: 'http://0.0.0.0',
      methods: ['GET', 'POST']
    }
  });
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: 'http://0.0.0.0'
  }));
server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

export { io };