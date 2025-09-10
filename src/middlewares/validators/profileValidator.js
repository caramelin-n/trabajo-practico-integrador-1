import { body, param } from "express-validator";
import profileModel from "../../models/profileModel.js";

/* ● first_name y last_name: 2-50 caracteres, solo letras.
● biography: máximo 500 caracteres.
● avatar_url: formato URL válido (opcional). */


export const updateProfileValidator = [
    body("first_name")
    .notEmpty()
    .withMessage("El nombre no debe de estar vacío.")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener 2-50 caracteres y estar compuesto sólo de letras.")
];

export const getProfileValidator = [

];

export const getProfileValidator = [

];

export const getProfileValidator = [

];
