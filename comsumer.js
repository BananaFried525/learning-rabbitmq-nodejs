const amqp = require('amqplib')
const mysql = require('mysql2');


const dbConn = mysql.createConnection({
  host: 'localhost',
  database: 'mydatabase',
  user: 'myuser',
  password: 'mypassword',
});

dbConn.connect();

/**
 * Executes a consumer function that connects to a RabbitMQ server,
 * consumes messages from a specified queue, and inserts the consumed
 * messages into a database table named "logger".
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
const consumer = async () => {
  const queueName = 'logger';
  const connection = await amqp.connect({
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'admin',
    password: 'admin',
  });

  const channel = await connection.createChannel();
  await channel.prefetch(1);
  await channel.assertQueue(queueName, { durable: true });

  await channel.consume(queueName, async (msg) => {
    const payload = JSON.parse(msg.content.toString());

    const sql = `
      INSERT INTO logger (logger_id, level, logger, message, timestamp)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      payload.logger_id,
      payload.level,
      payload.logger,
      payload.message,
      new Date(payload.timestamp),
    ];

    await delay(3000);

    try {
      const result = dbConn.query(sql, values);
      console.log("1 record inserted");
    } catch (err) {
      throw err;
    }

    channel.ack(msg);
  });
};

const delay = (time) => {
  // Create a promise that resolves after 1000 milliseconds
  const promise = new Promise((resolve) => {
    setTimeout(resolve, time);
  });

  // Return the promise
  return promise;
};

consumer()