import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HOST_URL } from "./config";


export const getFriendsOfUser = createAsyncThunk(
    'friendsOfUser',
    async (_, {rejectWithValue}) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${HOST_URL}/api/friends`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)
export const getFriendsRequests = createAsyncThunk(
    'get-friends-requests', 
    async (_, {rejectWithValue}) => {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`${HOST_URL}/api/friends/get-friends-requests`, {
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
export const getFriendsOfOne= createAsyncThunk(
    'friendsOfOne',
    async (userId: string, {rejectWithValue}) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${HOST_URL}/api/friends?userId=${userId}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)
export const addFriend = createAsyncThunk(
    'add-friend',
    async (friendId: string, {rejectWithValue}) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(`${HOST_URL}/api/friends/${friendId}`, {
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return friendId;
    }
)
export const acceptFriend = createAsyncThunk(
    'accept-friend',
    async (friendId: string, {rejectWithValue}) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.put(`${HOST_URL}/api/friends/${friendId}`, {
            
        },{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return friendId;
    }
)
export const unOrEvictFriendRequest = createAsyncThunk(
    'un-or-evict-friend',
    async (friendId: string, {rejectWithValue}) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.delete(`${HOST_URL}/api/friends/${friendId}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            rejectWithValue(response);
        }
        return friendId
    }
)

export const getRequestsToFriends = createAsyncThunk(
    'get-requests-to-friends',
    async (_, {rejectWithValue}) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${HOST_URL}/api/friends/get-requests-to-friends`,{
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