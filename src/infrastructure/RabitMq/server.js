const amqp = require('amqplib');

const IMessageBroker = require("../../application/interface/IMessageBroker")
class messageBroker extends IMessageBroker{
    constructor(){
        super()
        this.connection = null;
        this.channel = null;
    }

    async connect() {
      this.connection = await amqp.connect('amqp://localhost')
      this.channel = await  this.connection.createChannel()
    }
    
    async publish (queue,message){
        if(!this.channel){
            await this.connect();
        }
        await this.channel.assertQueue(queue, { durable: true });

        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

       }
}
module.exports = messageBroker
 