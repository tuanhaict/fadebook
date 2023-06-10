import { Sequelize } from 'sequelize';

let dbConnection: Sequelize;

export const getDbConnection = () => {
    if (!dbConnection) {
        const mysql_user = "root"
        const mysql_password = process.env.MYSQL_ROOT_PASSWORD;
        const mysql_host = process.env.FRIENDS_SERVICE_MYSQL_HOST;
        const mysql_database = process.env.MYSQL_DATABASE;
        dbConnection = new Sequelize(mysql_database!, mysql_user!, mysql_password, {
            dialect: "mysql",
            host: mysql_host,
            port: 3306
        } );
    }
    return dbConnection;
}