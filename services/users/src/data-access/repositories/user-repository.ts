import { UserModelFields, userModel } from './../models/user-model';
import { RepositoryBase } from "./base-repository";
import { introductionModel } from '../models/introduction-model';


class UserRepository extends RepositoryBase<UserModelFields> 
{
    constructor() {
        super(userModel)
    }
    async getUsersByFirstName(firstName: string) : Promise<UserModelFields[] | null> {
        const users = await this.model.findAll({
            where: {
                firstName,
            }
        })
        return users;

    }
    async getUserByEmail(email: string) {
        const user = await this.model.findOne({
            where: {
                email,
            },
            include: {
                model: introductionModel,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'id','userId']
                }
            }
        })
        return user;
    }
    async getUser(userId: string) {
        const user = await this.model.findOne({
            where: {
                id: userId,
            },
            include: {
                model: introductionModel,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'id','userId']
                }
            }
        })
        return user;
    }
}

export const userRepository = new UserRepository();