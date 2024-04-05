# ROS2 WebGoggles-V1

This is a full-stack application built with React and Node.js, fully dockerized for easy deployment and scalability. The client-side of the application was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and is located in the `client` directory. The server-side of the application is written in TypeScript and is located in the `server` directory. The application uses an Nginx reverse proxy for optimized static file serving.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/noodlekid/reactapp.git
   ```

2. Build the Docker images (Only required for the first time)
   ```sh
    docker compose up --build
    ```
    This will build the client and server images and start the application.

3. Access the application
    Through the browser, navigate to the address of the host machine running the server on port 80 (given its on the same network as the client), 
    e.g. `http://192.168.2.10:80`.

## Testing
There are no tests for this application yet.

## Deployment
This application is dockerized and can be deployed on any platform that supports Docker.

