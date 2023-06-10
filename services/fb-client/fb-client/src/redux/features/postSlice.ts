import { createSlice } from '@reduxjs/toolkit';
import {createComment, createPost, getCommentsOfPost, getLikedPosts, getPosts, getPostsOfOne, getPostsOfUser, toogleLikePost} from '../actions/post-actions';

export interface Post {
    id: string,
    caption: string,
    userId: string,
    image?: string,
    comments: number,
    likes: number,
    user: {
        firstName: string,
        lastName: string,
        avatar: string,
    }
}
export interface Comment {
    id: string,
    postId: string,
    userId: string,
    content: string,
    user: {
        firstName: string,
        lastName: string,
        avatar: string
    }
}
interface PostState {
    posts: Post[],
    otherPosts: Post[],
    homePosts: Post[],
    comments: Comment[],
    likedPosts: string[]
}
const initValues : PostState = {
    posts: [],
    otherPosts: [],
    homePosts: [],
    comments: [], 
    likedPosts: []
}
export const postSlice = createSlice({
    name: "post",
    initialState: initValues,
    reducers: {
        addComment: (state, action) => {
            state.comments.push(action.payload)
        },
        increaseComments: (state, action) => {
            state.homePosts.forEach(post => {
                if (post.id === action.payload.postId) post.comments++;
            })
            state.posts.forEach(post => {
                if (post.id === action.payload.postId) post.comments++;
            })
            state.otherPosts.forEach(post => {
                if (post.id === action.payload.postId) post.comments++;
            })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCommentsOfPost.fulfilled, (state, action) => {
            const commentsWillAdd = action.payload.filter((cmt: any) => !state.comments.map(c => c.id).includes(cmt.id));
            state.comments.push(...commentsWillAdd);
        })
        builder.addCase(getPostsOfUser.fulfilled, (state, action)=> {
            state.posts = action.payload;
        })
        builder.addCase(getPostsOfOne.fulfilled, (state, action)=> {
            state.otherPosts = action.payload;
        })
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.homePosts = action.payload;
        })
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.posts = [...state.posts, action.payload];
        })
        builder.addCase(getLikedPosts.fulfilled, (state, action)=> {
            state.likedPosts = action.payload;
        })
        builder.addCase(toogleLikePost.fulfilled, (state, action)=> {
            const isLiked = !state.likedPosts.some(postId => postId === action.payload);
            if (isLiked) {
                state.likedPosts = [...state.likedPosts, action.payload];
                state.homePosts.forEach(post => {
                    if (post.id === action.payload) post.likes++;
                })
                state.otherPosts.forEach(post => {
                    if (post.id === action.payload) post.likes++;
                })
                state.posts.forEach(post => {
                    if (post.id === action.payload) post.likes++;
                })
            }
            else {
                state.likedPosts = state.likedPosts.filter(postId => postId !== action.payload);
                state.homePosts.forEach(post => {
                    if (post.id === action.payload) post.likes--;
                })
                state.otherPosts.forEach(post => {
                    if (post.id === action.payload) post.likes--;
                })
                state.posts.forEach(post => {
                    if (post.id === action.payload) post.likes--;
                })
            }
        })
        builder.addCase(createComment.fulfilled, (state, action)=> {
            state.comments = [...state.comments, action.payload]
        })
    }
})

export const {addComment, increaseComments} = postSlice.actions;
export default postSlice.reducer;