import { commentModel } from "./comment-model";
import { postModel } from "./post-model"
import { reactionModel } from "./reaction-model";
import { userModel } from "./user-model"




export const defineRelationship = () => {
    userModel.hasMany(postModel, { foreignKey: "userId"});
    postModel.belongsTo(userModel, {foreignKey: "userId"});
    userModel.hasMany(commentModel, {foreignKey: "userId"});
    commentModel.belongsTo(userModel, {foreignKey: "userId"});
    userModel.hasMany(reactionModel, {foreignKey: "userId"});
    postModel.hasMany(reactionModel, {foreignKey: "postId"});
    reactionModel.belongsTo(userModel, {foreignKey: "userId"});
    reactionModel.belongsTo(postModel, {foreignKey: "postId"});
    postModel.hasMany(commentModel, {foreignKey: "postId"});
    commentModel.belongsTo(postModel, {foreignKey: "postId"})
}