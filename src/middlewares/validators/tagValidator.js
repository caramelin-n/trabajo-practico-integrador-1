import { body, param } from "express-validator";
import tagModel from "../../models/tagModel.js";

export const createTagValidator = [
    body("name")
    .notEmpty()
    .withMessage("El campo name no debe estar vacío.")
    .isString()
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre de la etiqueta debe tener mínimo 2 caracteres y máximo 30.")
    .custom (async (value) => {
        const isNameUnique = await tagModel.findOne({ where: { name: value } });
        if (isNameUnique){
            throw new Error("El nombre de la etiqueta debe ser único.");
        }
    })
];
export const updateTagValidator = [
    body("name")
    .notEmpty()
    .withMessage("El campo name no debe estar vacío.")
    .isString()
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre de la etiqueta debe tener mínimo 2 caracteres y máximo 30.")
    .custom (async (value) => {
        const isNameUnique = await tagModel.findOne({ where: { name: value } });
        if (isNameUnique){
            throw new Error("El nombre de la etiqueta debe ser único.");
        }
    }),
    param("id")
    .isInt()
    .withMessage("El id debe ser un número.")
    .custom(async (value) => {
        const tag = await tagModel.findByPk(value);
        if(!tag){
            throw new Error("La etiqueta no existe ne la base de datos.")
        }
    })
];
export const findTagByIdValidator = [
    param("id")
    .isInt()
    .withMessage("El id debe ser un número.")
    .custom(async (value) => {
        const tag = await tagModel.findByPk(value);
        if(!tag){
            throw new Error("La etiqueta no existe ne la base de datos.")
        }
    })
];
export const deleteTagValidator = [
    param("id")
    .isInt()
    .withMessage("El id debe ser un número.")
    .custom(async (value) => {
        const tag = await tagModel.findByPk(value);
        if(!tag){
            throw new Error("La etiqueta no existe ne la base de datos.")
        }
    })
];