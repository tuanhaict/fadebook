import { Exchange, Producer, UserCreatedEvent } from "@tuanha888.fadebook/common";



export class UserCreatedProducer extends Producer<UserCreatedEvent>
{
    exchange: Exchange.UserCreated = Exchange.UserCreated;
}