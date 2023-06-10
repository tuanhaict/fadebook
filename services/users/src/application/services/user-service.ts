import { BadRequestError } from "@tuanha888.fadebook/common";
import { userRepository } from "../../data-access/repositories/user-repository";
import { map_IntroductionDto_To_Introduction, map_User_To_UserResponseDto, } from "../mapper/mapper";
import { IntroductionDto, UserResponseDto, UserUpdateDto } from "../dtos/dtos";
import { IntroductionRecord } from "../../data-access/records/introduction-record";
import { introductionRepository } from "../../data-access/repositories/introduction-repository";
import { UserUpdatedProducer } from "../events/user-updated-producer";
import { rabbitClient } from "../../rabbit-client";
import { uploadFile } from "../../config/cloudinary";

export const userService = {
    getUser: async (id: string) : Promise<UserResponseDto> => {
        const user = await userRepository.getUser(id);
        if (!user) throw new BadRequestError("Not exist user");
        const userDto = map_User_To_UserResponseDto(user);
        return userDto;
    },
    updateUser: async (id: string, user: UserUpdateDto) => {
        await userRepository.updateById(id, user);
        const userUpdatedData = {
            id,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth,
            avatar: user.avatar,
        }
        new UserUpdatedProducer(rabbitClient.connection).publish(userUpdatedData);
    },
    uploadAvatar: async (id: string, avatarPath: string) => {
        const user = await userRepository.getById(id);
        const {url} = await uploadFile('avatar', avatarPath);
        user!.avatar = url ;
        await user!.save();
        const userUpdatedData = {
            id,
            firstName: user!.firstName,
            lastName: user!.lastName,
            avatar: user!.avatar,
            dateOfBirth: user!.dateOfBirth
        }
        console.log("Publish updated avatar event");
        new UserUpdatedProducer(rabbitClient.connection).publish(userUpdatedData);
        return url;
    },
    createUserIntroduction: async (userId: string, introduction: IntroductionDto) : Promise<IntroductionRecord>=> {
        const userIntroduction = map_IntroductionDto_To_Introduction(userId, introduction);
        const returnIntroduction = await introductionRepository.add(userIntroduction);
        return returnIntroduction;
    },
    updateUserIntroduction: async (userId: string, introduction: IntroductionDto ) => {
        const newIntroduction = map_IntroductionDto_To_Introduction(userId, introduction);
        const introductionEntity= await introductionRepository.getIntroductionByUserId(userId);
        if (!introductionEntity) throw new BadRequestError("Introduction of this user is not exist");
        await introductionRepository.updateById(introductionEntity.id, newIntroduction);
    }




}