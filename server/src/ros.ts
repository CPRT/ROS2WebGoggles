import ros from 'roslib';
const ROS_SERVER_IP = process.env.ROS_SERVER_IP;
const ROS_SERVER_URL = `ws://${ROS_SERVER_IP}:9090`;
function connectToRos() {
    const rosNode = new ros.Ros({
        url: ROS_SERVER_URL,
    });

    rosNode.on('connection', () => {
        console.log('Connected to ROS web server at', ROS_SERVER_URL );
    });

    rosNode.on('error', (error) => {
        console.error('Error connecting to ROS', error);
        console.log('Retrying in 5 seconds...');
        setTimeout(() => connectToRos(), 5000);
    });

    rosNode.on('close', () => {
        console.log('Disconnected from ROS');
    });

    function subscribeToTopic(topicName: string) {
        const listener = new ros.Topic({
            ros: rosNode,
            name: topicName,
            messageType: 'std_msgs/String',
        });

        listener.subscribe((message) => {
            console.log(`Received message on ${topicName}: ${(message as any).data}`);
        });
    }
    subscribeToTopic('/chatter');
}

connectToRos();
