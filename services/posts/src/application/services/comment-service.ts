import { UserRecord } from "../../data-access/records/user-record";
import { commentRepository } from "../../data-access/repositories/comment-repository";
import { userRepository } from "../../data-access/repositories/user-repository";
import { CommentCreateDto, CommentUpdateDto } from "../dtos/dtos";
import { map_CommentCreateDto_To_Comment, map_Comment_To_CommentResponseDto } from "../mapper/mapper";



export const commentService = {
    getCommentsOfPost: async (postId: string) => {
        const comments = await commentRepository.getCommentsOfPost(postId);
        const returnComments = comments.map(comment => map_Comment_To_CommentResponseDto(comment));
        return returnComments;

    },
    createComment: async (userId: string, postId: string, comment: CommentCreateDto) => {
        const newComment = map_CommentCreateDto_To_Comment(userId, postId, comment);
        const savedComment = await commentRepository.add(newComment);
        const user = await userRepository.getUserForDisplay(userId);
        const returnComment = map_Comment_To_CommentResponseDto(savedComment);
        returnComment.user = user as UserRecord;
        return returnComment;
    },
    updateComment: async (commentId: string, comment: CommentUpdateDto ) => {
        await commentRepository.updateById(commentId, comment);
    },
    deleteComment: async (commentId: string) => {
        await commentRepository.deleteById(commentId);
    }
}