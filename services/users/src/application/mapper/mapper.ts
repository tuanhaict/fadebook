import { Gender} from "../../data-access/models/user-model";
import { IntroductionDto,SignupDto,UserLoginResponseDto, UserResponseDto } from "../dtos/dtos";
import {v4 as uuidv4} from 'uuid';
import { FEMALE_AVATAR, MALE_AVATAR } from "../constants";
import { generateAccessToken, generateRefreshToken } from "../token-handler";
import bcrypt from 'bcryptjs';
import { UserRecord } from "../../data-access/records/user-record";
import { IntroductionRecord } from "../../data-access/records/introduction-record";
export function map_User_To_UserResponseDto(user: UserRecord) : UserResponseDto {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        avatar: user.avatar,
        introduction: user.introduction,
    }
}
export function map_UserSignUpDto_To_User(user: SignupDto) : UserRecord {
    let avatar: string;
    if (user.gender === Gender.Male) avatar = MALE_AVATAR;
    else avatar = FEMALE_AVATAR;
    const salt = bcrypt.genSaltSync(4);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    return {
        ...user,
        id: uuidv4(),
        password: hashedPassword,
        avatar,
    }
}
export function map_User_To_UserLoginResponse(user: UserRecord) : UserLoginResponseDto {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        avatar: user.avatar,
        tokens: {
            accessToken,
            refreshToken
        },
        introduction: user.introduction,
    }
}

export function map_IntroductionDto_To_Introduction(userId: string, introduction: IntroductionDto) : IntroductionRecord {
    return {
        ...introduction,
        userId,
        id: uuidv4()
    }
}