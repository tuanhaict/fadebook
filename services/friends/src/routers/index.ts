import { friendRouter } from "./friend-router";
import { Router } from "express";

const rootRouter = Router();

rootRouter.use('/api/friends', friendRouter);

export {rootRouter};