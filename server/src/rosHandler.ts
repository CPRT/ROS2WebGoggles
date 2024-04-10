import ROSLIB from "roslib";
import { Server, Socket } from "socket.io";

export class RosHandler {
    
    private readonly options = {   
        url: `ws://host.docker.internal:9090`,
        tranPortLibrary: 'socket.io'
    }
    private ros!: ROSLIB.Ros;

    constructor(){
        this.initialize();
    }

    initialize() {
        this.ros = new ROSLIB.Ros(this.options);
        this.ros.on('connection', () => {
            console.log('Connected!');
        });
        this.ros.on('error', (error) => {
            console.error('Uh oh, error connecting:', error);
            console.log('Tried to connect to:', this.options.url, "but failed");
        });
        this.ros.on('close', () => {
            console.log('Connection to node closed!');
        });
    }

    public subAndEmit(topicName: string, msgType: string, io: Server){
        const topic = new ROSLIB.Topic({
            ros: this.ros,
            name: topicName,
            messageType: msgType
        });

        topic.subscribe((message) => {
            io.emit("rosMsg", (message as any).data);
        });
    }

}
