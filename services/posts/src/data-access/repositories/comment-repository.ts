import { QueryTypes } from "sequelize";
import { getDbConnection } from "../../dbConnection";
import { CommentModelFields, commentModel } from "../models/comment-model";
import { RepositoryBase } from "./base-repository";




class CommentRepository extends RepositoryBase<CommentModelFields>
{
    constructor(){
        super(commentModel)
    }
    async getCommentsOfPost(postId: string) {
        const comments = await getDbConnection().query(`
            SELECT c.id, c.content, c.userId, c.postId, u.firstName, u.lastName, u.avatar
            FROM comments as c
            INNER JOIN users as u
            ON c.userId = u.id
            WHERE c.postId = "${postId}";
        `, {
            type: QueryTypes.SELECT
        })
        return comments;
    }
}

export const commentRepository = new CommentRepository();