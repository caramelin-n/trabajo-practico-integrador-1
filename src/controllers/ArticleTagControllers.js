import articleTagModel from "../models/articleTagModel.js";
import articleModel from "../models/articleModel.js"
import tagModel from "../models/tagModel.js"
import chalk from "chalk";
import { verifyToken } from "../helpers/jwt.helper.js";

export const AddTagArticle = async (req, res) => {
    try {
        const { article_id, tag_id } = req.body;

        const article = await articleModel.findByPk(article_id);
        const tag = await tagModel.findByPk(tag_id);
        if (!article || !tag){
            return res.status(404).json({ error: "Artículo o etiqueta no encontradas." })
        }
        const rel = await articleTagModel.create({ article_id, tag_id });
        return res.status(201).json({ message: "Etiqueta agregada a article." });
    } catch (error) {
        console.log(chalk.redBright(error));
        return res.status(500).json({error: "Error interno en el servidor."})
    }
};

export const deleteTagArticle = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = verifyToken(token);
        const relacion = await articleTagModel.findByPk(req.params.id);
        const user_id = decoded.id;
        const article_id = relacion.article_id;

        const match = await articleModel.findOne({
            where:{
                user_id: user_id,
                id: article_id
            }
        })
        
        if(!match || !(decoded.role === "admin")){return  res.status(401).json({message:"acceso denegado, no es dueño del articulo"})}

        await relacion.destroy()
        return res.status(200).json({message:"etiqueta eliminad con exito"})
    } catch (error) {
        console.log(chalk.redBright(error));
        return res.status(500).json({error: "Error interno en el servidor."})
    }
};
