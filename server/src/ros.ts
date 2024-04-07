/* Underlying core for the subscriber system for the rosweb2 app */


import ROSLIB, { Message } from 'roslib';
import { io } from './app';
 

var options = {
    transPortlibrary: 'socket.io',
    // TODO: Change this to the IP address of your ROS robot
    url: 'ws://192.168.2.10:9090' 
}

class RosNode {
    private ros: ROSLIB.Ros;
    private topic!: ROSLIB.Topic;

    constructor() {
        this.ros = new ROSLIB.Ros(options);
        this.connect();
    };

    connect() {
        this.ros.on(('connection'), () => {
            console.log('Connect to ROS websocket server!')
        });
        
        this.ros.on('error', (error) =>{
            console.log('Error connecting to ROS websocket server:', error);
        });

        this.ros.on('close', () => {
            console.log('ROS websocket server connection closed');
        });
    }

    subscribeToTopic(topicName: string, msgType: string){
        this.topic = new ROSLIB.Topic({
            ros: this.ros,
            name: topicName,
            messageType: msgType
        })
        
        this.topic.subscribe((message) => {
            console.log('Received messsage from ROS websocket server:', message)
            io.emit("rosMsg", JSON.stringify(message));
        })


    }
    
}

// Example for /chatter topic
const rosNode = new RosNode;
rosNode.subscribeToTopic('/chatter', '/std_msgs/String');