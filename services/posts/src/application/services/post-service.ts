import { BadRequestError } from "@tuanha888.fadebook/common";
import { postRepository } from "../../data-access/repositories/post-repository"
import { map_PostCreateDto_To_Post, map_Post_To_PostResponseDto, } from "../mapper/mapper";
import { PostCreateDto, PostResponseDto, PostUpdateDto } from "../dtos/dtos";
import { reactionRepository } from "../../data-access/repositories/reaction-repository";
import {v4 as uuidv4} from 'uuid'
import { uploadFile } from "../../config/cloudinary";
import { userRepository } from "../../data-access/repositories/user-repository";
import { UserRecord } from "../../data-access/records/user-record";

export const postService = {
    getPostsFromUser : async (userId: string) : Promise<PostResponseDto[]>=> {
        const posts = await postRepository.getPostsFromUser(userId);
        const returnPosts = posts.map(post => map_Post_To_PostResponseDto(post));
        return returnPosts;
    },
    getPostsOfFriends: async (friendsId: string[]) => {
        const posts = await postRepository.getMultiplePosts(friendsId);
        const returnPosts = posts.map(post => map_Post_To_PostResponseDto(post));
        return returnPosts;
    },
    getPost: async (postId: string) : Promise<PostResponseDto> => {
        const post = await postRepository.getPost(postId);
        if (!post) {
            throw new BadRequestError(`Post with id: ${postId} does not exist`);
        }
        const returnPost = map_Post_To_PostResponseDto(post);
        return returnPost;
    },
    getPosts: async (userId: string) => {
        const posts = await postRepository.getPosts(userId);
        console.log(posts);
        const returnPosts = posts.map(post => map_Post_To_PostResponseDto(post));
        return returnPosts;
    },
    createPost: async (userId: string, post: PostCreateDto) => {
        if (post.image) {
            const {url} = await uploadFile('postImage', post.image);
            post.image = url;
        }
        const newPost = map_PostCreateDto_To_Post(userId, post);
        const savedPost = await postRepository.add(newPost);
        const user = await userRepository.getUserForDisplay(userId);
        const returnPost = map_Post_To_PostResponseDto(savedPost);
        returnPost.user = user as UserRecord;
        returnPost.likes =0;
        returnPost.comments=0;
        return returnPost;

    },
    updatePost: async (postId: string, post: PostUpdateDto) => {
        await postRepository.updateById(postId, post);
    },
    deletePost: async (postId: string) => {
        await postRepository.deleteById(postId);
    },
    toggleLikePost: async (userId: string, postId: string) => {
        const isLiked = await reactionRepository.checkLike(userId, postId);
        if (isLiked != null) await reactionRepository.unlikePost(userId, postId);
        else {
            await reactionRepository.add({
                id: uuidv4(),
                userId,
                postId,
            })
        }
    },
    getLikedPosts: async (userId: string) => {
        return await reactionRepository.getLikedPosts(userId);
    }


}