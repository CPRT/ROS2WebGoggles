import { Server } from "./src/app";
import { RosHandler } from "./src/rosHandler";

const server = new Server();
const rosHandler = new RosHandler();
rosHandler.getTopics(); // Just to check if topics are being fetched

server.listen((port) => {
  console.log(`Server is listening on ${port}`);
});

rosHandler.subToTopic('/gnss1/fix', 'sensor_msgs/msg/NavSatFix', server.getIO());