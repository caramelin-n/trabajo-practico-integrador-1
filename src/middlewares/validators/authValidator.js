import { body, param } from "express-validator";
import userModel from "../../models/userModel.js";

export const registerAuthValidator = [
    body('username')
    .isAlphanumeric()
    .isLength({ min: 3, max:20 })
    .notEmpty()
    .withMessage("El username debe ser de tipo alfanumérico de 3-20 caracteres.")
    .custom(async (value) => {
        const isUserUnique = await userModel.findOne({ where: { username: value } });
        if (isUserUnique) {
            throw new Error({ error: "El username debe ser único." })
        };
    }),

    body('email')
    .isEmail()
    .withMessage("El email debe ser válido.")
    .custom(async (value) => {
        const isEmailUnique = await userModel.findOne({ where: { email: value } });
        if (isEmailUnique){
            throw new Error({ error: "El email debe ser único." });
        }
    }),

    body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe ser de al menos 8 caracteres.')
    .matches(/[A-Z]/).withMessage('La contraseña debe tener al menos una mayúscula.')
    .matches(/[a-z]/).withMessage('La contraseña debe tener al menos una minúscula.')
    .matches(/\d/).withMessage('La contraseña debe tener al menos un número.'),

    body('role')
    .isIn(["user","admin"])
    .withMessage("El rol debe ser sólo user o admin"),

    body("first_name")
    .notEmpty()
    .withMessage("El nombre no debe de ser nulo")
    .isLength({min: 2, max: 50})
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("el nombre debe de tener entre 2 a 50 caracteres y contener solo letras"),

    body("last_name")
    .notEmpty()
    .withMessage("El apellido no debe ser nulo.")
    .isLength({ min: 2, max: 50 })
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El apellido debe tener entre 2-50 caracteres y contener solo letras."),

    body("avatar_url")
    .isURL()
    .withMessage("el campo avatar_url debe de ser un URL valido"),

    body("biography")
    .isLength({ max: 500 })
    .withMessage("el campo biography debe de tener un maximo de 500 caracteres")
]

export const loginAuthValidator = [
    body("username")
    .notEmpty()
    .withMessage("El username no debe estar vacío.")
    .isAlphanumeric()
    .withMessage("El username debe ser alfanumérico."),

    body("password")
    .notEmpty()
    .withMessage("La contraseña no debe estar vacía.")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener mínimo 8 caracteres")
];


