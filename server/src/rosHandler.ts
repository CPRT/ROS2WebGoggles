/* Underlying core for the subscriber system for the rosweb2 app */


import ROSLIB, { Message } from 'roslib';
import { io } from './app';
 

var options = {
    transPortlibrary: 'socket.io',
    url: 'ws://192.168.2.10:9090' 
}

const ros = new ROSLIB.Ros(options);
ros.on('connection', () =>{
    console.log('Connected!');
});
ros.on('error', (error) =>{
    console.error('Uh oh, error!', error);
});
ros.on('close', () =>{
    console.log('Connection to node closed!');
});


function subToTopic(topicName: string, msgType: string){
    const topic = new ROSLIB.Topic({
        ros: ros,
        name: topicName,
        messageType: msgType
    });

    topic.subscribe((message) =>{
        io.emit("rosMsg", (message as any).data);
    });
};

var topicArray: string[] = [];
ros.getTopics((topics: string[]) => {
    topicArray = topics;
    console.log("here are all the topics available!", topicArray);
});


subToTopic('/chatter', '/std_msgs/String');