import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HOST_URL } from "./config";
import { CreateCommentFormProps } from "../../components/common/CreateComment";


export const getPostsOfFriends = createAsyncThunk(
    'get-posts-of-friends',
    async (friendsId: string[], {rejectWithValue}) => {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.post(`${HOST_URL}/api/posts/posts-of-friends`, {
            friendsId,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)
export const getCommentsOfPost = createAsyncThunk(
    'get-comments-of-post',
    async (postId: string, {rejectWithValue}) => {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`${HOST_URL}/api/posts/${postId}/comments`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)
export const createPost = createAsyncThunk(
    'create-post',
    async (post: any, {rejectWithValue}) => {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.post(`${HOST_URL}/api/posts`, post, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)
export const createComment = createAsyncThunk(
    'create-comment',
    async (comment: CreateCommentFormProps, {rejectWithValue}) => {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.post(`${HOST_URL}/api/posts/${comment.postId}/comments`, {
            content: comment.content
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)
export const getPostsOfUser = createAsyncThunk(
    'get-posts-of-user',
    async (userId: string, {rejectWithValue})=> {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`${HOST_URL}/api/posts?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)
export const getPosts = createAsyncThunk(
    'get-posts',
    async (_, {rejectWithValue}) => {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`${HOST_URL}/api/posts`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
        }) 
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return response.data;
    }
    
)
export const getPostsOfOne = createAsyncThunk(
    'get-posts-of-one',
    async (userId: string, {rejectWithValue})=> {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`${HOST_URL}/api/posts?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)
export const toogleLikePost = createAsyncThunk(
    'toogle-like-post',
    async (postId: string, {rejectWithValue}) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(`${HOST_URL}/api/posts/${postId}/toggle-like`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return postId;
    }
)
export const getLikedPosts = createAsyncThunk(
    'get-liked-posts', 
    async (_, {rejectWithValue}) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${HOST_URL}/api/posts/get-liked-posts`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)