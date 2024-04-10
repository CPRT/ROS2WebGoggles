import { Server } from './src/app';
import { RosHandler } from './src/rosHandler';

const server = new Server();
const rosHandler = new RosHandler();

server.listen(port => {
    console.log(`Server is listening on ${port}`);
});

rosHandler.subAndEmit('/chatter', 'std_msgs/String', server.getIO());