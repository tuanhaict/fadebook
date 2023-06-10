import { BadRequestError } from '@tuanha888.fadebook/common';
import { friendRepository } from "../../data-access/repositories/friend-repository"
import { map_UsersRecord_To_UsersDto } from "../mapper/mapper";
import {v4 as uuidv4} from 'uuid'

export const friendService = {
    getFriendsOfUser: async (userId: string) => {
        const friends = await friendRepository.getFriendsOfUser(userId);
        const friendsDto = map_UsersRecord_To_UsersDto(friends);
        return friendsDto;
    },
    getFriendsRequests: async (userId: string) => {
        const friendsRequests = await friendRepository.getFriendsRequests(userId);
        const friendsDto = map_UsersRecord_To_UsersDto(friendsRequests);
        return friendsDto;
    },
    addFriend: async (userId: string, friendId: string) => {
        const isFriend = await friendRepository.checkFriendStatus(userId, friendId);
        if (isFriend) {
            throw new BadRequestError("Both are friends or you've already sent friend request!");
        }
        await friendRepository.addFriend({
            id: uuidv4(),
            firstId: userId,
            secondId: friendId,
            accepted: false
        })
    },
    acceptFriend: async (userId: string, friendId: string) =>{
        let isFriend : any = await friendRepository.checkFriendStatus(userId, friendId);
        if (!isFriend) {
            throw new BadRequestError("This person haven't sent friend request to you!");
        }
        else {
            if (isFriend.accepted == false || isFriend.secondId == userId) {
                await friendRepository.acceptFriend(userId, friendId);
            } 
        }

    },
    unOrEvictFriendRequest: async (userId: string, friendId: string) => {
        let isFriend : any = await friendRepository.checkFriendStatus(userId, friendId);
        if (!isFriend) {
            throw new BadRequestError("Both aren't friends or you've not sent friend request!");
        }
        await friendRepository.removeFriend(userId, friendId);

    },
    getRequestsToFriends: async (userId: string) => {
        return await friendRepository.getRequestsToFriends(userId);
    }

}