import { NextFunction, Request, Response } from "express";
import { commentService } from "../application/services/comment-service";
import { CommentCreateDto, CommentUpdateDto } from "../application/dtos/dtos";


export const commentController = {
    getCommentsOfPost: async (req: Request, res: Response, next: NextFunction) => {
        const {postId} = req.params;
        const comments = await commentService.getCommentsOfPost(postId);
        return res.status(200).send(comments);
    },
    createComment: async (req: Request, res: Response, next: NextFunction) => {
        const {postId} = req.params;
        const userId = req.currentUser!.userId;
        const comment = req.body as CommentCreateDto
        const newComment = await commentService.createComment(userId, postId, comment);
        return res.status(201).send(newComment);
    },
    updateComment: async (req: Request, res: Response, next: NextFunction) => {
        const {commentId} = req.params;
        const comment = req.body as CommentUpdateDto;
        await commentService.updateComment(commentId, comment);
        return res.status(200).send({msg: "Update comment successfully!"});
    },
    deleteComment: async (req: Request, res: Response, next: NextFunction) => {
        const {commentId} = req.params;
        await commentService.deleteComment(commentId);
        return res.status(200).send({msg: "Delete comment successfully!"});
    },
}