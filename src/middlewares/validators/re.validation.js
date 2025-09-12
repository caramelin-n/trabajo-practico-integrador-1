import { body, param } from "express-validator";
import articleModel from "../../models/articleModel.js";
import tagModel from "../../models/tagModel.js";
import articleTagModel from "../../models/articleTagModel.js";

export const createRelValidation =[
    body("article_id")
    .isInt({ min: 1 })
    .withMessage('El id debe ser un número entero positivo.')
    .custom(async (value) => {
        const article = await articleModel.findByPk(value);
        if (!article){
            throw new Error("No existe el artículo en la base de datos")
        }
        return true;
    })
    ,
    body("tag_id")
    .isInt({ min:1 })
    .withMessage('El id debe ser un número entero positivo.')
    .custom(async (value) => {
        const tag = await tagModel.findByPk(value);
        if (!tag) {
            throw new Error("No existe la etiqueta en la base de datos.");
        }
    })
    
];

export const deleteRelValidation = [
    param('id')
    .isInt()
    .withMessage('El id debe ser un entero.')
    .custom(async (value) => {
        const rel = await articleTagModel.findByPk(value);
        if(!rel){
            throw new Error("La relación no existe.");
        };
    })
];