import { CreateOptions, DataTypes, InferAttributes, InferCreationAttributes, Model, ModelStatic } from "sequelize"
import { getDbConnection } from "../../db-connection"


export interface IntroductionModelFields 
extends Model<InferAttributes<IntroductionModelFields>, InferCreationAttributes<IntroductionModelFields>>
{
    id: string;
    userId: string;
    address: string;
    job: string;
    company: string;
}


export const introductionModel: ModelStatic<IntroductionModelFields> = getDbConnection().define<IntroductionModelFields>(
        'introduction', 
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            job: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            company: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        }
    );
