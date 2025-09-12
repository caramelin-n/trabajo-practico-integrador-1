import { verifyToken } from "../helpers/jwt.helper.js";
import articleModel from "../models/articleModel.js";
import chalk from "chalk";
import tagModel from "../models/tagModel.js";

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
        const { title, content, excerpt, status } = req.body;
        const token = req.cookies.token;
        const decoded = verifyToken(token);

        const user_id = decoded.id;
        const article = await articleModel.create({
            title, content, excerpt, status, user_id
        });
        return res.status(201).json(article);
    } catch (error) {
        console.log(chalk.bgRedBright("Ha ocurrido un error interno.1"));
        console.log(chalk.bgRedBright("--------------------------------"));
        console.error(chalk.redBright(error));
        return res.status(500).json({ error: "Error interno." });
    }
};

export const getAllArticles = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = verifyToken(token);
        const user_id = decoded.id;

        const articles = await articleModel.findAll({
            where: { user_id, status: 'published' }
        });
        return res.status(200).json(articles);
    } catch (error) {
        console.log(chalk.bgRedBright("Ha ocurrido un error interno.2"));
        console.log(chalk.bgRedBright("--------------------------------"));
        console.error(chalk.redBright(error));
        return res.status(500).json({ error: "Error interno." });
    }
};

export const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await articleModel.findByPk(id);
        if (!article){
            return res.status(404).json({ error: "Artículo no encontrado." })
        }
        return res.status(200).json(article);
    } catch (error) {
        console.log(chalk.bgRedBright("Ha ocurrido un error interno.3"));
        console.log(chalk.bgRedBright("--------------------------------"));
        console.error(chalk.redBright(error));
        return res.status(500).json({ error: "Error interno." });
    }
};

export const getUserArticles = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = verifyToken(token);
        const user_id = decoded.id;

        const articles = await articleModel.findAll({ where: { user_id, status: 'published' } });
        return res.status(200).json(articles);
    } catch (error) {
        console.log(chalk.bgRedBright("Ha ocurrido un error interno.4"));
        console.log(chalk.bgRedBright("--------------------------------"));
        console.error(chalk.redBright(error));
        return res.status(500).json({ error: "Error interno." });
    }
};

export const getUserArticlesById = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = verifyToken(token);
        const user_id = decoded.id;

        const { id } = req.params;
        const article = await articleModel.findOne({ where: { id, user_id } })
        if(!article) {
            return res.status(404).json({ error: "Artículo no encontrado." });
        }
        return res.status(200).json(article);
    } catch (error) {
        console.log(chalk.bgRedBright("Ha ocurrido un error interno.5"));
        console.log(chalk.bgRedBright("--------------------------------"));
        console.error(chalk.redBright(error));
        return res.status(500).json({ error: "Error interno." });
    }
};

export const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, excerpt, status } = req.body;
        const token = req.cookies.token;
        const decoded = verifyToken(token);
        const user_id = decoded.id;
        const user_role = decoded.role;

        const article = await articleModel.findByPk(id);
        if (!article) {
            return res.status(404).json({ error: 'El artículo no existe en la base de datos.' })
        }

        if (article.user_id !== user_id && user_role !== 'admin'){
            return res.status(403).json({ error: "No autorizado para actualizar el artículo." })
        }
        
        await article.update({title, content, excerpt, status});

        return res.status(200).json(article);
    } catch (error) {
        console.log(chalk.bgRedBright("Ha ocurrido un error interno.6"));
        console.log(chalk.bgRedBright("--------------------------------"));
        console.error(chalk.redBright(error));
        return res.status(500).json({ error: "Error interno" });
    }
};

export const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.cookies.token;
        const decoded = verifyToken(token);
        const user_id = decoded.id;
        const user_role = decoded.role;

        const article = await articleModel.findByPk(id);
        if (!article){
            return res.status(404).json({ error: "Artículo no encontrado." });
        }

        if (article.user_id !== user_id && user_role !== 'admin'){
            return res.status(403).json({ error: "No autorizado para eliminar el artículo." })
        }

        await article.destroy();
        return res.status(200).json({ message: "Artículo eliminado con éxito." })
    } catch (error) {
        console.log(chalk.bgRedBright("Ha ocurrido un error interno.7"));
        console.log(chalk.bgRedBright("--------------------------------"));
        console.error(chalk.redBright(error));
        return res.status(500).json({ error: "Error interno." });
    }
};
