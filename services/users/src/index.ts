import { getDbConnection } from "./db-connection"
import {app } from "./app"
import { defineRelationship } from "./data-access/define-relationship";
import { rabbitClient } from "./rabbit-client";
import { logger } from "@tuanha888.fadebook/common";
const start = async () => {
    try {
        await rabbitClient.connect();
        await connectDb();
        app.listen(3000, () => {
            logger.info("Listening on port 3000");
        })
    } catch (error) {
        console.log(error);
        logger.error("Connect to DB or RabbitMQ failed!");
        process.exit(1);
    }
    
}
const connectDb = async () => {
    await getDbConnection().authenticate();
    logger.info("Connect to DB successfully!")
    defineRelationship();
        
    await getDbConnection().sync({alter: true});
}
start();