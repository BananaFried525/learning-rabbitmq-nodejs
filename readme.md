# Learning RabbitMQ with Node.js

This repository provides an example of using RabbitMQ with Node.js for communication between producers and consumers. The code demonstrates how to set up a RabbitMQ server using Docker Compose and includes a producer and consumer implementation.

## Prerequisites

- Docker
- Node.js

## Getting Started

1. Clone this repository: 
  git clone

2. Navigate to the project directory: 
  cd learning-rabbitmq-nodejs

3. Install the dependencies: 
  npm install

4. Start the RabbitMQ server using Docker Compose: 
  docker-compose up --build -d

5. Run the producer: 
  npm run producer

This will send 20 messages to the RabbitMQ server.

6. Run the consumer:
  npm run consumer


The consumer will consume the messages from the RabbitMQ server and insert them into a MySQL database.

## Docker Compose Configuration

The `docker-compose.yaml` file in the project directory provides the configuration for the Docker Compose setup. It includes two services: `rabbitmq` and `mysql`. The `rabbitmq` service uses the `rabbitmq:3-management-alpine` image and exposes ports 5672 and 15672 for communication. The `mysql` service uses the `mysql:latest` image and exposes port 3306 for communication.

To customize the environment variables for the RabbitMQ and MySQL services, modify the `environment` section in the `docker-compose.yaml` file.

## Producer

The producer is implemented in the `producer.js` file. It uses the `amqplib` library to connect to the RabbitMQ server and sends messages to the `logger` queue. Each message contains information about the logger, such as the logger ID, level, logger name, message, and timestamp.

## Consumer

The consumer is implemented in the `consumer.js` file. It uses the `amqplib` library to connect to the RabbitMQ server and consumes messages from the `logger` queue. Each consumed message is parsed and inserted into a MySQL database table named "logger". The MySQL connection details are configured in the `dbConn` object.

## Conclusion

This repository provides a basic example of using RabbitMQ with Node.js for message queueing. By following the steps outlined in this README, you can set up a RabbitMQ server, send messages from a producer to a queue, and consume messages from the queue using a consumer. The consumed messages are then inserted into a MySQL database.

