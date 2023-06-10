import { BadRequestError } from '@tuanha888.fadebook/common';
import { NextFunction, Request, Response } from "express";
import { postRepository } from "../data-access/repositories/post-repository";


export const postAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    const {postId} = req.params;
    const post = await postRepository.getById(req.params.postId);
    if (!post) {
        console.error(`Post with id: ${postId} doesn't exist`);
        throw new BadRequestError(`Post with id: ${postId} doesn't exist`);
    }
    if (post.userId !== req.currentUser!.userId) {
        console.error(`User with id: ${req.currentUser!.userId} doesn't own this post with id: ${postId}`);
        throw new BadRequestError('You do not have permissions to do this');
    }
    next();
}