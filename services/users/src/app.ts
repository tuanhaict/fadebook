import { NotFoundError, currentUser, logger} from '@tuanha888.fadebook/common';
import express, { Request, Response } from 'express'
import cors from 'cors'
import 'express-async-errors';
import { rootRouter } from './routers';
import { errorHandler } from '@tuanha888.fadebook/common';


const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(currentUser);

app.use(rootRouter);

app.all("*", (req: Request, res: Response) => {
    logger.error("Resources not found!");
    throw new NotFoundError("Resources not found");
})
app.use(errorHandler);

export {app}