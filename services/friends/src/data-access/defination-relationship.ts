import { friendModel } from "./models/friend-model"
import { userModel } from "./models/user-model"


export const defineRelationship = () => {
    userModel.hasMany(friendModel, {foreignKey: "firstId"});
    userModel.hasMany(friendModel, {foreignKey: "secondId"});
    friendModel.belongsTo(userModel, {foreignKey: "firstId"});
    friendModel.belongsTo(userModel, {foreignKey: "secondId"});
}