import {  DataTypes, InferAttributes, InferCreationAttributes, Model, ModelStatic } from "sequelize";
import { getDbConnection } from "../../db-connection";


export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}
export interface UserModelFields 
extends Model<InferAttributes<UserModelFields>, InferCreationAttributes<UserModelFields>>
{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: string;
    gender: Gender;
    avatar: string;
}
export const userModel : ModelStatic<UserModelFields> = getDbConnection().define<UserModelFields>(
        'user',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                unique: true,
                allowNull: false,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            dateOfBirth: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gender: {
                type: DataTypes.ENUM(Gender.Female, Gender.Male),
                defaultValue: Gender.Male,
                allowNull: false
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        }
        
    )
