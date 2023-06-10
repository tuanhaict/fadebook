import { app } from "./app";
import { getDbConnection } from "./dbConnection";
import { defineRelationship } from "./data-access/defination-relationship";
import { rabbitClient } from "./rabbit-client";
import { UserCreatedConsumer } from "./application/events/user-created-consumer";
import { UserUpdatedConsumer } from "./application/events/user-updated-consumer";

const start = async () => {
    try {
        await rabbitClient.connect();
        await connectDb();
        app.listen(3000, () => {
            console.log("Listening on port 3000")
        })
        new UserCreatedConsumer(rabbitClient.connection).consume();
        new UserUpdatedConsumer(rabbitClient.connection).consume();
    } catch (error) {
        console.error("Connect to DB or RabbitMQ failed!");
        process.exit(1);
    }
    
}
const connectDb = async () => {
    await getDbConnection().authenticate();
    console.log("Connect to DB successfully!")
    defineRelationship();
        
    await getDbConnection().sync({alter: true});
}
start();