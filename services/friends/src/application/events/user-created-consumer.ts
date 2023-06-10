import { Consumer, Exchange, UserCreatedEvent } from "@tuanha888.fadebook/common";
import { UserRecord } from "../../data-access/records/user-record";
import { userRepository } from "../../data-access/repositories/user-repository";
import { queueNameUserCreated } from "./queue-name";


export class UserCreatedConsumer extends Consumer<UserCreatedEvent> {
    exchange: Exchange.UserCreated= Exchange.UserCreated;
    queue = queueNameUserCreated;
    onMessage = async (data: UserCreatedEvent['data']) => {
        try {
            console.log("Receive user created event and create successfully");
            
            const user = data as UserRecord;
            await userRepository.add(user);
        } catch (error) {
            console.log(error);
        }
    }
}