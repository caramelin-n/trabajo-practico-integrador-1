import userModel from "./userModel.js";
import profileModel from "./profileModel.js";
import articleModel from "./articleModel.js";
import tagModel from "./tagModel.js";

//relaciones en un archivo barril, para crear las relaciones despues definida los modelos


//user tiene un profile
userModel.hasOne(profileModel, {foreignKey: "user_id", as:"profile"});
profileModel.belongsTo(userModel, {foreignKey: "user_id", as:"user"});


//user tiene muchos articulos
userModel.hasMany(articleModel, {foreignKey: "user_id", as:"articles"});
articleModel.belongsTo(userModel, {foreignKey:"user_id", as:"author"});

//articulos pueden tener muchas etiquetas

articleModel.belongsToMany(tagModel,{
    through: "article_tag",
    foreignKey:"article_id",
    otherKey:"tag_id",
    as:"tags"
});

tagModel.belongsToMany(articleModel,
    {
        through:"article_tag",
        foreignKey:"tag_id",
        otherKey:"article_id",
        as:"articles"
    }
)
