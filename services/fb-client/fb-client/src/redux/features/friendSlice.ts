import { createSlice } from '@reduxjs/toolkit';
import { acceptFriend, addFriend, getFriendsOfOne, getFriendsOfUser, getFriendsRequests, getRequestsToFriends, unOrEvictFriendRequest } from '../actions/friend-actions';

interface Friend {
    id: string,
    firstName: string,
    lastName: string,
    avatar: string
}
interface FriendState {
    friends: Friend[],
    otherFriends: Friend[],
    friendsRequests: Friend[],
    requestsToFriends: string[]
}
const initValues = {
    friends: [],
    otherFriends: [],
    friendsRequests: [],
    requestsToFriends: []
}  as FriendState;
const friendSlice = createSlice({
    name: "friend",
    initialState: initValues,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getFriendsOfUser.fulfilled, (state, action) => {
            state.friends = action.payload;
        });
        builder.addCase(getFriendsOfOne.fulfilled, (state, action)=> {
            state.otherFriends = action.payload;
        })
        builder.addCase(getFriendsRequests.fulfilled, (state, action) => {
            state.friendsRequests = action.payload;
        })
        builder.addCase(addFriend.fulfilled, (state, action) => {
            state.requestsToFriends = [...state.requestsToFriends, action.payload];
        })
        builder.addCase(unOrEvictFriendRequest.fulfilled, (state, action) => {
            state.friends = state.friends.filter(friend => friend.id !== action.payload);
            state.requestsToFriends = state.requestsToFriends.filter(friendId => friendId !== action.payload)
            state.friendsRequests = state.friendsRequests.filter(friend => friend.id !== action.payload);
        })
        builder.addCase(acceptFriend.fulfilled, (state, action) => {
            state.friends = [...state.friends, ...state.friendsRequests.filter(friend => friend.id === action.payload)]
            state.friendsRequests = state.friendsRequests.filter(friend => friend.id !== action.payload);
        })
        builder.addCase(getRequestsToFriends.fulfilled, (state, action)=> {
            state.requestsToFriends = action.payload
        })
    }
})
export const {} = friendSlice.actions;
export default friendSlice.reducer;