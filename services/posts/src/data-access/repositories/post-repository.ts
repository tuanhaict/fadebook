import { QueryTypes } from "sequelize";
import { getDbConnection } from "../../dbConnection";
import { commentModel } from "../models/comment-model";
import { PostModelFields, postModel } from "../models/post-model";
import { RepositoryBase } from "./base-repository";



class PostRepository extends RepositoryBase<PostModelFields>
{
    constructor() {
        super(postModel);
    }
    async getPostsFromUser(userId: string) {
        const posts = await getDbConnection().query(`
            SELECT p.id, p.caption, p.image, p.userId, u.firstName, u.lastName, u.avatar, 
            COUNT(DISTINCT c.id) AS comments, 
            COUNT(DISTINCT r.id) as likes 
            FROM posts AS p
            LEFT JOIN reactions as r
            ON r.postId = p.id
            LEFT JOIN comments as c
            ON c.postId = p.id
            INNER JOIN users as u
            ON p.userId = u.id
            WHERE p.userId = "${userId}"
            GROUP BY p.id;
        `,{
            type: QueryTypes.SELECT
        })
        return posts;
    }
    
    async getPost(postId: string) {
        const post = await getDbConnection().query(`
            SELECT p.id, p.caption, p.image, p.userId, u.firstName, u.lastName, u.avatar, 
            COUNT(DISTINCT c.id) AS comments, 
            COUNT(DISTINCT r.id) AS likes
            FROM posts as p
            LEFT JOIN reactions as r
            ON r.postId = p.id
            LEFT JOIN comments as c
            ON c.postId = p.id
            INNER JOIN users as u
            ON p.userId = u.id
            WHERE p.id = "${postId}"
        `, {
            type: QueryTypes.SELECT
        })
        return post[0];
    }
    async getMultiplePosts(id: string[]) {
        const ids = id.map(item => `"${item}"`);
        const userIds = ids.join(',')
        console.log(userIds);
        const posts = await getDbConnection().query(`
            SELECT p.id, p.caption, p.image, p.userId, u.firstName, u.lastName, u.avatar, 
            COUNT(DISTINCT c.id) AS comments, 
            COUNT(DISTINCT r.id) as likes
            FROM posts as p
            LEFT JOIN reactions as r
            ON r.postId = p.id
            LEFT JOIN comments as c
            ON c.postId = p.id
            INNER JOIN users as u
            ON p.userId = u.id
            WHERE p.userId IN (${userIds})
            GROUP BY p.id;
        `,{
            type: QueryTypes.SELECT
        })
        return posts;
    }
    async getPosts(userId: string) {
        const posts = await getDbConnection().query(`
            SELECT p.id, p.caption, p.image, p.userId, u.firstName, u.lastName, u.avatar, 
            COUNT(DISTINCT c.id) AS comments, 
            COUNT(DISTINCT r.id) as likes
            FROM posts as p
            LEFT JOIN reactions as r
            ON r.postId = p.id
            LEFT JOIN comments as c
            on c.postId = p.id
            INNER JOIN users as u
            on p.userId = u.id
            WHERE p.userId <> "${userId}"
            GROUP BY p.id
            LIMIT 10
            ;
        `, {
            type: QueryTypes.SELECT
        })
        return posts;
    }
    
}

export const postRepository = new PostRepository();