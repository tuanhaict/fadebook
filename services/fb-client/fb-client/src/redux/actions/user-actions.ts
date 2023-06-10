import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HOST_URL } from "./config";
import { LoginProps } from "../../pages/Auth/LoginForm";
import { SignupProps } from "../../pages/Auth/SignupForm";

export const Login = createAsyncThunk(
    '/auth/login',
    async (data : LoginProps, {rejectWithValue}) => {
        const response = await axios.post(`${HOST_URL}/api/auth/login`, data);
        if (response.status < 200 || response.status >=300) {
            return rejectWithValue(response);
        }
        localStorage.setItem('accessToken', response.data.tokens.accessToken);
        localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        return response.data;
    }
)
export const Signup = createAsyncThunk(
    '/auth/signup',
    async (data: SignupProps, {rejectWithValue}) => {
        const response = await axios.post(`${HOST_URL}/api/auth/signup`, data);
        if (response.status < 200 || response.status >=300) {
            return rejectWithValue(response);
        }
        localStorage.setItem('accessToken', response.data.tokens.accessToken);
        localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        return response.data;
    }
)
export const Logout = createAsyncThunk(
    '/auth/logout',
    async (_, {rejectWithValue}) => {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.post(`${HOST_URL}/api/auth/logout`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        if (response.status < 200 || response.status >=300) {
            return rejectWithValue(response);
        }
        localStorage.clear();
        return response;
    }
)
export const getUser = createAsyncThunk(
    'get-user',
    async (userId: string, {rejectWithValue}) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${HOST_URL}/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            return rejectWithValue(response);
        }
        return response.data;
    }
)
export const uploadAvatar = createAsyncThunk(
    'upload-avatar',
    async (avatar : FormData, {rejectWithValue}) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(`${HOST_URL}/api/users/upload-avatar`,avatar, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status < 200 || response.status >=300) {
            return rejectWithValue(response);
        }
        return response.data;
    }
)