import { NextFunction, Request, Response } from "express";
import { friendService } from "../application/services/friend-service";



export const friendController =  {
    getFriendsOfUser: async (req: Request, res: Response, next: NextFunction) => {
        const {userId} = req.query;
        const targetUserId = userId == undefined ? req.currentUser!.userId: userId;
        const friends = await friendService.getFriendsOfUser(targetUserId as string);
        return res.status(200).send(friends);
    },
    getFriendsRequests: async (req: Request, res: Response, next: NextFunction) => {
        const friendsRequests = await friendService.getFriendsRequests(req.currentUser!.userId);
        return res.status(200).send(friendsRequests);
    },
    addFriend: async (req: Request, res: Response, next: NextFunction) => {
        const {friendId} = req.params;
        await friendService.addFriend(req.currentUser!.userId, friendId);
        return res.status(201).send({msg: "Add friend successfully!"});
    },
    acceptFriend: async (req: Request, res: Response, next: NextFunction) => {
        const {friendId} = req.params;
        await friendService.acceptFriend(req.currentUser!.userId, friendId);
        return res.status(201).send({msg: "Both are know friends!!"})
    },
    unOrEvictFriendRequest: async (req: Request, res: Response, next: NextFunction) => {
        const {friendId} = req.params;
        await friendService.unOrEvictFriendRequest(req.currentUser!.userId, friendId);
        return res.status(204).send({msg: "No content!"});
    },
    getRequestsToFriends: async (req: Request, res: Response, next: NextFunction) => {
        const requestsToFriends = await friendService.getRequestsToFriends(req.currentUser!.userId);
        return res.status(200).send(requestsToFriends)
    }
}