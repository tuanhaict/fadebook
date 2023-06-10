import { InferCreationAttributes, Model, InferAttributes,DataTypes } from 'sequelize';
import { getDbConnection } from '../../dbConnection';




export interface ReactionModelFields 
extends Model<InferAttributes<ReactionModelFields>, InferCreationAttributes<ReactionModelFields>>
{
    id: string,
    postId: string,
    userId: string,
}

export const reactionModel = getDbConnection().define<ReactionModelFields>("reaction", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    postId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    }
})