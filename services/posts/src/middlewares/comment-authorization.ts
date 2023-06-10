import { NextFunction, Request, Response } from "express";
import { commentRepository } from "../data-access/repositories/comment-repository";
import { BadRequestError, NotAuthorizeError } from "@tuanha888.fadebook/common";


export const commentAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    const {commentId} = req.params;
    const comment = await commentRepository.getById(commentId);
    if (!comment) {
        throw new BadRequestError(`Comment with id: ${commentId} does not exist`);
    }
    if (comment.userId !== req.currentUser!.userId) {
        throw new NotAuthorizeError("You don't have permissions to do this!");
    }
    next();
}