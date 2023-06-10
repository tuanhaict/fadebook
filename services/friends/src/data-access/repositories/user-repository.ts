import { UserModelFields, userModel } from "../models/user-model";
import { RepositoryBase } from "./base-repository";




class UserRepository extends RepositoryBase<UserModelFields> {
    constructor() {
        super(userModel);
    }
}

export const userRepository = new UserRepository();