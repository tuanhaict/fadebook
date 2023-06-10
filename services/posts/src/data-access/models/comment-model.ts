import { InferAttributes, InferCreationAttributes, Model, DataTypes } from 'sequelize';
import { getDbConnection } from '../../dbConnection';



export interface CommentModelFields 
extends Model<InferAttributes<CommentModelFields>, InferCreationAttributes<CommentModelFields>>
{
    id: string,
    postId: string,
    userId: string,
    content: string,
}

export const commentModel = getDbConnection().define<CommentModelFields>("comment", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    postId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    }
})