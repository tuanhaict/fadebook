import { Gender } from "../../data-access/models/user-model";
import { IntroductionRecord } from "../../data-access/records/introduction-record";

export interface LoginDto {
    email: string,
    password: string,
}
export interface SignupDto {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    dateOfBirth: string,
    gender: Gender,
}
export interface UserLoginResponseDto {
    id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: Gender,
    avatar: string,
    tokens: {
        accessToken: string,
        refreshToken: string,
    },
    introduction?: IntroductionRecord,
}
export interface UserResponseDto {
    id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: Gender,
    avatar: string,
    introduction?: IntroductionRecord
}
export interface UserUpdateDto {
    firstName?: string,
    lastName?: string,
    dateOfBirth?: string,
    gender?: Gender,
    avatar?: string,
}
export interface IntroductionDto {
    address?: string,
    job?: string,
    company?: string,
}