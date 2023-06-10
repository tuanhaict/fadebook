import { UserRecord } from "../../data-access/records/user-record";
import { UserDto } from "../dtos/dtos";



export const map_UsersRecord_To_UsersDto = (friends: object[])=> {
    const friendsDto = friends.map(friend => {
        return {...friend}
    })
    return friendsDto;
}

