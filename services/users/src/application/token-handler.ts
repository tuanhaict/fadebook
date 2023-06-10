import jwt from "jsonwebtoken"
import { UserModelFields } from "../data-access/models/user-model";
import { BadRequestError } from "@tuanha888.fadebook/common";


export interface TokenAttrs {
    id: string,
}
export const generateAccessToken = (user: TokenAttrs) : string => {
    const accessToken =  jwt.sign({
        userId: user.id,
    }, "secret_key", {expiresIn: '3d'});
    return accessToken;
}
export const generateRefreshToken = (user: TokenAttrs) : string => {
    const refreshToken = jwt.sign({
        userId: user.id,
    }, "secret_key", {expiresIn: "30d"});
    return refreshToken;
}
export const validateToken = (token: any) => {
    try {
        const payload = jwt.verify(token, "secret_key"); 
        return payload;
    } catch (error) {
        throw new BadRequestError("Invalid token")
    }
}