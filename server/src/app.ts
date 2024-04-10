import express from "express";
import http from 'http';
import socketIO, { Server as SocketIOServer } from "socket.io";

export class Server {
    private httpServer!: http.Server;
    private app!: express.Application;
    private io!: SocketIOServer;

    private readonly DEFAULT_PORT = 3001;

    constructor() {
        this.initialize();
        this.handleSocketConnection();
    }

    private initialize(): void {
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.io = new SocketIOServer(this.httpServer, {
            path: '/mysock'
        });
    }

    private handleSocketConnection(): void {
        this.io.on('connection', socket => {
            console.log('Socket connected.');
        });
    }

    public listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.DEFAULT_PORT, () =>
          callback(this.DEFAULT_PORT)
        );
    }

    public getIO(): SocketIOServer {
        return this.io;
    }
    
}