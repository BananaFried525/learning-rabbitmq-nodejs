const amqp = require('amqplib')
const { v4: uuid4 } = require('uuid')

/**
 * Sends a message to the queue.
 *
 * @param {string} message - The message to be sent.
 * @return {Promise<void>} - A promise that resolves when the message is sent successfully.
 */
const sendQueue = async (payload) => {
  try {
    const queue = 'logger';
    const connection = await amqp.connect({
      protocol: 'amqp',
      hostname: 'localhost',
      port: 5672,
      username: 'admin',
      password: 'admin',
    });
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });

    const stringPayload = JSON.stringify(payload);
    const bufferPayload = Buffer.from(stringPayload);
    channel.sendToQueue(queue, bufferPayload, { persistent: true });

    setTimeout(() => {
      connection.close();
    }, 300);

  } catch (error) {
    console.error(error);
  }
};

for (let i = 0; i < 20; i++) {
  sendQueue({
    logger_id: uuid4(),
    level: 'info',
    logger: 'app',
    message: 'Hello World!',
    timestamp: new Date().toISOString(),
  })
}