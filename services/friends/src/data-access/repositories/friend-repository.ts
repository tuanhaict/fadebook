import { FriendModelFields, friendModel } from '../models/friend-model';
import { RepositoryBase } from "./base-repository";
import { getDbConnection } from '../../dbConnection';
import { QueryTypes } from 'sequelize';
import { FriendRecord } from '../records/friend-record';



class FriendRepository extends RepositoryBase<FriendModelFields>
{
    constructor() {
        super(friendModel);
    }
    async getFriendsOfUser(userId: string){
        const friends = await getDbConnection().query(`
            SELECT u.id, u.firstName, u.lastName, u.avatar
            FROM users AS u
            INNER JOIN friends AS f
            ON (u.id = f.firstId OR u.id = f.secondId)
            WHERE (f.firstId = "${userId}" OR f.secondId = "${userId}") AND f.accepted=true AND u.id <> "${userId}";
        `, {
            type: QueryTypes.SELECT,
        })
        return friends;

    };
    async getFriendsRequests(userId: string) {
        const friendsRequests = await getDbConnection().query(`
            SELECT u.id, u.firstName, u.lastName, u.avatar
            FROM users as u
            INNER JOIN friends AS f
            ON u.id = f.firstId
            WHERE f.secondId = "${userId}" AND accepted=false;
        `, {
            type: QueryTypes.SELECT
        })
        return friendsRequests;
    }
    async addFriend(friendRecord: FriendRecord) {
        await this.model.create(friendRecord); 
    }
    async removeFriend(userId: string, friendId: string) {
        await getDbConnection().query(`
            DELETE FROM friends
            WHERE ((firstId = "${userId}" AND secondId = "${friendId}") OR
            (firstId = "${friendId}" AND secondId = "${userId}"));
        `)
    }
    async checkFriendStatus(userId: string, friendId: string) {
        const isFriend= await getDbConnection().query(`
            SELECT id, firstId, secondId, accepted
            FROM friends
            WHERE (((firstId = "${userId}" AND secondId = "${friendId}") OR
            (firstId = "${friendId}" AND secondId = "${userId}")))
        `, {
            type: QueryTypes.SELECT
        }) 
        return isFriend[0];
    }
    async acceptFriend(userId: string, friendId: string) {
        await getDbConnection().query(`
            UPDATE friends
            SET accepted = true
            WHERE (firstId = "${friendId}" AND secondId = "${userId}");
        `)
    }
    async getRequestsToFriends(userId: string) {
        const requests : any = await getDbConnection().query(`
            SELECT secondId as id
            FROM friends AS f
            WHERE f.firstId = "${userId}" AND accepted=false;
        `, {
            type: QueryTypes.SELECT
        })
        return requests.map((request: { id: any; }) => request.id);
    }
}
export const friendRepository = new FriendRepository();