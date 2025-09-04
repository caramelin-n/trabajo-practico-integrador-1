import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import profileModel from "./profileModel.js";

const userModel = sequelize.define("user",{
    username: { type: DataTypes.STRING(20), validate: { len: [3, 20] }, unique: true, allowNull: false },
    email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    password: { type: DataTypes.STRING(255), allowNull: false },
    role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' }
}, {
    timestamps: true,
    paranoid: true
});

export default userModel;

userModel.hasOne(profileModel, { as: 'profile', foreignKey: 'user_id' });
profileModel.belongsTo(userModel, { as: 'user', foreignKey: 'user_id' });
