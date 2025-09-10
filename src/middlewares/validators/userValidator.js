import { body, param } from "express-validator";
import userModel from "../../models/userModel.js";
import { Op } from "sequelize";


export const updateUserValidator = [
    body('username')
    .isAlphanumeric()
    .isLength({ min: 3, max:20 })
    
    .withMessage("El username debe ser de tipo alfanumérico de 3-20 caracteres.")
    .custom(async (value, { req }) => {
        const isUserUnique = await userModel.findOne({ where: { username: value, id:{ [Op.ne] : req.params.id } }});
        if (isUserUnique) {
            throw new Error("el username ya existe")
        };
    }),
    body('email')
   
   
    .custom(async (value, {req}) => {
        const isEmailUnique = await userModel.findOne({ where: { email: value , id: {[Op.ne]: req.params.id}} });
        if (isEmailUnique){
            throw new Error("el email ya existe");
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
    param('id')
    .isInt()
    .withMessage('El id debe ser un número.')
    .custom(async (value) => {
        const user = await userModel.findByPk(value);
        if(!user){
            throw new Error('El usuario no existe en la base de datos.')
        };
    })
];

export const findUserByIdValidator = [
    param('id')
    .exists()
    .isInt()
    .withMessage('El id debe ser un número.')
    .custom(async (value) => {
        const user = await userModel.findByPk(value);
        if(!user){
            throw new Error('El usuario no existe en la base de datos.')
        };
    })
];

export const deleteUserValidator = [
    param('id')
    .exists()
    .isInt()
    .withMessage('El id debe ser un número.')
    .custom(async (value) => {
        const user = await userModel.findByPk(value);
        if(!user){
            throw new Error('El usuario no existe en la base de datos.')
        };
    })
];


