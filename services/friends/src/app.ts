import express from 'express'
import 'express-async-errors';
import cors from 'cors'
import { rootRouter } from './routers';
import { NotFoundError, currentUser, errorHandler} from '@tuanha888.fadebook/common';
const app = express();
app.use(express.json());
app.use(cors());
app.use(currentUser)

app.use(rootRouter);

app.all("*", (req, res, next) => {
    console.error("Resources not found, wrong path");
    throw new NotFoundError("Resources not found");
})

app.use(errorHandler);

export {app}