import chalk from "chalk";
import tagModel from "../models/tagModel.js";
import articleModel from "../models/articleModel.js";

/* ● POST /api/tags → Crear etiqueta (solo admin).
● GET /api/tags → Listar todas las etiquetas. (usuario autenticado)
● GET /api/tags/:id → Obtener etiqueta específica con artículos asociados(solo admin).
● PUT /api/tags/:id → Actualizar etiqueta (solo admin).
● DELETE /api/tags/:id → Eliminar etiqueta (solo admin). */

export const createTag = async (req, res) => {
    try {
        if(req.user.role !== 'admin'){
            return res.status(403).json({ error: "No autorizado." })
        }
        const { name } = req.body;
        if (!name){
            return res.status(400).json({ error: "El nombre de la etiqueta es de carácter obligatorio." });
        }
        const tag = await tagModel.create({ name });
        return res.status(201).json(tag);
    } catch (error) {
        console.log(chalk.bgRedBright("Error interno en el servidor1."));
        console.log("-------------------------------------------------");
        console.error(chalk.redBright(error));
        res.status(500).json({ error: "Error del servidor." });
    }
}

export const updateTag = async (req, res) => {
    try {
        if(req.user.role !== 'admin'){
            return res.status(403).json({ error: "No autorizado." })
        }
        const { id } = req.params;
        const tag = await tagModel.findByPk(id);
        if (!tag){
            return res.status(404).json({ error: "La etiqueta no ha sido encontrada." });
        }
        await tag.update(req.body);
        res.status(200).json({ message: "La etiqueta ha sido actualizada correctamente." });
    } catch (error) {
        console.log(chalk.bgRedBright("Error interno en el servidor2."));
        console.log("-------------------------------------------------");
        console.error(chalk.redBright(error));
        res.status(500).json({ error: "Error del servidor." });
    }
}

export const getAllTags = async (req, res) => {
    try {
        const tags = await tagModel.findAll();
        return res.status(200).json(tags);
    } catch (error) {
        console.log(chalk.bgRedBright("Error interno en el servidor3."));
        console.log("-------------------------------------------------");
        console.error(chalk.redBright(error));
        res.status(500).json({ error: "Error del servidor." });
    }
}

export const getTagById = async (req, res) => {
    try {
        if(req.user.role !== 'admin'){
            return res.status(403).json({ error: "No autorizado." })
        }
        const { id } = req.params;
        const tag = await tagModel.findByPk(id,{ include: [{
            model: articleModel,
            as: 'articles'
        }]
     });
     if(!tag){
        return res.status(404).json({ error: "Etiqueta no encontrada." });
     }
     return res.status(200).json(tag);
    } catch (error) {
        console.log(chalk.bgRedBright("Error interno en el servidor4."));
        console.log("-------------------------------------------------");
        console.error(chalk.redBright(error));
        res.status(500).json({ error: "Error del servidor." });
    }
}

export const deleteTag = async (req, res) => {
    try {
        if(req.user.role !== 'admin'){
            return res.status(403).json({ error: "No autorizado." })
        }
        const { id } = req.params;
        const tag = await tagModel.findByPk(id)
        if (!tag){
            return res.status(404).json({ error: 'Etiqueta no encontrada.' });
        }
        await tag.destroy();
        return res.status(200).json({ message: "Etiqueta eliminada correctamente." })
    } catch (error) {
        console.log(chalk.bgRedBright("Error interno en el servidor5."));
        console.log("-------------------------------------------------");
        console.error(chalk.redBright(error));
        res.status(500).json({ error: "Error del servidor." });
    }
}
