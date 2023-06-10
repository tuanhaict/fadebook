import {Router} from 'express'
import {authRouter} from "./auth-router";
import { userRouter } from "./user-router";


const rootRouter = Router();

rootRouter.use('/api/auth', authRouter);
rootRouter.use('/api/users/', userRouter);

export {rootRouter}