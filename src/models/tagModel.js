import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const tagModel = sequelize.define('tag',{
    name: { type: DataTypes.STRING(30), validate: { len: [2, 30] }, unique: true },
},{
    timestamps: true
});

export default tagModel;