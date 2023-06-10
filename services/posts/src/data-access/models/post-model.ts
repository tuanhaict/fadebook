
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { getDbConnection } from '../../dbConnection';


export interface PostModelFields 
extends Model<InferAttributes<PostModelFields>, InferCreationAttributes<PostModelFields>>
{
    id: string,
    caption: string,
    image?: string,
    userId: string,
}

export const postModel = getDbConnection().define<PostModelFields>("post", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    caption: {
        type: DataTypes.STRING(3000),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    }

})