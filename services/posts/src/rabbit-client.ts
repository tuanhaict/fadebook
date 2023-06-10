import { BadRequestError } from "@tuanha888.fadebook/common";
import amqplib, { Connection } from "amqplib";


export class RabbitClient 
{
    private _connection?: Connection;
    async connect() {
        const rabbit_user = process.env.RABBITMQ_DEFAULT_USER;
        const rabbit_password = process.env.RABBITMQ_DEFAULT_PASSWORD;
        const rabbit_service = process.env.RABBITMQ_SERVICE;
        this._connection = await amqplib.connect(`amqp://${rabbit_user}:${rabbit_password}@${rabbit_service}:5672`);
    }
    get connection(){
        if (!this._connection) {
            throw new BadRequestError("Can not access to RabbitMQ before connecting");
        }
        return this._connection;
    }
}

export const rabbitClient = new RabbitClient();