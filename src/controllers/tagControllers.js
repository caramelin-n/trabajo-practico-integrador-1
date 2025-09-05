import chalk from "chalk";
import tagModel from "../models/tagModel.js";
import { where } from "sequelize";

export const createTag = async (req, res) => {
    try {

    } catch (error) {
        console.log(chalk.bgRedBright("Error interno en el servidor."));
        console.log("-------------------------------------------------");
        console.error(chalk.redBright(error));
    }
}

export const updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await tagModel.findByPk(id);
        if (!tag){
            return res.status(404).json({ error: "La etiqueta no ha sido encontrada." });
        }
        await tagModel.update({ where: { id } });
        res.status(200).json({ message: "La etiqueta ha sido actualizada correctamente." });
    } catch (error) {
        console.log(chalk.bgRedBright("Error interno en el servidor."));
        console.log("-------------------------------------------------");
        console.error(chalk.redBright(error));
    }
}

export const getAllTags = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(chalk.bgRedBright("Error interno en el servidor."));
        console.log("-------------------------------------------------");
        console.error(chalk.redBright(error));
    }
}

export const getTagById = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(chalk.bgRedBright("Error interno en el servidor."));
        console.log("-------------------------------------------------");
        console.error(chalk.redBright(error));
    }
}

export const deleteTag = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(chalk.bgRedBright("Error interno en el servidor."));
        console.log("-------------------------------------------------");
        console.error(chalk.redBright(error));
    }
}
