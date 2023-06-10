import { createSlice } from "@reduxjs/toolkit"
import { Login, Logout, Signup, getUser, uploadAvatar } from "../actions/user-actions";



export interface User {
    id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string,
    avatar: string,
    introduction?: {
        job?: string,
        address?: string, 
        company?: string,
    }
}

interface UserState {
    currentUser:  User | null,
    otherUser: User | null,
}
const user = localStorage.getItem("currentUser");
const initValues = {
    currentUser: user ? JSON.parse(user) : null,
    otherUser: null
} as UserState

export const userSlice = createSlice({
    name: "user",
    initialState: initValues,
    reducers: {
        updateOtherUser: (state, action) => {
            state.otherUser = action.payload.otherUser;
        },
        updateUser: (state, action) => {
            state.currentUser = action.payload.currentUser;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(Login.fulfilled, (state, action) => {
            state.currentUser = action.payload as User;
        }),
        builder.addCase(Signup.fulfilled, (state, action) => {
            state.currentUser = action.payload as User;
        })
        builder.addCase(Logout.fulfilled, (state)=> {
            state.currentUser = null;
        })
        builder.addCase(getUser.fulfilled, (state, action)=>{
            state.otherUser = action.payload as User;
        })
        builder.addCase(uploadAvatar.fulfilled, (state, action)=> {
            state.currentUser!.avatar = action.payload
        })

    }
});
export const {updateOtherUser, updateUser} = userSlice.actions;

export default userSlice.reducer;