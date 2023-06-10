import { Consumer, Exchange,UserUpdatedEvent } from "@tuanha888.fadebook/common";
import { UserRecord } from "../../data-access/records/user-record";
import { userRepository } from "../../data-access/repositories/user-repository";
import { queueNameUserUpdated } from "./queue-name";



export class UserUpdatedConsumer extends Consumer<UserUpdatedEvent> {
    exchange: Exchange.UserUpdated = Exchange.UserUpdated;
    queue = queueNameUserUpdated
    onMessage = async (data: UserUpdatedEvent['data']) => {
        try {
            const user = data;
            console.log("update");
            await userRepository.updateById(user.id, user);
            console.log("Receive user updated event and update user successfully!");
            
        } catch (error) {
            console.log(error);
        }
    }
}