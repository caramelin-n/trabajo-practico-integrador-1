import articleModel from "../../models/articleModel.js";
import { body, param } from "express-validator";
import { verifyToken } from "../../helpers/jwt.helper.js";

/* ● title: 3-200 caracteres, obligatorio.
● content: mínimo 50 caracteres, obligatorio.
● excerpt: máximo 500 caracteres.
● status: solo valores permitidos ('published', 'archived').
● user_id: debe existir y coincidir con usuario autenticado (excepto admin). */

export const createArticleValidation = [
    body('title')
    .notEmpty()
    .withMessage("El título del artículo no debe ser vacío.")
    .isString()
    .isLength({ min: 3, max: 200 })
    .withMessage("El título del artículo debe ser de 3 a 200 caracteres y ser un string."),
    
    body('content')
    .notEmpty()
    .withMessage("El contenido del artículo no debe estar vacío.")
    .isString()
    .isLength({ min: 50 })
    .withMessage("El contenido del artículo debe ser de mínimo 50 caracteres."),

    body('excerpt')
    .isString()
    .isLength({ max: 500 })
    .withMessage("El resumen debe ser de máximo 500 caracteres."),

    body('status')
    .isIn(['published', 'archived'])
    .withMessage("El status debe ser o published o archived."),

];

export const updateArticleValidator = [
    body('title')
    .notEmpty()
    .withMessage("El título del artículo no debe ser vacío.")
    .isString()
    .isLength({ min: 3, max: 200 })
    .withMessage("El título del artículo debe ser de 3 a 200 caracteres y ser un string."),
    
    body('content')
    .notEmpty()
    .withMessage("El contenido del artículo no debe estar vacío.")
    .isString()
    .isLength({ min: 50 })
    .withMessage("El contenido del artículo debe ser de mínimo 50 caracteres."),

    body('excerpt')
    .isString()
    .isLength({ max: 500 })
    .withMessage("El resumen debe ser de máximo 500 caracteres."),

    body('status')
    .isIn(['published', 'archived'])
    .withMessage("El status debe ser o published o archived."),

    param('id')
    .exists()
    .isInt({ min: 1 })
    .withMessage("El id debe ser un numero entero positivo.")
    .custom(async (value) => {
        const article = await articleModel.findByPk(value)
        if (!article){
            throw new Error("El id del artículo no existe en la base de datos.");
        }
    })

];

export const getArticleByIdValidator = [
    param('id')
    .exists()
    .isInt({ min: 1 })
    .withMessage("El id debe ser un numero entero positivo.")
    .custom(async (value) => {
        const article = await articleModel.findByPk(value)
        if (!article){
            throw new Error("El id del artículo no existe en la base de datos.");
        }
    })
];

export const getArticleUserByIdValidator =[
    param('id')
    .exists()
    .isInt({ min: 1 })
    .withMessage("El id debe ser un npumero entero positivo.")
    .custom(async (value) => {
        const article = await articleModel.findByPk(value)
        if (!article){
            throw new Error("El id del artículo no existe en la base de datos.");
        }
    })
    .custom(async (value, {req})=>{
        const token = verifyToken(req.cookies.token)
        
        const article = await articleModel.findOne({ where: { user_id: value} });
        if (!article){
            throw new Error("el article no existe")
        }
        if(!(article.user_id == token.id))
        {
            throw new Error("El usuario no es dueño del articulo");
        }
        return true;
    }),

];

export const deleteArticleValidator = [
    param('id')
    .exists()
    .isInt({ min: 1 })
    .withMessage("El id debe ser un numero entero positivo.")
    .custom(async (value) => {
        const article = await articleModel.findByPk(value)
        if (!article){
            throw new Error("El id del artículo no existe en la base de datos.");
        }
    })
];


