const amqplib = require('amqplib');

let channel;

async function connectRabbitMQ() {

    try {
        const connection = await amqplib.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel()
        await channel.assertExchange("order-events", "topic", {
            durable: true
        })
    } catch (error) {
        console.error("Failed to connect to RabbitMQ", error);
        process.exit(1);
    }
}

function getChannel() {
    if (!channel) {
        throw new Error("RabbitMQ channel is not established. Call connectRabbitMQ first.");
    }
    return channel
}

module.exports = {
    connectRabbitMQ,
    getChannel
}