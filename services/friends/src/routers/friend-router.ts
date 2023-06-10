import { requireAuth } from "@tuanha888.fadebook/common";
import { Router } from "express";
import { friendController } from "../controllers/friend-controller";

const friendRouter = Router();

friendRouter.get('/', requireAuth, friendController.getFriendsOfUser);
friendRouter.post('/:friendId', requireAuth, friendController.addFriend);
friendRouter.put('/:friendId', requireAuth, friendController.acceptFriend);
friendRouter.delete('/:friendId', requireAuth, friendController.unOrEvictFriendRequest);
friendRouter.get('/get-friends-requests', requireAuth, friendController.getFriendsRequests);
friendRouter.get('/get-requests-to-friends', requireAuth, friendController.getRequestsToFriends);
export {friendRouter};