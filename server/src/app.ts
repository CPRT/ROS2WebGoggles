import express from "express";
import http from 'http';
import { Server } from 'socket.io';
import { topicArray } from './rosHandler';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    path: '/mysock',
  });
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get('/api/topics', (req, res) => {
    res.send(topicArray);
}); 

export { io };
export default app;