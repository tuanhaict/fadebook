import { Gender } from "../models/user-model";
import { IntroductionRecord } from "./introduction-record";


export interface UserRecord {
    id: string,
    firstName: string,
    lastName: string,
    password: string,
    dateOfBirth: string,
    gender: Gender,
    avatar: string,
    introduction?: IntroductionRecord
}