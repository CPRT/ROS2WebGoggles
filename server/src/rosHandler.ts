import ROSLIB from "roslib";
import { Server } from "socket.io";
export class RosHandler {
    
    private readonly options = {   
        url: `ws://host.docker.internal:9090`,
        tranPortLibrary: 'socket.io'
    }
    private ros!: ROSLIB.Ros;
    private topicList!: ROSLIB.Topic[];

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

    public getTopics(): void {
        this.ros.getTopics((topics) => {
            console.log('Topics:', topics);
        });
    }

    public subToTopic(topicName: string, messageType: string, io : Server): any {
        const topic = new ROSLIB.Topic({
            ros: this.ros,
            name: topicName,
            messageType: messageType
        });
        topic.subscribe((message) => {
            io.emit('rosMsg', message);
        });
    }
}
