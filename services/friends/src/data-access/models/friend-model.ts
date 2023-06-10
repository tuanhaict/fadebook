import { DataTypes, InferAttributes, InferCreationAttributes, Model, ModelStatic } from "sequelize";
import { getDbConnection } from "../../dbConnection";

export interface FriendModelFields 
extends Model<InferAttributes<FriendModelFields>, InferCreationAttributes<FriendModelFields>>
{
    id: string,
    firstId: string,
    secondId: string,
    accepted: boolean
}

export const friendModel : ModelStatic<FriendModelFields> = getDbConnection().define<FriendModelFields>("friend", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    firstId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    secondId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    accepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})
