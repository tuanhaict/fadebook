import { introductionModel } from "./models/introduction-model"
import { userModel } from "./models/user-model"



export const defineRelationship = () => {
    userModel.hasOne(introductionModel, {foreignKey: "userId"});
    introductionModel.belongsTo(userModel, {foreignKey: "userId"});
}