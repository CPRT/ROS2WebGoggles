import ros from 'roslib';

var options = {
    transPortlibrary: 'socket.io',
    // TODO: Change this to the IP address of your ROS robot
    url: 'ws://192.168.2.10:9090' 
}

function connectToRos() {
    const rosNode = new ros.Ros(options);

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
