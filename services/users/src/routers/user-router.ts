import { Router } from "express";
import {requireAuth} from "@tuanha888.fadebook/common"
import { userController } from "../controllers";

import { parseFile } from "../config/cloudinary";
const userRouter = Router();


userRouter.get('/:userId', requireAuth, userController.getUserById);
userRouter.put('/', requireAuth, userController.updateUser );
userRouter.post('/upload-avatar', requireAuth, parseFile('avatar'), userController.uploadAvatar);
userRouter.post('/introductions', requireAuth, userController.addUserIntroduction );
userRouter.put('/introductions', requireAuth, userController.updateUserIntroduction);

export {userRouter};