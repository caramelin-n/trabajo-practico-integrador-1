import userModel from "../models/userModel.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import profileModel from "../models/profileModel.js";
import chalk from "chalk";

export const authRegister = async (req, res) => {
    try {
        const { username, email, password, role, first_name, last_name, biography, avatar_url, birthday } = req.body;
        const hashedPassword = await hashPassword(password);
        const userExists = await userModel.findOne({ where: { username: username } });
        if (userExists){
            return res.status(400).json({ error: "El usuario ya está registrado." });
        };
        const emailExists = await userModel.findOne({ where: { email: email } });
        if(emailExists) {
            return res.status(400).json({ error: "Este correo ya está registrado" })
        }
        const user = await userModel.create({ username: username, email: email, password: hashedPassword, role: role });
        await profileModel.create({ first_name: first_name, last_name: last_name, biography: biography, avatar_url: avatar_url, birthday: birthday, user_id: user_id });
        res.status(201).json({ message: "Usuario registrado con éxito." })
    } catch (error) {
        console.log("Error interno en el servidor");
        console.log("---------------------------------");
        console.error(chalk.redBright(error));
    }
}
export const authLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ where: { username: username },
        include: { model: profileModel, as: 'profile', attributes: ["first_name","last_name"] } });
        if(!user){
            return res.status(401).json({ error: "Credenciales inválidas." });
        }
        const validPassword = await comparePassword(password, user.password);
        if(!validPassword){
            return res.status(401).json({ error: "Credenciales inválidas" })
        }
        const token = generateToken(user);
        res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
        return res.status(200).json({ message: "Sesión iniciada correctamente" })
    } catch (error) {
        console.log("Error interno en el servidor");
        console.log("---------------------------------");
        console.error(chalk.redBright(error));
    }
}
export const getProfile = async (req, res) => {
    try {
        const user = await userModel.findByPk(req.user.id, {
            attributes: { exclude: ['password'] },
            include: [{ model: profileModel, as: 'profile' }]
        })
        if (!user){
            return res.status(404).json({ error: "Usuario no encontrado." });
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.log("Error interno en el servidor");
        console.log("---------------------------------");
        console.error(chalk.redBright(error));
    }
}
export const updateProfile = async (req, res) => {
    try {
        const userId = req.userlogged.id;
        const { first_name, last_name, biography, avatar_url, birthday } = req.body;
        const userProfile = await profileModel.findOne({ where: { userId: userId } });
        if (!userProfile){
            return res.status(404).json({ error: "No se encontró el perfil." });
        }
        await userProfile.update(req.body);
        res.status(200).json(req.body);
    } catch (error) {
        console.log("Error interno en el servidor");
        console.log("---------------------------------");
        console.error(chalk.redBright(error));
    }
}
export const authLogout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({ message: "Logout realizado correctamente." })
    } catch (error) {
        console.log("Error interno en el servidor");
        console.log("---------------------------------");
        console.error(chalk.redBright(error));
    }
}