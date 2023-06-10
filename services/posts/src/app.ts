import { NotFoundError, currentUser, errorHandler } from '@tuanha888.fadebook/common';
import express from 'express'
import "express-async-errors";
import { rootRouter } from './routers';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use(currentUser);

app.use(rootRouter);

app.all("*", (req, res)=> {
    throw new NotFoundError("Resources not found!");
})

app.use(errorHandler);
export {app}

