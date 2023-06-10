import { UserModelFields, userModel } from "../models/user-model";
import { RepositoryBase } from "./base-repository";




class UserRepository extends RepositoryBase<UserModelFields> {
    constructor() {
        super(userModel);
    }
    async getUserForDisplay(userId: string) {
        return await this.model.findOne({
            where: {
                id: userId
            },
            attributes: ["firstName", "lastName", "avatar"]
        })
    }
}

export const userRepository = new UserRepository();