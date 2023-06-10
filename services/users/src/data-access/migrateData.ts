import { Sequelize } from "sequelize";
import { SequelizeStorage, Umzug } from "umzug";

export const migrateData = async (sequelize: Sequelize) => {
    const umzug = new Umzug({
        migrations: { glob: './migrations/*.js' },
        context: sequelize.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize }),
        logger: console,
    })
    await umzug.up();
}