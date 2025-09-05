import userModel from "../models/userModel.js";
import profileModel from "../models/profileModel.js";
import articleModel from "../models/articleModel.js";
import chalk from "chalk";

export const getAllUsers = async (req, res) => {
    try {
        const user = userModel.findAll({ attributes: { exclude: ['password'] },
            include: { model: profileModel, as: 'profile' } });
        return res.status(200).json(user);
    } catch (error) {
        console.log(chalk.bgRedBright("Ha ocurrido un error interno."));
        console.log(chalk.bgRedBright("-------------------------------"));
        console.error(chalk.redBright(error));
    };
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password, role } = req.body;
        const user = await userModel.findByPk(id);
        if(!user){
            return res.status(404).json({ error: "El usuario no ha sido encontrado." });
        }
        await userModel.update(req.body, { where: { id } });
        res.status(200).json({ message: "El usuario ha sido actualizado correctamente." }, user);
    } catch (error) {
        console.log(chalk.bgRedBright("Ha ocurrido un error interno."));
        console.log(chalk.bgRedBright("-------------------------------"));
        console.error(chalk.redBright(error));
    };
};

export const getUserById = async (req, res) => {
    try {
        const user = await userModel.findByPk(req.params.id, { attributes: { exclude: ['password'] },
            include: [{ model: profileModel, as: 'profile' },{ model: articleModel, as: 'article' }]
        });
        if(!user){
            return res.status(404).json({ error: "Usuario no encontrado." });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(chalk.bgRedBright("Ha ocurrido un error interno."));
        console.log(chalk.bgRedBright("-------------------------------"));
        console.error(chalk.redBright(error));
    };
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findByPk(id);
        if(!user){
            return res.status(404).json({ error: "Usuario no encontrado." });
        }
        await userModel.destroy(id);
        res.status(200).json({ message: "Usuario eliminado con éxito." });
    } catch (error) {
        console.log(chalk.bgRedBright("Ha ocurrido un error interno."));
        console.log(chalk.bgRedBright("-------------------------------"));
        console.error(chalk.redBright(error));
    };
};