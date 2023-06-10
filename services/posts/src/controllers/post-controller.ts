import { NextFunction, Request, Response } from "express";
import { postService } from "../application/services/post-service";
import { PostCreateDto, PostResponseDto, PostUpdateDto } from "../application/dtos/dtos";


export const postController = {
    getPosts: async (req: Request, res: Response, next: NextFunction) => {
        let posts: PostResponseDto[];
        if (req.query.userId) {
            const {userId} = req.query;
            posts = await postService.getPostsFromUser(userId as string);
        }
        else posts = await postService.getPosts(req.currentUser!.userId);        
        return res.status(200).send(posts);
    },
    getPostsOfFriends: async (req: Request, res: Response, next: NextFunction ) => {
        const {friendsId} = req.body;
        if (friendsId.length ===0) return res.status(400).send({msg: "Bad Request!"});
        if (friendsId.length ===1) {
            let returnPosts = await postService.getPostsFromUser(friendsId[0]);
            return res.status(200).send(returnPosts);
        }
        const posts = await postService.getPostsOfFriends(friendsId);
        return res.status(200).send(posts);
    },
    createPost: async (req: any, res: Response, next: NextFunction) => {
        const userId = req.currentUser!.userId;
        const post = req.body as PostCreateDto;
        console.log(req.file);
        if (req.file?.path) post.image = req.file.path;
        const newPost = await postService.createPost(userId, post );
        return res.status(201).send(newPost);

    },
    getPost: async (req: Request, res: Response, next: NextFunction) => {
        const {postId} = req.params;
        const post = await postService.getPost(postId);
        return res.status(200).send(post); 
    },
    deletePost: async (req: Request, res: Response, next: NextFunction) => {
        const {postId} = req.params;
        await postService.deletePost(postId);
        return res.status(200).send({msg: "Delete post successfully!"}); 
    },
    updatePost: async (req: Request, res: Response, next: NextFunction) => {
        const {postId} = req.params;
        const post = req.body as PostUpdateDto;
        await postService.updatePost(postId, post);
        return res.status(200).send({msg: "Update post successfully!"}); 
    },
    toggleLikePost: async (req: Request, res: Response, next: NextFunction) => {
        const {postId} = req.params;
        await postService.toggleLikePost(req.currentUser!.userId, postId);
        return res.status(201).send({msg: "Toogle like successfully!"});
    },
    getLikedPosts: async (req: Request, res: Response, next: NextFunction) => {
        console.log("hello")
        const posts = await postService.getLikedPosts(req.currentUser!.userId);
        return res.status(200).send(posts);
    },
}