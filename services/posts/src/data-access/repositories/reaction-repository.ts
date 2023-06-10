import { ReactionModelFields, reactionModel } from "../models/reaction-model";
import { RepositoryBase } from "./base-repository";




class ReactionRepository extends RepositoryBase<ReactionModelFields> 
{
    constructor() {
        super(reactionModel);
    }
    async unlikePost(userId: string, postId: string) {
        await this.model.destroy({
            where: {
                userId,
                postId
            }
        })
    }
    async getLikedPosts(userId: string) {
        const posts= await this.model.findAll({
            where: {
                userId,
            },
            attributes: ["postId"]
        })
        return posts.map(post => post.postId);
    }
    async checkLike(userId: string, postId: string) {
        return await this.model.findOne({
            where: {
                userId,
                postId,
            }
        })
    }
}
export const reactionRepository = new ReactionRepository();