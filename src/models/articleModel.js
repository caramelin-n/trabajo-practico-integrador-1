import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import userModel from "./userModel.js";

const articleModel = sequelize.define('article', {
    title: { type: DataTypes.STRING(200), allowNull: false, validate: { len: [3, 200] } },
    content: { type: DataTypes.TEXT, validate: { len: [50] }, allowNull: false },
    excerpt: { type: DataTypes.STRING(500), allowNull: true },
    status: { type: DataTypes.ENUM('published', 'archived'), defaultValue: 'published' },
},{
    timestamps: true,
});

export default articleModel;

