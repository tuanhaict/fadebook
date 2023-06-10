import { commentController } from './../controllers/comment-controller';
import { requireAuth } from '@tuanha888.fadebook/common';
import { Router } from "express";
import { postController } from '../controllers/post-controller';
import { postAuthorization } from '../middlewares/post-authorization';
import { commentAuthorization } from '../middlewares/comment-authorization';
import { parseFile } from '../config/cloudinary';

const postRouter = Router();

postRouter.get("/get-liked-posts", requireAuth, postController.getLikedPosts)
postRouter.get('/', requireAuth, postController.getPosts);
postRouter.post('/posts-of-friends', requireAuth, postController.getPostsOfFriends);
postRouter.post('/', requireAuth, parseFile('postImage'), postController.createPost);
postRouter.put('/:postId', requireAuth, postAuthorization, postController.updatePost);
postRouter.delete('/:postId', requireAuth, postAuthorization, postController.deletePost);
postRouter.get('/:postId', requireAuth, postController.getPost);
postRouter.get('/:postId/comments', requireAuth, commentController.getCommentsOfPost );
postRouter.post('/:postId/comments', requireAuth, commentController.createComment);
postRouter.put('/:postId/comments/:commentId', requireAuth, commentAuthorization, commentController.updateComment);
postRouter.delete('/:postId/comments/:commentId', requireAuth, commentAuthorization, commentController.deleteComment);
postRouter.post('/:postId/toggle-like', requireAuth, postController.toggleLikePost);
export {postRouter};