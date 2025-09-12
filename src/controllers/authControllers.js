import userModel from "../models/userModel.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import chalk from "chalk";
import { verifyToken } from "../helpers/jwt.helper.js";
import profileModel from "../models/profileModel.js";

export const authRegister = async (req, res) => {
    try {
        const { username , email, password, role } = req.body;
        const { first_name , last_name , biography, avatar_url, birth_date} = req.body;
        const hashedPassword = await hashPassword(password);
        // console.log(username)
        const userExists = await userModel.findOne({
            where:{
                username: username
            }
        });
        
        if (userExists){
            return res.status(400).json({ error: "El usuario ya está registrado." });
        };
        const emailExists = await userModel.findOne({ where: { email: email } });
        if(emailExists) {
            return res.status(400).json({ error: "Este correo ya está registrado" })
        }

        const user = await userModel.create({ username: username, email: email, password: hashedPassword, role: role });
        // const {user_id} = user.id
        await profileModel.create({ first_name: first_name, last_name: last_name, biography: biography, avatar_url: avatar_url, birth_date: birth_date, user_id: user.id });
        res.status(201).json({ message: "Usuario registrado con éxito." })
    } catch (error) {
        console.log("Error interno en el servidor1");
        console.log("---------------------------------");
        console.error(chalk.redBright(error));
        return res.status(500).json({error:"error interno en registrarse"})
    }
}
export const authLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({
            where:{
                username: username
            }
        });
        if(!user){
            return res.status(401).json({ error: "Credenciales inválidas." });
        };
        const passMatch =  comparePassword(password, user.password );
        if(!passMatch){return res.status(401).json({error: "credenciales invalidas"})}
        const token = generateToken(user);
        console.log(token)
        res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
        return res.status(200).json({ message: "Sesión iniciada correctamente" });
    } catch (error) {
        console.log("Error interno en el servidor2");
        console.log("---------------------------------");
        console.error(chalk.redBright(error));
        return res.status(500).json({error:"error interno en iniciar sesion"})
    }
}
export const getProfile = async (req, res) => {
    try {
        const token = req.cookies.token;
        // console.log(token);
        const tokenVer = verifyToken(token);
        // console.log(tokenVer);
        const profile = await profileModel.findOne({
            where:{
                user_id : tokenVer.id
            }
        })
        return res.status(200).json(profile);

 
    } catch (error) {
        console.log("Error interno en el servidor3");
        console.log("---------------------------------");
        console.error(chalk.redBright(error));
        return res.status(500).json("error interno en traer el perfil")
    }
}
export const updateProfile = async (req, res) => {
    try {
        const token = verifyToken(req.cookies.token)
        console.log(token);

        const { first_name , last_name , biography, avatar_url, birth_date} = req.body;
        const profile = await profileModel.findByPk(token.id);

        await profile.update({
            first_name: first_name,
            last_name: last_name, 
            biography: biography, 
            avatar_url: avatar_url,
            birth_date: birth_date
        })

        return res.status(200).json(profile)
    } catch (error) {
        console.log("Error interno en el servidor4");
        console.log("---------------------------------");
        console.error(chalk.redBright(error));
        return res.status(500).json({error:"error interno en actualizar el perfil"})
    }
}
export const authLogout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({ message: "Logout realizado correctamente." })
    } catch (error) {
        console.log("Error interno en el servidor5");
        console.log("---------------------------------");
        console.error(chalk.redBright(error));
    }
}