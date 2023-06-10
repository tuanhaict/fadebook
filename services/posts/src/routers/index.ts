import { Router } from "express";
import { postRouter } from "./post-router";

const rootRouter = Router();

rootRouter.use('/api/posts', postRouter);

export {rootRouter};