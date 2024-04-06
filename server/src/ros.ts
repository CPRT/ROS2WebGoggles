import ros from 'roslib';
function connectToRos() {
    const rosNode = new ros.Ros({
        url: "ws://localhost:9090"
    });

    rosNode.on('connection', () => {
        console.log('Connected to ROS web server');
    });

    rosNode.on('error', (error) => {
        console.error('Error connecting to ROS', error);
        console.log('Retrying in 5 seconds...');
        setTimeout(() => connectToRos(), 5000);
    });

    rosNode.on('close', () => {
        console.log('Disconnected from ROS');
    });

}

connectToRos();
