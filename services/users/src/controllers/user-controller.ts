import { NextFunction, Request, Response } from "express";
import { userService } from "../application/services/user-service";
import { IntroductionDto, UserUpdateDto } from "../application/dtos/dtos";




export const userController = {
    getUserById: async (req: Request, res: Response, next: NextFunction) => {
        const {userId} = req.params;
        const user = await userService.getUser(userId);
        return res.status(200).send(user);
    },
    updateUser: async (req: Request, res: Response, next: NextFunction) => {
        const {userId} = req.currentUser!;
        const userDto = req.body as UserUpdateDto;
        await userService.updateUser(userId, userDto );
        return res.status(200).send({msg: "Update user successfully!"});
    },
    uploadAvatar: async (req : any, res : Response, next: NextFunction) => {
        const {userId} = req.currentUser!;
        const url = await userService.uploadAvatar(userId, req.file.path);
        return res.status(200).send(url);
    },
    addUserIntroduction: async (req: Request, res: Response, next: NextFunction) => {
        const {userId} = req.currentUser!;
        const introductionDto = req.body as IntroductionDto;
        const introduction = await userService.createUserIntroduction(userId, introductionDto);
        return res.status(201).send(introduction);
    },
    updateUserIntroduction: async (req: Request, res: Response, next: NextFunction) => {
        const {userId} = req.currentUser!;
        const introductionDto = req.body as IntroductionDto;
        await userService.updateUserIntroduction(userId, introductionDto);
        return res.status(200).send({msg: "Update introduction of user successfully!"});
    },
}