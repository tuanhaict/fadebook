import { CommentRecord } from "../../data-access/records/comment-record";
import { CommentCreateDto, CommentResponseDto, PostCreateDto, PostResponseDto,PostUpdateDto } from "../dtos/dtos";
import {v4 as uuidv4} from 'uuid'


export const map_Post_To_PostResponseDto = (post: any) => {
    return {
        id: post.id,
        userId: post.userId,
        caption: post.caption,
        image: post.image,
        comments: post.comments,
        likes: post.likes,
        user: {
            firstName: post.firstName,
            lastName: post.lastName,
            avatar: post.avatar,
        }
    };
}
export const map_PostCreateDto_To_Post = (userId: string,post: PostCreateDto) => {
    return {
        userId,
        id: uuidv4(),
        ...post
    }
}

export const map_Comment_To_CommentResponseDto = (comment: any) : CommentResponseDto => {
    return {
        id: comment.id,
        postId: comment.postId,
        userId: comment.userId,
        content: comment.content,
        user: {
            firstName: comment.firstName,
            lastName: comment.lastName,
            avatar: comment.avatar
        }
    }
}
export const map_CommentCreateDto_To_Comment = (userId: string, postId: string,comment: CommentCreateDto) : CommentRecord => {
    return {
        id: uuidv4(),
        userId,
        postId,
        ...comment
    }
}