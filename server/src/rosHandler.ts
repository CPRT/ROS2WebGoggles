/* Underlying core for the subscriber system for the rosweb2 app */


import ROSLIB, { Message } from 'roslib';
import { io } from './app';

var options = {
    transPortlibrary: 'socket.io',
    url: `ws://host.docker.internal:9090` 
}

const ros = new ROSLIB.Ros(options);
ros.on('connection', () =>{
    console.log('Connected!');
});
ros.on('error', (error) =>{
    console.error('Uh oh, error connecting:', error);
    console.log('Tried to connect to:', options.url, "but failed");
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

var topicArray : string[] = [];
// Get all topics available
ros.getTopics((topics) => {
    console.log("Here are all the topics available!", topics);
    topicArray = topics;
});

export {topicArray};