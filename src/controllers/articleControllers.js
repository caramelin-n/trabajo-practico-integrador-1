import articleModel from "../models/articleModel.js";
import chalk from "chalk";

/* Articles:
● POST /api/articles → Crear artículo. (usuario autenticado)
● GET /api/articles → Listar artículos publicados. (usuario autenticado)
● GET /api/articles/:id → Obtener artículo por su id. (usuario autenticado)
● GET /api/articles/user → Listar artículos publicados del usuario logueado. (usuario
autenticado)
● GET /api/articles/user/:id → Obtener artículo del usuario logueado por su id. (usuario
autenticado)
● PUT /api/articles/:id → Actualizar artículo (solo autor o admin).
● DELETE /api/articles/:id → Eliminación lógica (solo autor o admin). */

export const createArticle = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(chalk.bgRedBright("Ha ocurrido un error interno."));
        console.log(chalk.bgRedBright("--------------------------------"));
        console.error(chalk.redBright(error));
    }
};

export const getAllArticles = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(chalk.bgRedBright("Ha ocurrido un error interno."));
        console.log(chalk.bgRedBright("--------------------------------"));
        console.error(chalk.redBright(error));
    }
};

export const getArticleById = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(chalk.bgRedBright("Ha ocurrido un error interno."));
        console.log(chalk.bgRedBright("--------------------------------"));
        console.error(chalk.redBright(error));
    }
};

export const getUserArticles = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(chalk.bgRedBright("Ha ocurrido un error interno."));
        console.log(chalk.bgRedBright("--------------------------------"));
        console.error(chalk.redBright(error));
    }
};

export const getUserArticlesById = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(chalk.bgRedBright("Ha ocurrido un error interno."));
        console.log(chalk.bgRedBright("--------------------------------"));
        console.error(chalk.redBright(error));
    }
};

export const updateArticle = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(chalk.bgRedBright("Ha ocurrido un error interno."));
        console.log(chalk.bgRedBright("--------------------------------"));
        console.error(chalk.redBright(error));
    }
};

export const deleteArticle = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(chalk.bgRedBright("Ha ocurrido un error interno."));
        console.log(chalk.bgRedBright("--------------------------------"));
        console.error(chalk.redBright(error));
    }
};
