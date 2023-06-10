import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { getDbConnection } from "../../dbConnection";


export interface UserModelFields 
extends Model<InferAttributes<UserModelFields>, InferCreationAttributes<UserModelFields>>
{
    id: string,
    lastName: string,
    firstName: string,
    avatar: string,
}

const userModel = getDbConnection().define<UserModelFields>("user", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export {userModel}