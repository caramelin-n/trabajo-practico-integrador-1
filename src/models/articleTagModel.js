import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const articleTagModel = sequelize.define('article_tag',{
},{ timestamps: true })

export default articleTagModel;

