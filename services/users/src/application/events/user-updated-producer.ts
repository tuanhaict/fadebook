import { Exchange, Producer, UserUpdatedEvent } from "@tuanha888.fadebook/common";


export class UserUpdatedProducer extends Producer<UserUpdatedEvent>
{
    exchange: Exchange.UserUpdated = Exchange.UserUpdated;
}