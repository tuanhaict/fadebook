import { Consumer, Exchange, UserUpdatedEvent } from "@tuanha888.fadebook/common";
import { userRepository } from "../../data-access/repositories/user-repository";
import { queueNameUserUpdated } from "./queue-name";



export class UserUpdatedConsumer extends Consumer<UserUpdatedEvent> {
    exchange: Exchange.UserUpdated = Exchange.UserUpdated;
    queue= queueNameUserUpdated;
    onMessage= async (data: UserUpdatedEvent['data']) => {
        try {
            const user = data;
            console.log("Update");
            await userRepository.updateById(user.id, user);
            
        } catch (error) {
            console.log(error);
        }
    }
}