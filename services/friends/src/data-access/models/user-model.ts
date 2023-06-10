import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { getDbConnection } from "../../dbConnection";


export interface UserModelFields 
extends Model<InferAttributes<UserModelFields>, InferCreationAttributes<UserModelFields>>
{
    id: string,
    firstName: string,
    lastName: string,
    avatar: string,
}
export const userModel = getDbConnection().define<UserModelFields>("user", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.UUID,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    }
})