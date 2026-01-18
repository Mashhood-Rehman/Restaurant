const amqplib = require('amqplib');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

async function consume() {
    try {
        const connection = await amqplib.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        const exchange = "order-events";
        const queue = "order-debug-queue";

        await channel.assertExchange(exchange, "topic", { durable: true });
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, "order.created");

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const content = JSON.parse(msg.content.toString());
                channel.ack(msg);
            }
        });

        process.on('SIGINT', async () => {
            await channel.close();
            await connection.close();
            process.exit(0);
        });
    } catch (error) {
        console.error("❌ Debug Consumer Error:", error);
    }
}

consume();
