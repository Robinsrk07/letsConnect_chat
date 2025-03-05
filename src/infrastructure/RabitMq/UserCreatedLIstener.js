const amqp = require('amqplib');

class StartConsumer {
    constructor(userCreatedCase) {
        this.connection = null;
        this.channel = null;
        this.queue = "user_created";
        this.userCreatedCase = userCreatedCase;
    }

    async connect() {
        this.connection = await amqp.connect('amqp://localhost');
        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue(this.queue, { durable: true });
    }

    async listen() {
        await this.channel.consume(this.queue, async (message) => {
            console.log("from consumer",message)
            if (message !== null) {
                try {
                    const content = JSON.parse(message.content.toString());
                    console.log("content",content)
                    await this.userCreatedCase.execute(content);
                    this.channel.ack(message);
                } catch (err) {
                    console.error("Error processing message:", err);
                    this.channel.nack(message, false, false);
                }
            }
        }); 
}}

module.exports = StartConsumer